import { peerConnectionManager } from "./connections/peerConnection";
import LocalDropEvent from "./LocalDropEvent";
import {
    EventDownloadFileData,
    EventConnectData,
    EventSendMessageData,
    EventErrorData,
    EventUploadLink,
    EventUpdateUser,
    EventResponseSharingData,
    EventDeleteSharingData,
} from "./dataSchema/LocalDropEventData";
import { CLIENT_EVENT_TYPE, PEER_MESSAGE_TYPE } from "../schema";
import websocketManager from "./connections/websocket";
import store from "../redux/store";
import {
    addPeer,
    deletePeer,
    updateMyUUID,
    updateSelectedPeer,
    updateSelectedRow,
    updateTableUsers as updateTableUsersCounter,
    updateTableNotifications as updateTableNotificationsCounter,
    updateTableSharingData as updateTableSharingDataCounter,
    updateSenderID,
    addFiles,
    updateOrkaTheme,
    addToastMessage,
    deleteToastMessage,
    toggleModalState,
    updateIsMobileWidth,
    triggerProfileEditNameEvent,
    toggleGuideState,
} from "../redux/action";
import { parseChunkAndHeader } from "./peerMessage";
import { generateUserProfile, generateSharingDataUUID } from "./commonUtil";
import {
    accumulateChunk,
    transferFile,
    isDownloadInProgress,
    handleDataChannelClose,
} from "./downloadManager";
import { run } from "./database/database";
import {
    TABLE_NOTIFICATIONS,
    TABLE_SHARING_DATA,
    TABLE_USERS,
} from "./database/schema";
import {
    DATATYPE_FILE,
    DATATYPE_TEXT,
    TOAST_HIDE_STRATEGY_FADE_OUT,
} from "../constants/constant";
import { v4 as uuidv4 } from "uuid";

function onSwitchTheme() {
    store.dispatch(updateOrkaTheme());
}

async function notifySharingData(data) {
    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.UPLOAD_SHARING_DATA,
        new EventUploadLink({ sharingData: data })
    );

    (await peerConnectionManager).dispatchEvent(event);
}

async function notifyDeleteSharingData(id) {
    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.DELETE_SHARING_DATA,
        new EventDeleteSharingData({ id })
    );

    (await peerConnectionManager).dispatchEvent(event);
}

