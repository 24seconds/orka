import React, { Component } from 'react';
import styled from 'styled-components';

const Header = styled.div`
  text-align: center;
  border: solid 1px black;
  font-size: 26px;
`;


class HeaderComponent extends Component {
  render() {
    return (
      <Header className='localdrop-header' >
        LOCAL Drop!
      </Header>
    );
  }
}


export default HeaderComponent;
