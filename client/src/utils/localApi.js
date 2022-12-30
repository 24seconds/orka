import { peerConnectionManager } from "./peerConnection";
import LocalDropEvent from "./LocalDropEvent";
import {
    EventSendTextData,
    EventSendFilesData,
    EventDownloadFileData,
    EventConnectData,
    EventSendMessageData,
    EventErrorData,
    EventUploadLink,
    EventUpdateUser,
    EventResponseSharingData,
} from "./dataSchema/LocalDropEventData";
import { CLIENT_EVENT_TYPE, PEER_MESSAGE_TYPE } from "../schema";
import websocketManager from "./websocket";
import store from "../redux/store";
import {
    addPeer,
    deletePeer,
    addMessage,
    updateMyUUID,
    addSystemMessage,
    updateSelectedPeer,
    updateSelectedRow,
    updateTableUsers as updateTableUsersCounter,
    updateTableCommentMetadata as updateTableCommentMetadataCounter,
    updateTableNotifications as updateTableNotificationsCounter,
    updateTableSharingData as updateTableSharingDataCounter,
    updateSenderID,
    addFiles,
} from "../redux/action";
import { parseChunkAndHeader } from "./peerMessage";
import {
    getCurrentTime,
    generateFingerPrint,
    generateUserProfile,
    generateSharingDataUUID,
} from "./commonUtil";
import {
    accumulateChunk,
    transferFile,
    isDownloadInProgress,
    handleDataChannelClose,
} from "./downloadManager";
import { run } from "./database/database";
import {
    TABLE_COMMENTS,
    TABLE_COMMENT_METADATA,
    TABLE_NOTIFICATIONS,
    TABLE_SHARING_DATA,
    TABLE_USERS,
} from "./database/schema";
import { DATATYPE_FILE, DATATYPE_LINK } from "../constants/constant";

async function notifySharingData(data) {
    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.UPLOAD_LINK,
        new EventUploadLink({ sharingData: data })
    );

    (await peerConnectionManager).dispatchEvent(event);
}

async function notifySharingDataToPeer(data, uuid) {
    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.RESPONE_DATA_LIST,
        new EventResponseSharingData({ sharingData: data, uuid })
    );

    (await peerConnectionManager).dispatchEvent(event);
}

async function notifyUser(user) {
    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.UPDATE_USER,
        new EventUpdateUser({ user: user })
    );

    (await peerConnectionManager).dispatchEvent(event);
}

async function sendTextToPeer(uuid, text) {
    console.log("sendTextToPeer called");

    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.SEND_TEXT,
        new EventSendTextData({ uuid, message: text })
    );

    (await peerConnectionManager).dispatchEvent(event);
}

async function sendFileToPeer(uuid, fingerprintedFile) {
    const { file, fingerprint } = fingerprintedFile;

    console.log("sendFileToPeer, file is", file);

    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.SEND_FILES,
        new EventSendFilesData({
            uuid,
            message: file.name,
            size: file.size,
            fingerprint,
        })
    );

    (await peerConnectionManager).dispatchEvent(event);
}

async function sendErrorToPeer(uuid, message) {
    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.ERROR,
        new EventErrorData({ uuid, message })
    );

    (await peerConnectionManager).dispatchEvent(event);
}

function sendFilesToPeer(uuid, fingerprintedFiles) {
    fingerprintedFiles.forEach((fingerprintedFile) => {
        sendFileToPeer(uuid, fingerprintedFile);
    });
}

async function requestDownloadFile(uuid, data) {
    const { fingerprint } = data;

    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.DOWNLOAD_FILE,
        new EventDownloadFileData({
            uuid,
            fingerprint,
        })
    );

    (await peerConnectionManager).dispatchEvent(event);
}

function abortDownloadFile(otherUUID) {
    handleDataChannelClose(otherUUID);
}

