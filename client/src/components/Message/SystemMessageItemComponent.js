import React, { Component } from 'react';
import styled from 'styled-components';
import { MaterialThemeOceanic } from '../../constants/styleConstants';

const SystemMessageItem = styled.div`
  display:flex;
  align-items: center;
  min-height: 30px;
  border-bottom: solid 1px black;
  color: white;

  span {
    min-width: 125px;
    color: ${ MaterialThemeOceanic.TagsColor };
    margin: 0 10px 0 10px;
    font-size: 14px;
  }

  pre {
    white-space: pre-wrap;
    margin-right: 5px;
    color: ${ MaterialThemeOceanic.StringsColor };
  }

`;

export default class SystemMessageItemComponent extends Component {
  render() {
    const { systemMessage } = this.props;

    return (
      <SystemMessageItem>
        <span>[System] { `${ systemMessage.createdAt }:` }</span>
        <pre>
          { systemMessage.message }
        </pre>
      </SystemMessageItem>
    )
  }
}