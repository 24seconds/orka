import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MessageTableHeaderComponent from './MessageTableHeaderComponent';
import MessageItemComponent from './MessageItemComponent';
import { mobileWidth } from '../../constants/styleConstants';

const MessageTable = styled.div`
  width: 100%;
  border: solid 1px blue;
`;

const MessageItemContainer = styled.div`
  min-height: 100px;
  background: greenyellow;
  overflow-y: scroll;
  height: 50vh;

  @media (max-width: ${ mobileWidth }) {
    height: auto;
    min-height: 300px;
  }
`;


class MessageTableComponent extends Component {
  render() {
    const { messagePackets } = this.props;

    return (
      <MessageTable>
        <MessageItemContainer>
          {
            messagePackets.map(messagePacket => {
              const { data } = messagePacket;

              return (
                <MessageItemComponent
                  key={ data.fingerprint }
                  messagePacket={ messagePacket } />
              )
            })
          }
        </MessageItemContainer>
      </MessageTable>
    );
  }
}


const mapStateToProps = state => ({
  messagePackets: state.messagePackets
});
export default connect(mapStateToProps)(MessageTableComponent);
