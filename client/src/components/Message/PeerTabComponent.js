import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { connectToPeer } from '../../utils/localApi';
import { updatePeerUUID, updateIsSystemMessageTabSelected } from '../../redux/action';
import { MaterialThemeOceanic } from '../../constants/styleConstants';

const PeerTab = styled.div`
  background: ${ MaterialThemeOceanic.SelectionBackground };
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;

`;

const PeerList = styled.div`
  display: flex;
  flex-grow: 1;

  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
  }
`;

const SystemMessageTab = styled.div`
  position:relative;

  .localdrop-system-message-read-dot {
    position: absolute;
    top: 8px;
    right: 15px;
    visibility: ${ props => props.isRead ? 'hidden': 'visible' };
  }
`;

const SystemMessageReadDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${ MaterialThemeOceanic.KeywordsColor };
`;

const ConnectivityState = styled.div`
  margin: 10px 0;
  border: solid 1px green;

  button {
    margin-left: 16px;
  }
`;

const PeerTabButton = styled.button`
  width: 100px;
  height: 40px;
  font-size: 14px;
  margin: 0 5px;
  background: ${
    props => props.isSelected
    ? MaterialThemeOceanic.SelectionForeground
    : MaterialThemeOceanic.Disabled };
  border: solid 2px ${ MaterialThemeOceanic.Border };
  border-radius: 4px;
  outline: none;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const Peers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  font-size: 16px;
  background: ${ MaterialThemeOceanic.Foreground };
  margin: 0 0 0 5px;
  border: solid 2px ${ MaterialThemeOceanic.Border };
  border-radius: 4px;
`;


class PeerTabComponent extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onClickSystemMessageTab = this.onClickSystemMessageTab.bind(this);
  }

  onClick(uuid) {
    console.log('uuid is ', uuid);

    this.props.dispatch(updatePeerUUID(uuid));
    connectToPeer(uuid);
  }

  onClickSystemMessageTab() {
    this.props.dispatch(updateIsSystemMessageTabSelected());
  }

  render() {
    const {
      peers,
      peerUUID: selectedPeerUUID,
      systemMessageMetaData,
    } = this.props;

    console.log('this.props is ', this.props);
    console.log('peers is ', peers);

    return (
      <Fragment>
        <PeerTab className='localdrop-peer-tab'>
          <Peers>PEERS:</Peers>
          {
            false &&
            <PeerTabButton key='ALL' disabled={ false }>
              ALL
            </PeerTabButton>
          }
          {
            <PeerList>
              {
                peers && peers.map(peer => {
                  return (
                    <PeerTabButton
                      key={ peer }
                      isSelected={ peer === selectedPeerUUID }
                      onClick={ this.onClick.bind(this, peer) }>
                      { `#${peer}` }
                    </PeerTabButton>
                  )
                })
              }
            </PeerList>
          }
          <SystemMessageTab isRead={ systemMessageMetaData.isRead }>
            <PeerTabButton
              key='System-Message'
              isSelected={ systemMessageMetaData.isSelected }
              onClick={ this.onClickSystemMessageTab }>
              System Message
            </PeerTabButton>
            <SystemMessageReadDot
              className='localdrop-system-message-read-dot'/>
          </SystemMessageTab>
        </PeerTab>
        {
          false &&
          <ConnectivityState className='localdrop-connectivity-state'>
            Peer Connection State: Connected, <button> Retry </button>
          </ConnectivityState>
        }
      </Fragment>
    )
  }
}


const mapStateToProps = state => ({
  peers: state.localDropState.peers,
  peerUUID: state.peerUUID,
  systemMessageMetaData: state.systemMessageMetaData,
});
export default connect(mapStateToProps)(PeerTabComponent);
