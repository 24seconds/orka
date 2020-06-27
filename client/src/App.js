import React, { Component } from 'react';
import styled from 'styled-components';
import './utils/localApi';
import './utils/window';
import HeaderComponent from './components/HeaderComponent';
import PeerTabComponent from './components/Message/PeerTabComponent';
import MetaDataComponent from './components/MetaData/MetaDataComponent';
import MessageTableComponent from './components/Message/MessageTableComponent';
import MessageTableHeaderComponent from './components/Message/MessageTableHeaderComponent';
import FooterComponent from './components/FooterComponent';
import SendComponent from './components/Send/SendComponent';
import { mobileWidth, MaterialThemeOceanic } from './constants/styleConstants';

const LocalDropApp = styled.div`
  height: calc(100% - 110px);
  padding: 50px 100px;

  @media (max-width: ${ mobileWidth }) {
    padding: 0;
  }
`;

const Container = styled.div`
  border: solid 2px ${ MaterialThemeOceanic.Contrast };
  border-radius: 5px;
  height: 100%;

  @media (max-width: ${ mobileWidth }) {
    margin: 0;
    border: none;
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
      <LocalDropApp className="App">
        <Container clasName='localdrop-app-container'>
          <MobileSticky>
            <HeaderComponent />
            <SendComponent />
            <MetaDataComponent />
            <PeerTabComponent />
            <MessageTableHeaderComponent />
          </MobileSticky>
          <MessageTableComponent />
          <FooterComponent />
        </Container>
      </LocalDropApp>
    );
  }
}

export default App;
