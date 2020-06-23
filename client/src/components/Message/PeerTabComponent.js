import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { connectToPeer, getPeerUUID } from '../../utils/localApi';
import { updatePeerUUID } from '../../redux/action';
import { MaterialThemeOceanic } from '../../constants/styleConstants';

const PeerTab = styled.div`
  background: ${ MaterialThemeOceanic.SelectionBackground };
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;

  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
  }
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
  font-size: 18px;
  background: ${ MaterialThemeOceanic.Foreground };
  margin: 0 0 0 5px;
  border: solid 2px ${ MaterialThemeOceanic.Border };
  border-radius: 4px;
`;


class PeerTabComponent extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(uuid) {
    console.log('uuid is ', uuid);

    this.props.dispatch(updatePeerUUID(uuid));
    connectToPeer(uuid);
  }

  render() {
    const { peers, peerUUID: selectedPeerUUID } = this.props;

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
});
export default connect(mapStateToProps)(PeerTabComponent);
