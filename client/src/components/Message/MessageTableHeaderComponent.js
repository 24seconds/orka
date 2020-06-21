import React, { Component } from 'react';
import styled from 'styled-components';

const MessageTableHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 60px;
`;

const HeaderItem = styled.div`
  border: solid 1px black;
  padding: 0 10px;
`;

class MessageTableHeaderComponent extends Component {
  render() {
    return (
      <MessageTableHeader className='localdrop-message-table-header'>
        <HeaderItem>Source</HeaderItem>
        <HeaderItem>Destination</HeaderItem>
        <HeaderItem>NO.</HeaderItem>
        <HeaderItem>TYPE</HeaderItem>
        <HeaderItem>Content</HeaderItem>
        <HeaderItem>SIZE</HeaderItem>
        <HeaderItem>Time</HeaderItem>
        <HeaderItem>Progress</HeaderItem>
      </MessageTableHeader>
    );
  }
}

export default MessageTableHeaderComponent;
