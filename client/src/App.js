import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import './utils/localApi';
import HeaderComponent from './components/HeaderComponent';
import PeerTabComponent from './components/Message/PeerTabComponent';
import MessageTableComponent from './components/Message/MessageTableComponent';
import FooterComponent from './components/FooterComponent';
import SendComponent from './components/Send/SendComponent';

const Container = styled.div`
  margin: 100px;
  border: solid 2px black;
  background: #ffff0030;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <HeaderComponent />
          <SendComponent />
          <PeerTabComponent />
          <MessageTableComponent />
          <FooterComponent />
        </Container>
      </div>
    );
  }
}

export default App;
