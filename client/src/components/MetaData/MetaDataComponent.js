import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { MaterialThemeOceanic } from '../../constants/styleConstants';


const MyUUID = styled.div`
  display: flex;
  height: 30px;
  margin: 0 0 0 10px;
  align-items: center;
  font-size: 14px;
  color: ${ MaterialThemeOceanic.StringsColor };
  background-color: ${ MaterialThemeOceanic.SecondBackground };

  span {
    margin-right: 8px;
    color: ${ MaterialThemeOceanic.ParametersColor };
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