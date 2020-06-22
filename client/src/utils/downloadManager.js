import { parsePeerChunk, getMessagePacket } from './localApi';
import { HEADER_SIZE_IN_BYTES } from '../constants/constant';
import { concatHeaderAndChunk } from './peerMessage';
import StreamSaver from 'streamsaver';
StreamSaver.mitm = `${ process.env.REACT_APP_MITM_URL }/mitm.html?version=2.0.0`;

const MAXIMUM_ACC_SIZE = 625;
const chunkStore = { };
const transferStore = { };

const defaultStructure = {
  accArr: [],
  downloadWriter: null,
};

async function writeChunk(chunkArr, downloadWriter) {
  const arrayBuffers = [...chunkArr];

  const arrayBuffer = await (new Blob(arrayBuffers)).arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  downloadWriter.write(buffer);
}

async function accumulateChunk(chunkWithHeader) {
  const {
    fingerprint, chunkNumber, totalNumber, chunk
  } = parsePeerChunk(chunkWithHeader);

  chunkStore[fingerprint] = chunkStore[fingerprint] || { ...defaultStructure };

  if (!chunkStore[fingerprint].downloadWriter) {
    const options = { pathname: fingerprint }

    const messagePacket = getMessagePacket(fingerprint);

    const filename = (messagePacket && messagePacket.data.message) || 'localdrop_download_file';
    const fileStream = StreamSaver.createWriteStream(filename, options);

    // TODO: should I do this?
    // window.fileStream = fileStream;

    const writer = fileStream.getWriter();
    // window.writer = writer;

    window.onunload = () => window.writer.abort();
    window.addEventListener('unload', (_) => {
      writer.abort();
    })
    // window.onunload = () => window.writer.abort();

    chunkStore[fingerprint].downloadWriter = writer;
  } else {
    const chunkArr = chunkStore[fingerprint].accArr;
    const downloadWriter = chunkStore[fingerprint].downloadWriter;
    chunkArr.push(chunk);

    if (chunkArr.length >= MAXIMUM_ACC_SIZE) {
      await writeChunk(chunkArr, downloadWriter);
      chunkArr.splice(0, chunkArr.length);
    }
  }

  if (chunkNumber >= totalNumber) {
    const chunkArr = chunkStore[fingerprint].accArr;
    const downloadWriter = chunkStore[fingerprint].downloadWriter;
    chunkArr.push(chunk);

    await writeChunk(chunkArr, downloadWriter);
    chunkArr.splice(0, chunkArr.length);

    downloadWriter.close();

    delete chunkStore[fingerprint];
  }
}

function readFile(file, offset, chunkSize, reader, fingerprint) {
  if (offset > file.size) {
    if (transferStore[fingerprint]) {
      transferStore[fingerprint] = false;
    }

    return;
  }

  const chunk = file.slice(offset, offset + chunkSize);
  reader.readAsArrayBuffer(chunk);
}

function transferFile(fingerprint, file, dataChannel) {
  if (transferStore[fingerprint]) {
    // TODO: Notify that download is in progress
    return;
  }

  transferStore[fingerprint] = true;

  const reader = new FileReader();
  const chunkSize = 16000 - HEADER_SIZE_IN_BYTES;
  const totalNumber= Math.ceil(file.size / chunkSize);
  let chunkNumber = 1;
  let offset = 0;

  readFile(file, offset, chunkSize, reader, fingerprint);

  reader.addEventListener('load', async (event) => {
    console.log('event.target.result is ', event.target.result);
    console.log('typeof event.target.result is ', typeof event.target.result);

    const chunk = event.target.result;
    console.log('chunk is ', chunk);

    const chunkWithHeader = await concatHeaderAndChunk(chunkNumber, totalNumber, fingerprint, chunk);
    console.log('chunkWithHeader is ', chunkWithHeader);

    dataChannel.send(chunkWithHeader);

    offset += chunkSize;
    chunkNumber += 1;

    // read next chunk
    readFile(file, offset, chunkSize, reader, fingerprint);
  });
}


export {
  accumulateChunk,
  transferFile,
}