import React, { Component } from 'react';
import styled from 'styled-components';
import { messageCell } from '../SharedStyle';
import {
  TabSmallWidth,
  TabSmall2Width,
  MaterialThemeOceanic,
} from '../../constants/styleConstants';

const MessageTableHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  border: solid 2px ${ MaterialThemeOceanic.Border };
  border-style: solid none;
  background: ${ MaterialThemeOceanic.Highlight };
  color: ${ MaterialThemeOceanic.AttributesColor };

  overflow-x: scroll;

  /* hide scrollbar */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
  }
`;

const HeaderItem = styled.div`
  ${ messageCell }
  border-style: none solid none none;
`;

const HeaderContentItem = styled.div`
  ${ messageCell }
  border-style: none solid none none;
  width: auto;
  max-width: none;
  flex-grow: 1;
`;

const HeaderDownloadSpace = styled.div`
  min-width: 100px;
  width: 100px;
  padding: 0 10px;
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
        <HeaderContentItem>Content</HeaderContentItem>
        <HeaderItem padding={ '0' }>SIZE</HeaderItem>
        <HeaderItem width={ TabSmallWidth }>Time</HeaderItem>
        <HeaderDownloadSpace/>
        { false && <HeaderItem>Progress</HeaderItem> }
      </MessageTableHeader>
    );
  }
}

export default MessageTableHeaderComponent;
