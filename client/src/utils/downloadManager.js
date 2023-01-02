import {
    parsePeerChunk,
    selectTableSharingDataByID,
} from "./localApi";
import {
    HEADER_SIZE_IN_BYTES,
    DATACHANNEL_MAX_BUFFERED_AMOUNT,
    DATACHANNEL_BUFFER_THRESHOLD,
} from "../constants/constant";
import { concatHeaderAndChunk } from "./peerMessage";
import StreamSaver from "streamsaver";
StreamSaver.mitm = `${process.env.REACT_APP_MITM_URL}/mitm.html?version=2.0.0`;

const FIRST_ACC_SIZE = 66;
const DEFAULT_ACC_SIZE = 125;

let MAXIMUM_ACC_SIZE = FIRST_ACC_SIZE;

// For receiver side store
const chunkStore = {
    // schema
    // [fingerprint]: {
    //   accArr: [],
    //   downloadWriter: null,
    //   offset: 0,
    //   size: 0,
    // }
};
const currentDownloadJob = {
    // schema
    // [peerUUID]: { writer, fingerprint }
};

// For transfer side store
const transferStore = {};

async function writeChunk(chunkArr, downloadWriter) {
    const arrayBuffers = [...chunkArr];

    const arrayBuffer = await new Blob(arrayBuffers).arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    downloadWriter.write(buffer);
}

// TODO: Handle the case when user cancel downloads manually
async function accumulateChunk(chunkWithHeader, uuid) {
    const { fingerprint, chunk } = parsePeerChunk(chunkWithHeader);

    chunkStore[fingerprint] = chunkStore[fingerprint] || {
        accArr: [],
        downloadWriter: null,
        offset: 0,
        size: 0,
        available: true,
    };

    if (!chunkStore[fingerprint].downloadWriter) {
        const sharingData = await selectTableSharingDataByID(fingerprint);

        if (!sharingData) {
            // TODO(young): handle error case
            return;
        }

        const filename = sharingData.name;
        const fileSize = sharingData.size;
        const options = { pathname: fingerprint, size: fileSize };

        chunkStore[fingerprint].size = fileSize;
        const fileStream = StreamSaver.createWriteStream(filename, options);

        const writer = fileStream.getWriter();

        window.addEventListener("unload", (_) => {
            writer.abort();
        });

        // add writer to download job
        currentDownloadJob[uuid] = currentDownloadJob[uuid] || [];
        currentDownloadJob[uuid] = [
            { writer, fingerprint },
            ...currentDownloadJob[uuid],
        ];

        chunkStore[fingerprint].downloadWriter = writer;
        const chunkArr = chunkStore[fingerprint].accArr;

        chunkStore[fingerprint].offset += chunk.byteLength;
        chunkArr.push(chunk);
    } else {
        const chunkArr = chunkStore[fingerprint].accArr;
        const downloadWriter = chunkStore[fingerprint].downloadWriter;

        chunkStore[fingerprint].offset += chunk.byteLength;
        chunkArr.push(chunk);

        if (
            chunkArr.length >= MAXIMUM_ACC_SIZE &&
            chunkStore[fingerprint].available
        ) {
            chunkStore[fingerprint].available = false;

            // if (chunkArr.length !== MAXIMUM_ACC_SIZE) {
            //   throw new Error(`length are different, ${MAXIMUM_ACC_SIZE}/${chunkArr.length}`);
            // }

            const arrayBuffers = [...chunkArr];
            chunkStore[fingerprint].accArr.splice(0, MAXIMUM_ACC_SIZE);

            await writeChunk(arrayBuffers, downloadWriter);
            chunkStore[fingerprint].available = true;

            if (MAXIMUM_ACC_SIZE === FIRST_ACC_SIZE) {
                MAXIMUM_ACC_SIZE = DEFAULT_ACC_SIZE;
            }
        }
    }

    // no need to lock, only occurred once
    if (chunkStore[fingerprint].offset >= chunkStore[fingerprint].size) {
        const chunkArr = chunkStore[fingerprint].accArr;
        const downloadWriter = chunkStore[fingerprint].downloadWriter;

        await writeChunk([...chunkArr], downloadWriter);
        chunkStore[fingerprint].accArr = [];

        downloadWriter.close();

        // delete writer in download job
        if (currentDownloadJob[uuid]) {
            const index = currentDownloadJob[uuid].findIndex((item) => {
                return item.fingerprint === fingerprint;
            });

            if (index !== -1) {
                currentDownloadJob[uuid].splice(index, 1);
            }

            if (currentDownloadJob[uuid].length === 0) {
                delete currentDownloadJob[uuid];
            }

            console.log("currentDownloadJob is ", currentDownloadJob);
        }

        delete chunkStore[fingerprint];
    }
}

