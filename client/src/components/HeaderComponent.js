import React, { Component } from 'react';
import styled from 'styled-components';
import { IMAGE_URL } from '../constants/constant';
import { mobileWidth } from '../constants/styleConstants';

const Header = styled.div`
  text-align: center;
  border: solid 1px black;
  font-size: 26px;
  height: 60px;

  .localdrop-header-title {
    display: flex;
    height: 100%;
    align-items: center;
    margin-left: 20px;
  }

  .localdrop-header-github {
    display: none;
  }

  @media (max-width: ${ mobileWidth }) {
    display: flex;
    height: 50px;
    text-align: left;

    .localdrop-header-title {
      flex-grow: 1;
      text-align: left;

      margin-left: 10px;
      font-size: 18px;
    }

    .localdrop-header-github {
      display: flex;
      font-size: 14px;
      justify-content: center;
      align-items: center;
      margin-right: 10px;

      img {
        width: 16px;
        height: 16px;
        margin-right: 6px;
      }
    }
  }
`;


class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.onClickRepo = this.onClickRepo.bind(this);
  }

  onClickRepo() {
    window.open('https://github.com/24seconds/localdrop', '_blank');
  }

  render() {
    return (
      <Header className='localdrop-header' >
        <div className='localdrop-header-title'>
          Local Drop!
        </div>
        <div className='localdrop-header-github' onClick={ this.onClickRepo }>
          <img className='github-mark' src={ `${IMAGE_URL}/icon_github_mark.png` } alt="github icon" />
          localdrop
        </div>
      </Header>
    );
  }
}


export default HeaderComponent;
