import React, { Component } from "react";
import styled from "styled-components";
import { colorCheckBoxBorder } from "../../constants/styleConstants";

const CheckBox = styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
    position: relative;
    width: 20px;
    height: 20px;
    border: solid 2px ${(props) => props.borderColor};
    border-radius: 2px;

    &:hover {
        cursor: pointer;
        opacity: 0.6;
    }

    .check-mark {
        position: absolute;
        top: 4px;
        left: 4px;
        width: 11px;
        height: 5px;
        transform: rotateZ(135deg);
        // TODO: Change color to Material color
        border: solid 2px red;
        border-bottom: none;
        border-left: none;
    }
`;

export default class CheckBoxComponent extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { onClick, isChecked } = this.props;

        if (onClick) {
            onClick(!isChecked);
        }
    }

    render() {
        const { isChecked } = this.props;

        return (
            <CheckBox
                className="localdrop-checkbox-component"
                onClick={this.onClick}
                borderColor={colorCheckBoxBorder}
            >
                <div className={isChecked ? "check-mark" : null} />
            </CheckBox>
        );
    }
}
