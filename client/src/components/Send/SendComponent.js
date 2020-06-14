import React, { Component } from 'react';
import styled from 'styled-components';
import { connectToPeer } from '../../utils/localApi';

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

export default class SendComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Hello, World!'
    }

    this.handleText = this.handleText.bind(this);
    this.onSend = this.sendText.bind(this);
  }

  handleText(event) {
    this.setState({ text: event.target.value });
  }

  sendText() {
    console.log('sendText is called');

    const uuid = 'sample-uuid-hahaha';
    const { text } = this.state;

    connectToPeer(uuid);
  }

  render() {
    const { text } = this.state;

    return (
      <Send>
        <button> + </button>
        <textarea value={ text } onChange={ this.handleText } />
        <button>paste</button>
        <button onClick={ this.onSend } >send</button>
      </Send>
    )
  }
}