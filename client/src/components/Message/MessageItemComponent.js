import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { PEER_MESSAGE_TYPE } from '../../schema';
import { requestDownloadFile } from '../../utils/localApi';


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

const MessageButtonCell = styled.button`
  border: solid 1px black;
  margin: 0 10px;
  outline: none;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

class MessageItemComponent extends Component {
  constructor(props) {
    super(props);

    this.onDownloadOrCopy = this.onDownloadOrCopy.bind(this);
  }

  onDownloadOrCopy() {
    const { messagePacket } = this.props;
    const { source, destination, type, data } = messagePacket;

    if (type === PEER_MESSAGE_TYPE.TEXT) {
      const { message } = data;

      navigator.clipboard.writeText(message).then(function() {
        // TODO: notify user that copy to clip succeed
      }, function() {
        // TODO: notify user that copy to clip failed
      });


      return;
    }

    if (type === PEER_MESSAGE_TYPE.FILE) {
      // request download
      requestDownloadFile(destination, data);
      return;
    }

    if (type === PEER_MESSAGE_TYPE.ERROR) {
      // TODO: ???? do same as text type?..
    }
  }

  renderContent(messageType, data) {
    if (messageType === PEER_MESSAGE_TYPE.TEXT) {
      return (
        <Fragment>
          <MessageCell>{ `${ data.message }` }</MessageCell>
          <MessageCell>{ `${ data.size }` }</MessageCell>
        </Fragment>
      );
    }

    if (messageType === PEER_MESSAGE_TYPE.FILE) {
      return (
        <Fragment>
          <MessageCell>{ `${ data.message }` }</MessageCell>
          <MessageCell>{ `${ data.size }` }</MessageCell>
        </Fragment>
      );
    }

    return;
  }

  renderMessagePacket(messagePacket) {
    console.log('messagePacket is ', messagePacket);

    if (!messagePacket) {
      return;
    }

    const {
      source,
      destination,
      type,
      data,
      time,
      progress,
    } = messagePacket;

    return (
      <Fragment>
        <MessageCell>{ `${ source }` }</MessageCell>
        <MessageCell>{ `${ destination }` }</MessageCell>
        <MessageCell>{ `${ type }` }</MessageCell>
        { this.renderContent(type, data) }
        <MessageCell>{ `${ time }` }</MessageCell>
        <MessageCell>{ `${ progress }` }</MessageCell>
        <MessageButtonCell onClick={ this.onDownloadOrCopy }>
          {
            type === PEER_MESSAGE_TYPE.FILE
            ? 'Download'
            : 'Copy'
          }
        </MessageButtonCell>
        {
          false && <MessageButtonCell>+</MessageButtonCell>
        }
        {
          false && <MessageButtonCell>Delete</MessageButtonCell>
        }
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
