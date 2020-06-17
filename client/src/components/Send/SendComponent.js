import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { connectToPeer, sendTextToPeer } from '../../utils/localApi';
import { addFiles } from '../../redux/action';

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

class SendComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Hello, World!',
      files: [],
    }

    this.handleText = this.handleText.bind(this);
    this.onSend = this.sendText.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.onClickFile = this.onClickFile.bind(this);
    this.fileInputRef = null;
  }

  handleFiles(event) {
    this.props.dispatch(addFiles(event.target.files));
  }

  handleText(event) {
    this.setState({ text: event.target.value });
  }

  sendText() {
    const { peerUUID } = this.props;
    const { text } = this.state;

    console.log('sendText is called, text is ', text);

    if (peerUUID) {
      sendTextToPeer(peerUUID, text);
    // connectToPeer(uuid);
    } else {
      // TODO: handle null calse!
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
          onChange={ this.handleFiles }/>
        <button onClick={ this.onClickFile }> + </button>
        <textarea value={ text } onChange={ this.handleText } />
        <button>paste</button>
        <button onClick={ this.onSend } >send</button>
      </Send>
    )
  }
}

const mapStateToProps = state => ({
  myUUID: state.myUUID,
  peerUUID: state.peerUUID,
});
export default connect(mapStateToProps)(SendComponent);
