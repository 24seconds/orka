import React from "react";
import styled from "styled-components";
import HandsUpCheckIcon from "../../../assets/HandsUpCheckIcon";
import HandsUpIcon from "../../../assets/HandsUpIcon";
import { hoverOpacity } from "../../SharedStyle";
import StyledButton from "./StyledButton";

const HandsUpButton = styled(StyledButton)`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${(props) => props.theme.PrimaryColor};
    cursor: pointer;

    ${hoverOpacity}
`;

// TODO(young): seems unused. remove it later (2022-08-27)
function HandsUpButtonComponent(props) {
    const { isActive, onClick } = props;

    return (
        <HandsUpButton isActive={isActive} onClick={onClick}>
            {/* <div className="orka-title">Hands up!</div>
            <div className="orka-icon-container">
                {isActive ? <HandsUpIcon /> : <HandsUpCheckIcon />}
            </div> */}
            <HandsUpIcon />
        </HandsUpButton>
    );
}

export default HandsUpButtonComponent;
