import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
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
    const { messagePackets } = this.props;

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
        {
          messagePackets.map(packet => {
            return (
              <MessageItemComponent message={ `#${packet}` } />
            )
          })
        }
      </MessageTable>
    );
  }
}


const mapStateToProps = state => ({
  messagePackets: state.messagePackets
});
export default connect(mapStateToProps)(MessageTableComponent);