async function notifySharingDataToPeer(data, uuid) {
    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.RESPONSE_DATA_LIST,
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

async function sendErrorToPeer(uuid, message) {
    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.ERROR,
        new EventErrorData({ uuid, message })
    );

    (await peerConnectionManager).dispatchEvent(event);
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

function sendMessageToSignalingServer(message) {
    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.SEND_MESSAGE_TO_SIGNALING_SERVER,
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
        console.log(systemMessage);
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

function parsePeerChunk(chunkWithHeader) {
    return parseChunkAndHeader(chunkWithHeader);
}

async function writePeerChunk(chunkWithHeader, uuid) {
    await accumulateChunk(chunkWithHeader, uuid);
}

function addToast(title, description) {
    const id = uuidv4();
    const message = {
        id,
        title,
        description,
        hideStrategy: TOAST_HIDE_STRATEGY_FADE_OUT,
    };

    store.dispatch(addToastMessage(message));
}

function toggleModal() {
    store.dispatch(toggleModalState(store.getState().uploadModalOpen));
}

function toggleGuide() {
    store.dispatch(toggleGuideState(store.getState().guideOpen));
}

function updateIsMobileWidthState(state) {
    store.dispatch(updateIsMobileWidth(state));
}

function getIsMobileWidthState() {
    return store.getState().isMobileWidth;
}

function fireProfileEditNameEvent() {
    store.dispatch(triggerProfileEditNameEvent());
}

function deleteToast(id) {
    store.dispatch(deleteToastMessage(id));
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

function updateTableNotifications() {
    store.dispatch(updateTableNotificationsCounter());
}

function updateSender(senderID) {
    store.dispatch(updateSenderID(senderID));
}

async function createTableUser({ name, profile, userID }) {
    const query = `INSERT INTO ${TABLE_USERS.name} VALUES (
        '${userID}',
        '${name}',
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
    const query = `DELETE FROM ${TABLE_USERS.name} WHERE id = '${id}'`;
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
        WHERE ${TABLE_USERS.name}.${TABLE_USERS.fields.id} = '${userID}'`;
    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows?.[0];
}

async function selectTableUsersMyself() {
    const myUUID = getMyUUID();
    return await selectTableUsersByID(myUUID);
}

async function selectTableUsersWithLatestSharingDataTypeIncludingMyself() {
    console.log(
        "selectTableUsersWithLatestSharingDataTypeIncludingMyself, uuid:",
        getMyUUID()
    );

    const query = `
        SELECT 
            u.*, 
            s3.sharing_data_extension AS latestDataExtension
        FROM users u
        LEFT JOIN
            (SELECT 
            s1.${TABLE_SHARING_DATA.fields.id} AS sharing_data_id,
            s1.${
                TABLE_SHARING_DATA.fields.uploader_id
            } AS sharing_data_uploader_id,
            s1.${TABLE_SHARING_DATA.fields.extension} AS sharing_data_extension,
            s1.${TABLE_SHARING_DATA.fields.type} AS sharing_data_type,
            (count(s2.${
                TABLE_SHARING_DATA.fields.id
            }) + 1) as sharing_data_row_number
            FROM ${TABLE_SHARING_DATA.name} s1
            LEFT JOIN ${TABLE_SHARING_DATA.name} s2
            ON s1.${TABLE_SHARING_DATA.fields.uploader_id} = s2.${
        TABLE_SHARING_DATA.fields.uploader_id
    } 
            AND s1.${TABLE_SHARING_DATA.fields.uploaded_at} < s2.${
        TABLE_SHARING_DATA.fields.uploaded_at
    }
            group by 
                (s1.${TABLE_SHARING_DATA.fields.id}), 
                (s1.${TABLE_SHARING_DATA.fields.uploader_id}), 
                (s1.${TABLE_SHARING_DATA.fields.extension}), 
                (s1.${TABLE_SHARING_DATA.fields.type})
            ) s3
        ON
            u.id = s3.sharing_data_uploader_id
            AND s3.sharing_data_row_number = 1
        ORDER BY CASE u.${TABLE_USERS.fields.id}
            WHEN '${getMyUUID()}' THEN 1
            ELSE 2
            END`;

    console.log(
        "selectTableUsersWithLatestSharingDataTypeIncludingMyself, query:",
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
        values.push(`${TABLE_USERS.fields.name} = '${name}'`);
    }
    if (!(profile == null)) {
        values.push(`${TABLE_USERS.fields.profile} = ${profile}`);
    }

    query += values.join(", ");
    query += ` WHERE ${TABLE_USERS.fields.id} = '${userID}'`;

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

    const encodedText = encodeText(text);

    const query = (() => {
        if (type === DATATYPE_FILE) {
            return `INSERT INTO ${TABLE_SHARING_DATA.name} VALUES(
                '${id}', '${name}', ${size}, '${extension}', NULL, '${DATATYPE_FILE}', 0, false,
                '${uploader_id}', '${uploaded_at}');`;
        } else {
            return `INSERT INTO ${TABLE_SHARING_DATA.name} VALUES (
                '${id}', NULL, 0, '${extension}', '${encodedText}', '${
                type || DATATYPE_TEXT
            }', 0, false, 
                '${uploader_id}', '${uploaded_at}');`;
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

    const encodedText = encodeText(text);

    const data = await selectTableSharingDataByID(id);

    const query = (() => {
        if (data) {
            // update
            let query = `UPDATE ${TABLE_SHARING_DATA.name} SET `;
            const values = [
                `${TABLE_SHARING_DATA.fields.name} = '${name}'`,
                `${TABLE_SHARING_DATA.fields.size} = ${size}`,
                `${TABLE_SHARING_DATA.fields.extension} = '${extension}'`,
                // text and type name should be escaped.
                `'${TABLE_SHARING_DATA.fields.text}' = '${encodedText}'`,
                `'${TABLE_SHARING_DATA.fields.type}' = '${type}'`,
                `${TABLE_SHARING_DATA.fields.status_count} = ${status_count}`,
                `${TABLE_SHARING_DATA.fields.hands_up} = ${hands_up}`,
                `${TABLE_SHARING_DATA.fields.uploader_id} = '${uploader_id}'`,
                `${TABLE_SHARING_DATA.fields.uploaded_at} = '${uploaded_at}'`,
            ];

            query += values.join(", ");
            query += ` WHERE ${TABLE_SHARING_DATA.fields.id} = '${id}'`;

            return query;
        } else {
            // insert
            return `INSERT INTO ${TABLE_SHARING_DATA.name} VALUES (
                '${id}', '${name}', ${size}, '${extension}', '${encodedText}', '${type}',
                ${status_count}, ${hands_up}, '${uploader_id}', '${uploaded_at}'
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
        WHERE ${TABLE_SHARING_DATA.fields.uploader_id} = '${userID}';`;

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return decodeText(result?.[0]?.rows);
}

async function selectTableSharingDataByID(id) {
    const query = `SELECT * FROM ${TABLE_SHARING_DATA.name} 
        WHERE ${TABLE_SHARING_DATA.fields.id} = '${id}';`;

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return decodeText(result?.[0]?.rows?.[0]);
}

async function selectTableSharingDataWithOrderBy(userID, order) {
    let query = `SELECT f.*, f.type as dataType FROM ${TABLE_SHARING_DATA.name} f 
        GROUP BY f.${TABLE_SHARING_DATA.fields.id}`;

    if (userID && userID !== "") {
        query = `SELECT f.*, f.type as dataType FROM ${TABLE_SHARING_DATA.name} f 
        WHERE f.${TABLE_SHARING_DATA.fields.uploader_id} = '${userID}'
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

    return decodeText(result?.[0]?.rows);
}

function encodeText(text) {
    return btoa(text);
}

function decodeText(rows) {
    const replaceRow = (row) => {
        if (!!row?.text) {
            row.text = atob(row.text);
            return row;
        }

        return row;
    };

    if (!Array.isArray(rows)) {
        // consider it as single element
        return replaceRow(rows);
    }

    return rows.map((row) => {
        return replaceRow(row);
    });
}

async function checkHandsUpTableSharingData(userID) {
    const query = `SELECT * FROM ${TABLE_SHARING_DATA.name} 
        WHERE ${TABLE_SHARING_DATA.fields.uploader_id} = '${userID}'
        AND ${TABLE_SHARING_DATA.fields.hands_up} = TRUE;`;

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return decodeText(result?.[0]?.rows);
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
    query += ` WHERE id = '${sharingDataID}'`;

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

    const concat = sharingDataIDs.map((id) => `'${id}'`).join(" ,");
    const query = `DELETE FROM ${TABLE_SHARING_DATA.name} WHERE ${TABLE_SHARING_DATA.fields.id} IN (${concat});`;

    console.log("deleteTableSharingDataByIDs, query:", query);

    const result = await run(query);
    console.log("deleteTableSharingDataByIDs, result:", result);
    // return result?.[0]?.rows;
}

async function selectTableNotifications() {
    const query = `SELECT * FROM ${TABLE_NOTIFICATIONS.name}
        ORDER BY ${TABLE_NOTIFICATIONS.fields.created_at} DESC;`;

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

export {
    onSwitchTheme,
    notifySharingData,
    notifySharingDataToPeer,
    notifyDeleteSharingData,
    notifyUser,
    sendErrorToPeer,
    requestDownloadFile,
    sendMessageToSignalingServer,
    connectToPeer,
    closeWebSocket,
    addJoinedPeers,
    deleteLeavedPeers,
    addFingerPrintedFiles,
    createMyUserInfo,
    getPeerUUID,
    getMyUUID,
    getFileToTransfer,
    transferFileToPeer,
    parsePeerChunk,
    writePeerChunk,
    abortDownloadFile,
    addToast,
    deleteToast,
    updateSelectedPeerUUID,
    updateSelectedRowID,
    updateSender,
    toggleModal,
    toggleGuide,
    updateIsMobileWidthState,
    getIsMobileWidthState,
    fireProfileEditNameEvent,
    // db interfaces
    // users
    updateTableUsers,
    upsertTableUser,
    deleteTableUserByID,
    selectTableUsers,
    selectTableUsersByID,
    selectTableUsersMyself,
    selectTableUsersWithLatestSharingDataTypeIncludingMyself,
    patchTableUsersByID,
    // sharing data
    createTableSharingData,
    upsertTableSharingData,
    updateTableSharingData,
    selectTableSharingDataByUserID,
    selectTableSharingDataByID,
    selectTableSharingDataWithOrderBy,
    checkHandsUpTableSharingData,
    patchTableSharingDataByID,
    deleteTableSharingDataByIDs,
    // notifications
    selectTableNotifications,
    updateTableNotifications,
};
