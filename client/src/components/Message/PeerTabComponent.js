import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { connectToPeer } from '../../utils/localApi';
import { updatePeerUUID } from '../../redux/action';


const PeerTab = styled.div`
  background: blue;
  display: flex;
  justify-content: flex-start;
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
  height: 50px;
  font-size: 14px;

  &:hover {
    cursor: pointer;
  }
`;


class PeerTabComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mockPeers: ['Peer1', 'Peer2', 'Peer3'],
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(uuid) {
    console.log('uuid is ', uuid);

    this.props.dispatch(updatePeerUUID(uuid));
    connectToPeer(uuid);
  }

  render() {
    const { mockPeers } = this.state;
    const { peers } = this.props;

    console.log('this.props is ', this.props);
    console.log('peers is ', peers);

    return (
      <Fragment>
        <PeerTab className='localdrop-peer-tab'>
          <PeerTabButton>
            ALL
          </PeerTabButton>
          {
            mockPeers.map(peer => {
              return (
                <PeerTabButton>
                  { `#${peer}` }
                </PeerTabButton>
              )
            })
          }
          {
            peers && peers.map(peer => {
              return (
                <PeerTabButton onClick={ this.onClick.bind(this, peer) }>
                  { `#${peer}` }
                </PeerTabButton>
              )
            })
          }
        </PeerTab>
        <ConnectivityState className='localdrop-connectivity-state'>
          Peer Connection State: Connected, <button> Retry </button>
        </ConnectivityState>
      </Fragment>
    )
  }
}


const mapStateToProps = state => ({
  peers: state.localDropState.peers
});
export default connect(mapStateToProps)(PeerTabComponent);
