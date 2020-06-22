import React, { Component } from 'react';
import styled from 'styled-components';
import { messageCell } from '../SharedStyle';
import {
  TabContentWidth,
  TabSmallWidth,
  TabSmall2Width,
} from '../../constants/styleConstants';

const MessageTableHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  border: solid 1px grey;

  /* overflow-x: hidden; */
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
  }
`;

const HeaderItem = styled.div`
  ${ messageCell }
  border-left: none;
`;

class MessageTableHeaderComponent extends Component {
  render() {
    return (
      <MessageTableHeader className='localdrop-message-table-header'>
        <HeaderItem
          width={ TabSmall2Width }
          padding={ '0' }>
            ⇄
        </HeaderItem>
        <HeaderItem padding={ '0' }>Source</HeaderItem>
        <HeaderItem padding={ '0' }>Destination</HeaderItem>
        { false && <HeaderItem>NO.</HeaderItem> }
        <HeaderItem width={ TabSmallWidth }>TYPE</HeaderItem>
        <HeaderItem width={ TabContentWidth }>Content</HeaderItem>
        <HeaderItem padding={ '0' }>SIZE</HeaderItem>
        <HeaderItem width={ TabSmallWidth }>Time</HeaderItem>
        { false && <HeaderItem>Progress</HeaderItem> }
      </MessageTableHeader>
    );
  }
}

export default MessageTableHeaderComponent;
