import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { PEER_MESSAGE_TYPE } from '../../schema';


const MessageItem = styled.div`
  display: flex;
  height: 30px;
  font-size: 18px;
  border: solid 1px grey;
`;

const MessageCell = styled.div`
  border: solid 1px black;
  margin: 0 10px;
`;

class MessageItemComponent extends Component {
  renderContent(messageType, data) {
    if (messageType === PEER_MESSAGE_TYPE.TEXT) {
      return (
        <MessageCell>{ `${ data.message }` }</MessageCell>
      );
    }

    if (messageType === PEER_MESSAGE_TYPE.FILE) {
      return (
        <MessageCell>{ `${ data.message }` }</MessageCell>
      );
    }

    return;
  }

  renderMessagePacket(messagePacket) {
    console.log('messagePacket is ', messagePacket);

    if (!messagePacket) {
      return;
    }

    const { source, destination, type, data, size } = messagePacket;

    return (
      <Fragment>
        <MessageCell>{ `${ source }` }</MessageCell>
        <MessageCell>{ `${ destination }` }</MessageCell>
        <MessageCell>{ `${ type }` }</MessageCell>
        { this.renderContent(type, data) }
      </Fragment>
    );
  }

  render() {
    const { messagePacket } = this.props;

    return (
      <MessageItem className='localdrop-message-item'>
        { this.renderMessagePacket(messagePacket) }
      </MessageItem>
    )
  }
}

export default MessageItemComponent;
