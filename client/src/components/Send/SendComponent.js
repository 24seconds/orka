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
import { MaterialThemeOceanic } from '../../constants/styleConstants';

const Send = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 180px;
  height: 80px;
  background-color: ${ MaterialThemeOceanic.SecondBackground };

  textarea {
    background-color: ${ MaterialThemeOceanic.SecondBackground };
    color: White;
    resize: none;
    flex-grow: 1;
    padding: 10px 5px;
    min-height: 40px;
    max-height: 120px;
    outline: none;
    border: 2px solid ${ MaterialThemeOceanic.Border };
    border-radius: 4px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const SelectFileButton = styled.button`
  width: 50px;
  height: 50px;
  border: 1px solid ${ MaterialThemeOceanic.Border };
  border-radius: 4px;
  margin: 0 5px;
  background-color: ${ MaterialThemeOceanic.Buttons };
  outline: none;

  color: ${ MaterialThemeOceanic.ParametersColor };
  font-size: 16px;
  font-weight: 800;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const SendPasteButton = styled.button`
  width: 50px;
  outline: none;
  background-color: ${ MaterialThemeOceanic.Active };
  color: ${ MaterialThemeOceanic.AttributesColor };
  border: 2px solid ${ MaterialThemeOceanic.Border };
  border-radius: 4px;
  padding: 0;
  margin: 0 3px;
  height: 50px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

class SendComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      files: [],
    }

    this.handleText = this.handleText.bind(this);
    this.onSend = this.sendText.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.onClickFile = this.onClickFile.bind(this);
    this.onPasteText = this.onPasteText.bind(this);

    this.fileInputRef = null;
    this.textareaRef = null;
  }

  getPlaceholder() {
    const { peerUUID } = this.props;

    if (peerUUID) {
      return `Send Message to #${peerUUID}...`;
    } else {
      return `Select peer to send Message!`;
    }
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

    if (peerUUID) {
      sendTextToPeer(peerUUID, text);
      // connectToPeer(uuid);
      this.setState({ text: '' });
      if (this.textareaRef) {
        this.textareaRef.focus();
      }
    } else {
      // TODO: handle null case!
    }
  }

  onClickFile() {
    this.fileInputRef && this.fileInputRef.click()
  }

  async onPasteText() {
    const text = await navigator.clipboard.readText();

    this.setState({
      text
    });
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
        <textarea
          autoCorrect={ 'off' }
          autoCapitalize={ 'off' }
          spellCheck={ false }
          ref={ (ref) => this.textareaRef = ref }
          value={ text } onChange={ this.handleText }
          placeholder={ this.getPlaceholder() } />
        <SendPasteButton onClick={ this.onPasteText }>
          paste
        </SendPasteButton>
        <SendPasteButton onClick={ this.onSend } >
          send
        </SendPasteButton>
      </Send>
    )
  }
}

const mapStateToProps = state => ({
  myUUID: state.myUUID,
  peerUUID: state.peerUUID,
});
export default connect(mapStateToProps)(SendComponent);
