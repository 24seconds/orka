import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MessageItemComponent from './MessageItemComponent';
import { mobileWidth, MaterialThemeOceanic } from '../../constants/styleConstants';

const MessageTable = styled.div`
  width: 100%;
`;

const MessageItemContainer = styled.div`
  min-height: 100px;
  background: ${ MaterialThemeOceanic.SecondBackground };
  overflow-y: scroll;

  /* hide scrollbar */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
  }

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
