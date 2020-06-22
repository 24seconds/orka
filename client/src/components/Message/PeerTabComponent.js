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

const Peers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  font-size: 18px;
  background: #ffffffba;
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
    const { peers } = this.props;

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
  peers: state.localDropState.peers
});
export default connect(mapStateToProps)(PeerTabComponent);
