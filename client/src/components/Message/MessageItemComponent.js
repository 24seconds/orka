import React, { Component } from 'react';
import styled from 'styled-components';


const MessageItem = styled.div`
  height: 30px;
  font-size: 18px;
  border: solid 1px grey;
`;

class MessageItemComponent extends Component {
  render() {
    const { message } = this.props;

    return (
      <MessageItem className='localdrop-message-item'>
        { `${ message || 'message item!' }` }
      </MessageItem>
    )
  }
}

export default MessageItemComponent;
