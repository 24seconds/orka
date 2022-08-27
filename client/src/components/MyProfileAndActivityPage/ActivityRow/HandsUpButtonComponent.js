import React from "react";
import styled from "styled-components";
import HandsUpCheckIcon from "../../../assets/HandsUpCheckIcon";
import HandsUpIcon from "../../../assets/HandsUpIcon";
import StyledButton from "./StyledButton";

const HandsUpButton = styled(StyledButton)`
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.04em;
    color: ${(props) =>
        props.isActive
            ? props.theme.Grayscale03
            : props.theme.ActivityRowButtonTextscale02};
    background: ${(props) =>
        props.isActive
            ? props.theme.White
            : props.theme.PlaceholderBackgroundscale01};

    .orka-title {
        margin-left: 20px;
    }

    .orka-icon-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        margin-left: auto;
        margin-right: 20px;
    }
`;

// TODO(young): seems unused. remove it later (2022-08-27)
function HandsUpButtonComponent(props) {
    const { isActive } = props;

    return (
        <HandsUpButton isActive={isActive}>
            <div className="orka-title">Hands up!</div>
            <div className="orka-icon-container">
                {isActive ? <HandsUpIcon /> : <HandsUpCheckIcon />}
            </div>
        </HandsUpButton>
    );
}

export default HandsUpButtonComponent;