async function connectToPeer(uuid) {
    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.CONNECT,
        new EventConnectData({ uuid })
    );

    (await peerConnectionManager).dispatchEvent(event);
}

function sendMessageToServer(message) {
    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.SEND_MESSAGE,
        new EventSendMessageData({ message })
    );

    websocketManager.dispatchEvent(event);
}

function closeWebSocket() {
    const event = new LocalDropEvent(CLIENT_EVENT_TYPE.CLOSE);

    websocketManager.dispatchEvent(event);
}

function addJoinedPeers(peers) {
    store.dispatch(addPeer(peers));
}

function deleteLeavedPeers(peers) {
    store.dispatch(deletePeer(peers));
}

function addMessagePacket(message) {
    store.dispatch(addMessage(message));
}

function addFingerPrintedFiles(files) {
    store.dispatch(addFiles(files));
}

// createMyUserInfo generate my user info and update my UUID
async function createMyUserInfo(uuid) {
    // create user!
    const { name, profile } = generateUserProfile();
    await createTableUser({ name, profile, userID: uuid });

    store.dispatch(updateMyUUID(uuid));
}

function getPeerUUID() {
    return store.getState().peerUUID;
}

function getMyUUID() {
    return store.getState().myUUID;
}

function getFileToTransfer(fingerprint) {
    const filesToTransfer = store.getState().filesToTransfer;

    return filesToTransfer[fingerprint];
}

async function transferFileToPeer(fingerprint, uuid) {
    const file = getFileToTransfer(fingerprint);

    if (!file) {
        const message = `[From #${getMyUUID()}]: ${fingerprint} file link has expired`;
        sendErrorToPeer(uuid, message);
        return;
    }

    if (!(await peerConnectionManager).peerConnections[uuid]) {
        // There is nothing to do in this case..
        const systemMessage =
            `#${uuid} requested download but uuid not found : ` +
            JSON.stringify({ fingerprint, file }, undefined, 2);
        writeSystemMessage(systemMessage);
        return;
    }

    const { dataChannel } = (await peerConnectionManager).peerConnections[uuid];

    if (isDownloadInProgress(fingerprint)) {
        const { name, size, type } = file;
        const payload = {
            fingerprint,
            file: { name, size, type },
        };
        const message =
            `[From #${getMyUUID()}]: download is in progress ` +
            JSON.stringify(payload, undefined, 2);
        sendErrorToPeer(uuid, message);
        return;
    } else {
        transferFile(fingerprint, file, dataChannel, uuid);
    }
}

// TODO(young): deprecate messagePacket
function getMessagePacket(fingerprint) {
    // TODO: Make O(1)

    const messagePacket = store
        .getState()
        .messagePackets.find((messagePacket) => {
            const { data } = messagePacket;

            return data.fingerprint === fingerprint;
        });

    return messagePacket;
}

function parsePeerChunk(chunkWithHeader) {
    return parseChunkAndHeader(chunkWithHeader);
}

async function writePeerChunk(chunkWithHeader, uuid) {
    await accumulateChunk(chunkWithHeader, uuid);
}

function writeSystemMessage(message) {
    const systemMessage = {
        message,
        fingerprint: generateFingerPrint(),
        createdAt: getCurrentTime(),
    };

    store.dispatch(addSystemMessage(systemMessage));
}

function updateSelectedPeerUUID(uuid) {
    store.dispatch(updateSelectedPeer(uuid));
}

function updateSelectedRowID(id) {
    store.dispatch(updateSelectedRow(id));
}

function updateTableUsers() {
    store.dispatch(updateTableUsersCounter());
}

function updateTableSharingData() {
    store.dispatch(updateTableSharingDataCounter());
}

function updateTableCommentMetadata() {
    store.dispatch(updateTableCommentMetadataCounter());
}

function updateTableNotifications() {
    store.dispatch(updateTableNotificationsCounter());
}

function updateSender(senderID) {
    store.dispatch(updateSenderID(senderID));
}

