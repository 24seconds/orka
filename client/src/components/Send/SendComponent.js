import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  connectToPeer,
  sendTextToPeer,
  sendFilesToPeer,
} from '../../utils/localApi';
import { addFiles } from '../../redux/action';
import { generateFingerPrint } from '../../utils/messagePacket';
import FingerprintedFile from '../../utils/dataSchema/FingerprintedFile';

const Send = styled.div`
  display: flex;
  max-height: 180px;

  textarea {
    resize: none;
    flex-grow: 1;
    padding: 10px 5px;
    min-height: 40px;
    max-height: 120px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const SelectFileButton = styled.button`
  width: 50px;
  border: 1px solid #9e9e9e;
  background-color: white;
  outline: none;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const SendPasteButton = styled.button`
  width: 50px;
  outline: none;
  background-color: white;
  border: 1px solid #9e9e9e;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

class SendComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Hello, World! Localdrop is made by 24seconds.',
      files: [],
    }

    this.handleText = this.handleText.bind(this);
    this.onSend = this.sendText.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.onClickFile = this.onClickFile.bind(this);
    this.fileInputRef = null;
  }

  handleFiles(event) {
    const { peerUUID } = this.props;
    // 그럼 여기서 packet을 보내야한다는 거네?

    console.log('handleFiles called, peerUUID is ', peerUUID);

    if (peerUUID) {
      const files = event.target.files;

      if (files.length === 0) {
        console.log('no files are selected');
        return;
      }

      const fingerprintedFiles = [];
      for (let i = 0; i < files.length; i ++) {
        fingerprintedFiles.push(
          new FingerprintedFile({
            file: files.item(i),
            fingerprint: generateFingerPrint()
          }));
      }

      console.log('handleFiles, files are ', files);

      this.props.dispatch(addFiles(fingerprintedFiles));

      sendFilesToPeer(peerUUID, fingerprintedFiles);
    } else {
      // TODO: handle null case!
    }
  }

  handleText(event) {
    this.setState({ text: event.target.value });
  }

  sendText() {
    const { peerUUID } = this.props;
    const { text } = this.state;

    console.log('sendText is called, text is ', text);

    if (text.length === 0) {
      return;
    }

    // TODO: Clear textarea and request focus

    if (peerUUID) {
      sendTextToPeer(peerUUID, text);
    // connectToPeer(uuid);
    } else {
      // TODO: handle null case!
    }
  }

  onClickFile() {
    this.fileInputRef && this.fileInputRef.click()
  }

  render() {
    const { text } = this.state;

    return (
      <Send>
        <FileInput
          type='file'
          ref={ (ref) => this.fileInputRef = ref }
          multiple={ true }
          onClick={ () => { this.fileInputRef.value = null } }
          onChange={ this.handleFiles }/>
        <SelectFileButton onClick={ this.onClickFile }> + </SelectFileButton>
        <textarea value={ text } onChange={ this.handleText } />
        <SendPasteButton>paste</SendPasteButton>
        <SendPasteButton onClick={ this.onSend } >send</SendPasteButton>
      </Send>
    )
  }
}

const mapStateToProps = state => ({
  myUUID: state.myUUID,
  peerUUID: state.peerUUID,
});
export default connect(mapStateToProps)(SendComponent);
