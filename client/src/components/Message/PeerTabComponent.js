import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { connectToPeer } from '../../utils/localApi';
import { updatePeerUUID } from '../../redux/action';
import StreamSaver from 'streamsaver';
import { generateFingerPrint } from '../../utils/messagePacket';

StreamSaver.mitm = `${ process.env.REACT_APP_MITM_URL }/mitm.html?version=2.0.0`;

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
    this.onTestPostMessage = this.onTestPostMessage.bind(this);
  }

  onClick(uuid) {
    console.log('uuid is ', uuid);

    this.props.dispatch(updatePeerUUID(uuid));
    connectToPeer(uuid);
  }

  async onTestPostMessage() {
    const byte = new TextEncoder().encode("hahaha");

    const options = {
      pathname: generateFingerPrint(),
      size: 1024 * byte.length,
    };
    const fileStream = StreamSaver.createWriteStream('test_streamsaver2.txt', options);
    window.fileStream = fileStream;

    const writer = fileStream.getWriter();
    window.writer = writer;

    window.onunload = () => window.writer.abort();

    writer.write(byte)
    let i = 1
    const interval = setInterval(() => {
      writer.write(byte)
      i++
      writer.write(byte)
      i++
      writer.write(byte)
      i++
      writer.write(byte)
      i++

      if (i >= 1024) {
        writer.close()
        clearInterval(interval)

        const iframes = document.querySelectorAll('iframe');

        console.log('iframes is ', iframes);

        iframes.forEach(iframe => {
          console.log('iframe is ', iframe);
          console.log('iframe.src is ', iframe.src);

          if (iframe.src.includes(options.pathname)) {
            console.log('remove iframe: ', options.pathname);
            iframe.remove();
          }
        })
      }
    }, 1);

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
                <PeerTabButton onClick={ this.onTestPostMessage }>
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
