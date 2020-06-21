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
  render() {
    const { messagePackets } = this.props;

    return (
      <MessageTable>
        <MessageTableHeaderComponent />
        {
          messagePackets.map(packet => {
            return (
              <MessageItemComponent messagePacket={ packet } />
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
