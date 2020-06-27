import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { mobileWidth, MaterialThemeOceanic } from '../../constants/styleConstants';


const MyUUID = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  font-size: 14px;
  color: ${ MaterialThemeOceanic.StringsColor };
  background-color: ${ MaterialThemeOceanic.SecondBackground };

  span {
    margin-right: 8px;
    margin: 0 8px 0 10px;
    color: ${ MaterialThemeOceanic.ParametersColor };
  }

  @media (max-width: ${ mobileWidth }) {
    height: 25px;
  }
`;

class MetaDataComponent extends Component {
  render() {
    const { myUUID } = this.props

    return (
      <MyUUID>
        <span>My uuid:</span>
        { `${ myUUID ? ('#'+ myUUID) : '' }` }
      </MyUUID>
    )
  }
}

const mapStateToProps = state => ({
  myUUID: state.myUUID,
});
export default connect(mapStateToProps)(MetaDataComponent);