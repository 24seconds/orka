import React, { Component } from 'react';
import styled from 'styled-components';
import { IMAGE_URL } from '../constants/constant';


const Footer = styled.div`
  display: flex;
  margin: 10px 0 0 0;
  padding-left: 5px;

  div {
    display: flex;
    align-items: center;
    text-align: left;
    color: $color-text;
    font-size: 14px;
    margin: 2px 20px 2px 0;
    cursor: pointer;

    img.github-mark {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
`;


export default class FooterComponent extends Component {
  constructor(props) {
    super(props);

    this.onClickId = this.onClickId.bind(this);
    this.onClickRepo = this.onClickRepo.bind(this);
  }

  onClickId() {
    window.open('https://github.com/24seconds/', '_blank');
  }

  onClickRepo() {
    window.open('https://github.com/24seconds/localdrop', '_blank');
  }

  render() {
    return (
      <Footer className='localdrop-footer'>
        <div onClick={ this.onClickId }>
          <img className='github-mark' src={ `${IMAGE_URL}/icon_github_mark.png` } alt="github icon" />
            24seconds
        </div>
        <div onClick={ this.onClickRepo }>
          <img className='github-mark' src={ `${IMAGE_URL}/icon_github_mark.png` } alt="github icon" />
          repo : localdrop
        </div>
      </Footer>
    );
  }
}