async function createTableUser({ name, profile, userID }) {
    const query = `INSERT INTO ${TABLE_USERS.name} VALUES (
        "${userID}",
        "${name}",
        ${profile}
    );`;
    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    updateTableUsers();

    return result?.[0]?.rows;
}

async function upsertTableUser({ name, profile, id: userID }) {
    const user = await selectTableUsersByID(userID);

    if (!!user) {
        return;
    }

    const result = await createTableUser({ name, profile, userID });
    console.log("upserTableUser, result:", result);

    return result;
}

async function deleteTableUserByID(id) {
    const query = `DELETE FROM ${TABLE_USERS.name} WHERE id = "${id}"`;
    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    updateTableUsers();

    return result?.[0]?.rows;
}

async function selectTableUsers() {
    const query = `SELECT * FROM ${TABLE_USERS.name}`;
    console.log("query:", query);

    // need to use try catch?
    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function selectTableUsersByID(userID) {
    const query = `SELECT * FROM ${TABLE_USERS.name}
        WHERE ${TABLE_USERS.name}.${TABLE_USERS.fields.id} = "${userID}"`;
    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows?.[0];
}

async function selectTableUsersMyself() {
    const myUUID = getMyUUID();
    return await selectTableUsersByID(myUUID);
}

async function selectTableUsersWithLatestSharingDataTypeExcludingMyself() {
    console.log(
        "selectTableUsersWithLatestSharingDataTypeExcludingMyself, uuid:",
        getMyUUID()
    );

    const query = `
    SELECT u.*,
        (CASE WHEN s.${TABLE_SHARING_DATA.fields.type} = "LINK" 
        THEN "URL" 
        ELSE s.${TABLE_SHARING_DATA.fields.extension} END) latest_data_type,
    MAX(s.${TABLE_SHARING_DATA.fields.uploaded_at})
  FROM
    ${TABLE_USERS.name} u
  LEFT JOIN
    ${TABLE_SHARING_DATA.name} s
  ON
    u.${TABLE_USERS.fields.id} = s.${TABLE_SHARING_DATA.fields.uploader_id}
  WHERE u.${TABLE_USERS.fields.id} != "${getMyUUID()}"
  GROUP BY
    u.${TABLE_USERS.fields.id}`;

    console.log(
        "selectTableUsersWithLatestSharingDataTypeExcludingMyself, query:",
        query
    );

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function patchTableUsersByID({ name, profile }, userID) {
    if (name == null && profile == null) {
        return;
    }

    let query = `UPDATE ${TABLE_USERS.name} SET `;

    const values = [];

    if (!(name == null)) {
        values.push(`${TABLE_USERS.fields.name} = "${name}"`);
    }
    if (!(profile == null)) {
        values.push(`${TABLE_USERS.fields.profile} = ${profile}`);
    }

    query += values.join(", ");
    query += ` WHERE ${TABLE_USERS.fields.id} = "${userID}"`;

    console.log("patchTableUsersByID, query:", query);

    const result = await run(query);
    console.log("result:", result);

    const data = await selectTableUsersByID(userID);

    updateTableSharingData();

    return data;
}

async function createTableSharingData({
    dataID,
    type,
    name,
    size,
    extension,
    text,
}) {
    const id = dataID || generateSharingDataUUID();
    const uploader_id = getMyUUID();
    const uploaded_at = new Date().toISOString();
    console.log(id, uploader_id, uploaded_at);

    const query = (() => {
        if (type === DATATYPE_FILE) {
            return `INSERT INTO ${TABLE_SHARING_DATA.name} VALUES(
                "${id}", "${name}", ${size}, "${extension}", NULL, "${DATATYPE_FILE}", 0, false,
                "${uploader_id}", "${uploaded_at}");`;
        } else {
            return `INSERT INTO ${TABLE_SHARING_DATA.name} VALUES (
                "${id}", NULL, 0, NULL, "${text}", "${DATATYPE_LINK}", 0, false, 
                "${uploader_id}", "${uploaded_at}");`;
        }
    })();

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    const data = await selectTableSharingDataByID(id);

    updateTableSharingData();

    return data;
}

// TODO(young): unify insert/create sharing data or refactor them together
async function upsertTableSharingData({ sharingData }) {
    const id = sharingData[TABLE_SHARING_DATA.fields.id];
    const name = sharingData[TABLE_SHARING_DATA.fields.name];
    const size = sharingData[TABLE_SHARING_DATA.fields.size];
    const extension = sharingData[TABLE_SHARING_DATA.fields.extension];
    const text = sharingData[TABLE_SHARING_DATA.fields.text];
    const type = sharingData[TABLE_SHARING_DATA.fields.type];
    const status_count = sharingData[TABLE_SHARING_DATA.fields.status_count];
    const hands_up = sharingData[TABLE_SHARING_DATA.fields.hands_up];
    const uploader_id = sharingData[TABLE_SHARING_DATA.fields.uploader_id];
    const uploaded_at = sharingData[TABLE_SHARING_DATA.fields.uploaded_at];

    const data = await selectTableSharingDataByID(id);

    const query = (() => {
        if (data) {
            // update
            let query = `UPDATE ${TABLE_SHARING_DATA.name} SET `;
            const values = [
                `${TABLE_SHARING_DATA.fields.name} = "${name}"`,
                `${TABLE_SHARING_DATA.fields.size} = ${size}`,
                `${TABLE_SHARING_DATA.fields.extension} = "${extension}"`,
                // text and type name should be escaped.
                `"${TABLE_SHARING_DATA.fields.text}" = "${text}"`,
                `"${TABLE_SHARING_DATA.fields.type}" = "${type}"`,
                `${TABLE_SHARING_DATA.fields.status_count} = ${status_count}`,
                `${TABLE_SHARING_DATA.fields.hands_up} = ${hands_up}`,
                `${TABLE_SHARING_DATA.fields.uploader_id} = "${uploader_id}"`,
                `${TABLE_SHARING_DATA.fields.uploaded_at} = "${uploaded_at}"`,
            ];

            query += values.join(", ");
            query += ` WHERE ${TABLE_SHARING_DATA.fields.id} = "${id}"`;

            return query;
        } else {
            // insert
            return `INSERT INTO ${TABLE_SHARING_DATA.name} VALUES (
                "${id}", "${name}", ${size}, "${extension}", "${text}", "${type}",
                ${status_count}, ${hands_up}, "${uploader_id}", "${uploaded_at}"
            );`;
        }
    })();

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    updateTableSharingData();

    return result?.[0]?.rows?.[0];
}

async function selectTableSharingDataByUserID(userID) {
    const query = `SELECT * FROM ${TABLE_SHARING_DATA.name} 
        WHERE ${TABLE_SHARING_DATA.fields.uploader_id} = "${userID}";`;

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function selectTableSharingDataByID(id) {
    const query = `SELECT * FROM ${TABLE_SHARING_DATA.name} 
        WHERE ${TABLE_SHARING_DATA.fields.id} = "${id}";`;

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows?.[0];
}

async function selectTableSharingDataWithCommentCount(userID) {
    let query = `SELECT f.*, COUNT(c.id) as comment_count, 
            f.type as dataType FROM ${TABLE_SHARING_DATA.name} f 
        LEFT JOIN ${TABLE_COMMENTS.name} c on 
        f.${TABLE_SHARING_DATA.fields.id} = c.${TABLE_COMMENTS.fields.data_id}
        GROUP BY f.${TABLE_SHARING_DATA.fields.id};`;

    if (userID && userID !== "") {
        query = `SELECT f.*, COUNT(c.id) as comment_count,
            f.type as dataType   FROM ${TABLE_SHARING_DATA.name} f 
        LEFT JOIN ${TABLE_COMMENTS.name} c on 
        f.${TABLE_SHARING_DATA.fields.id} = c.${TABLE_COMMENTS.fields.data_id}
        WHERE f.${TABLE_SHARING_DATA.fields.uploader_id} = "${userID}"
        GROUP BY f.${TABLE_SHARING_DATA.fields.id};`;
    }

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function selectTableSharingDataWithCommentCountOrderBy(userID, order) {
    let query = `SELECT f.*, COUNT(c.id) as comment_count, 
            f.type as dataType FROM ${TABLE_SHARING_DATA.name} f 
        LEFT JOIN ${TABLE_COMMENTS.name} c on 
        f.${TABLE_SHARING_DATA.fields.id} = c.${TABLE_COMMENTS.fields.data_id}
        GROUP BY f.${TABLE_SHARING_DATA.fields.id}`;

    if (userID && userID !== "") {
        query = `SELECT f.*, COUNT(c.id) as comment_count,
            f.type as dataType   FROM ${TABLE_SHARING_DATA.name} f 
        LEFT JOIN ${TABLE_COMMENTS.name} c on 
        f.${TABLE_SHARING_DATA.fields.id} = c.${TABLE_COMMENTS.fields.data_id}
        WHERE f.${TABLE_SHARING_DATA.fields.uploader_id} = "${userID}"
        GROUP BY f.${TABLE_SHARING_DATA.fields.id}`;
    }

    if (!!order) {
        const stmt = order === "ASC" ? "ASC" : "DESC";
        query += ` ORDER BY ${TABLE_SHARING_DATA.fields.uploaded_at} ${stmt};`;
    } else {
        query += `;`;
    }

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function checkHandsUpTableSharingData(userID) {
    const query = `SELECT * FROM ${TABLE_SHARING_DATA.name} 
        WHERE ${TABLE_SHARING_DATA.fields.uploader_id} = '${userID}'
        AND ${TABLE_SHARING_DATA.fields.hands_up} = TRUE;`;

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function patchTableSharingDataByID(
    { handsUp, statusCount },
    sharingDataID
) {
    if (handsUp == null && statusCount == null) {
        return;
    }

    let query = `UPDATE ${TABLE_SHARING_DATA.name} SET `;

    const values = [];

    if (!(handsUp == null)) {
        values.push(`${TABLE_SHARING_DATA.fields.hands_up} = ${handsUp}`);
    }

    if (!(statusCount == null)) {
        values.push(
            `${TABLE_SHARING_DATA.fields.status_count} = ${statusCount}`
        );
    }

    query += values.join(", ");
    query += ` WHERE id = "${sharingDataID}"`;

    console.log("patchTableSharingDataByID, query:", query);

    const result = await run(query);
    console.log("result:", result);

    const data = await selectTableSharingDataByID(sharingDataID);

    updateTableSharingData();

    return data;
}

async function deleteTableSharingDataByIDs(sharingDataIDs) {
    if (sharingDataIDs.length === 0) {
        return;
    }

    const naiveQueriesForTableSharingData = sharingDataIDs.map(
        (id) => `
        DELETE FROM ${TABLE_SHARING_DATA.name} WHERE ${TABLE_SHARING_DATA.fields.id} = "${id}";
    `
    );

    const navieQueriesForTableComments = sharingDataIDs.map(
        (id) => `
        DELETE FROM ${TABLE_COMMENTS.name} WHERE ${TABLE_COMMENTS.fields.data_id} = "${id}";
    `
    );

    const naiveQueriesForTableCommentMetadata = sharingDataIDs.map(
        (id) => `
        DELETE FROM ${TABLE_COMMENT_METADATA.name} 
        WHERE ${TABLE_COMMENT_METADATA.fields.data_id} = "${id}";
    `
    );

    const query = [
        ...naiveQueriesForTableSharingData,
        ...navieQueriesForTableComments,
        ...naiveQueriesForTableCommentMetadata,
    ].join("\n");

    console.log("deleteTableSharingDataByIDs, query:", query);

    const result = await run(query);
    console.log("deleteTableSharingDataByIDs, result:", result);
    // return result?.[0]?.rows;
}

// TODO(young): Add logic - filter by receiver ID
async function selectTableCommentsByDataID(dataID, receiverID) {
    const query = `SELECT * FROM ${TABLE_COMMENTS.name} 
        WHERE ${TABLE_COMMENTS.fields.data_id} = "${dataID}"
        AND ${TABLE_COMMENTS.fields.receiver_id} = "${receiverID}"
        ORDER BY ${TABLE_COMMENTS.fields.created_at} ASC;`;

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function selectTableCommentMetadataByDataID(dataID) {
    const query = `SELECT * FROM ${TABLE_COMMENT_METADATA.name}
        WHERE ${TABLE_COMMENT_METADATA.fields.data_id} = "${dataID}";`;

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function selectTableNotifications() {
    const query = `SELECT * FROM ${TABLE_NOTIFICATIONS.name}
        ORDER BY ${TABLE_NOTIFICATIONS.fields.created_at} DESC;`;

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function selectTableNotificationsWithUserAndSharingData() {
    const query = `SELECT 
        n.*, 
        u.${TABLE_USERS.fields.id} as user_id, 
        u.${TABLE_USERS.fields.name} as user_name, 
        u.${TABLE_USERS.fields.profile} as user_profile,
        d.${TABLE_SHARING_DATA.fields.id} as sharing_data_id,
        d.${TABLE_SHARING_DATA.fields.name} as sharing_data_name
        FROM ${TABLE_NOTIFICATIONS.name} as n
        LEFT JOIN ${TABLE_USERS.name} as u ON
            n.${TABLE_NOTIFICATIONS.fields.sender_id} = u.${TABLE_USERS.fields.id}
        LEFT JOIN ${TABLE_SHARING_DATA.name} as d ON
            n.${TABLE_NOTIFICATIONS.fields.data_id} = d.${TABLE_SHARING_DATA.fields.id}
        ORDER BY ${TABLE_NOTIFICATIONS.fields.created_at} DESC;`;

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

export {
    notifySharingData,
    notifySharingDataToPeer,
    notifyUser,
    sendTextToPeer,
    sendFilesToPeer,
    sendErrorToPeer,
    requestDownloadFile,
    sendMessageToServer,
    connectToPeer,
    closeWebSocket,
    addJoinedPeers,
    deleteLeavedPeers,
    addMessagePacket,
    addFingerPrintedFiles,
    createMyUserInfo,
    getPeerUUID,
    getMyUUID,
    getFileToTransfer,
    transferFileToPeer,
    parsePeerChunk,
    writePeerChunk,
    writeSystemMessage,
    abortDownloadFile,
    updateSelectedPeerUUID,
    updateSelectedRowID,
    updateSender,
    // db interfaces
    // users
    updateTableUsers,
    upsertTableUser,
    deleteTableUserByID,
    selectTableUsers,
    selectTableUsersByID,
    selectTableUsersMyself,
    selectTableUsersWithLatestSharingDataTypeExcludingMyself,
    patchTableUsersByID,
    // sharing data
    createTableSharingData,
    upsertTableSharingData,
    updateTableSharingData,
    selectTableSharingDataByUserID,
    selectTableSharingDataByID,
    selectTableSharingDataWithCommentCount,
    selectTableSharingDataWithCommentCountOrderBy,
    checkHandsUpTableSharingData,
    patchTableSharingDataByID,
    deleteTableSharingDataByIDs,
    // comments
    selectTableCommentsByDataID,
    // comment metadata
    selectTableCommentMetadataByDataID,
    updateTableCommentMetadata,
    // notifications
    selectTableNotifications,
    updateTableNotifications,
    selectTableNotificationsWithUserAndSharingData,
};
