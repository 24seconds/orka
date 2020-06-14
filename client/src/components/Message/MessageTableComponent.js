import React, { Component } from 'react';
import styled from 'styled-components';
import MessageTableHeaderComponent from './MessageTableHeaderComponent';
import MessageItemComponent from './MessageItemComponent';

const MessageTable = styled.div`
  width: 100%;
  border: solid 1px blue;
`;


class MessageTableComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mockMessages: [
        'message1',
        'message2',
        'message3',
        'message4',
        'message5',
        'message6',
      ]
    };
  }

  render() {
    const { mockMessages } = this.state;

    return (
      <MessageTable>
        <MessageTableHeaderComponent />
        {
          mockMessages.map(packet => {
            return (
              <MessageItemComponent message={ `#${packet}` } />
            )
          })
        }
      </MessageTable>
    );
  }
}


export default MessageTableComponent;