function readFile(file, offset, chunkSize, reader, fingerprint, uuid) {
    if (offset > file.size) {
        if (transferStore[fingerprint]) {
            transferStore[fingerprint] = false;
        }

        console.log("offset is ", offset);
        console.log("file.size is ", file.size);

        const message = `Transfer file to #${uuid} done.\nFile: ${file.name}`;
        console.log(message);

        return;
    }

    const chunk = file.slice(offset, offset + chunkSize);
    reader.readAsArrayBuffer(chunk);
}

function isDownloadInProgress(fingerprint) {
    return transferStore[fingerprint] || false;
}

function transferFile(fingerprint, file, dataChannel, uuid) {
    transferStore[fingerprint] = true;

    const reader = new FileReader();
    const chunkSize = 16000 - HEADER_SIZE_IN_BYTES;
    let offset = 0;
    const MAX_BUFFERED_AMOUNT = DATACHANNEL_MAX_BUFFERED_AMOUNT;
    const BUFFER_THRESHOLD = DATACHANNEL_BUFFER_THRESHOLD;

    console.log("chunkSize is ", chunkSize);
    console.log("file.size is ", file.size);

    readFile(file, offset, chunkSize, reader, fingerprint, uuid);

    reader.addEventListener("load", async (event) => {
        console.log("event.target.result is ", event.target.result);
        console.log(
            "typeof event.target.result is ",
            typeof event.target.result
        );

        const chunk = event.target.result;
        console.log("chunk is ", chunk);

        const chunkWithHeader = await concatHeaderAndChunk(fingerprint, chunk);
        console.log("chunkWithHeader is ", chunkWithHeader);
        console.log(
            "chunkWithHeader.byteLength is ",
            chunkWithHeader.byteLength
        );

        if (
            dataChannel.readyState === "closing" ||
            dataChannel.readyState === "closed"
        ) {
            return;
        }

        dataChannel.send(chunkWithHeader);
        offset += chunkSize;

        if (dataChannel.bufferedAmount >= MAX_BUFFERED_AMOUNT) {
            // read later
            dataChannel.bufferedAmountLowThreshold = BUFFER_THRESHOLD;

            if (!dataChannel.onbufferedamountlow) {
                dataChannel.onbufferedamountlow = () => {
                    console.log(`#${uuid}, onbufferedamountlow is called`);

                    dataChannel.onbufferedamountlow = null;

                    // read next chunk
                    readFile(
                        file,
                        offset,
                        chunkSize,
                        reader,
                        fingerprint,
                        uuid
                    );
                };
            }
        } else {
            // read next chunk
            readFile(file, offset, chunkSize, reader, fingerprint, uuid);
        }
    });
}

function handleDataChannelClose(otherUUID) {
    if (currentDownloadJob[otherUUID]) {
        currentDownloadJob[otherUUID].forEach(({ writer }) => {
            writer.abort();
            // TODO: Record File name also
            console.log(`Download from #${otherUUID} Aborted`);
        });

        delete currentDownloadJob[otherUUID];
    }
}

export {
    accumulateChunk,
    transferFile,
    isDownloadInProgress,
    handleDataChannelClose,
};
