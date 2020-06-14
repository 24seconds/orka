import React, { Component, Fragment } from 'react';
import styled from 'styled-components';


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
  }

  render() {
    const { mockPeers } = this.state;

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
        </PeerTab>
        <ConnectivityState className='localdrop-connectivity-state'>
          Peer Connection State: Connected, <button> Retry </button>
        </ConnectivityState>
      </Fragment>
    )
  }
}

export default PeerTabComponent;
