import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import './utils/localApi';
import HeaderComponent from './components/HeaderComponent';
import PeerTabComponent from './components/Message/PeerTabComponent';
import MessageTableComponent from './components/Message/MessageTableComponent';
import MessageTableHeaderComponent from './components/Message/MessageTableHeaderComponent';
import FooterComponent from './components/FooterComponent';
import SendComponent from './components/Send/SendComponent';
import { mobileWidth, MaterialThemeOceanic } from './constants/styleConstants';

const Container = styled.div`
  margin: 50px 100px;
  border: solid 2px ${ MaterialThemeOceanic.Contrast };
  border-radius: 5px;

  @media (max-width: ${ mobileWidth }) {
    margin: 0;
    border-bottom: none;
  }
`;

const MobileSticky = styled.div`
  @media (max-width: ${ mobileWidth }) {
    position: sticky;
    top: 0;
  }
`

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <MobileSticky>
            <HeaderComponent />
            <SendComponent />
            <PeerTabComponent />
            <MessageTableHeaderComponent />
          </MobileSticky>
          <MessageTableComponent />
          <FooterComponent />
        </Container>
      </div>
    );
  }
}

export default App;
