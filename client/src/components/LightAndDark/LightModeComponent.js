import React from "react";
import styled from "styled-components";
import LightModeIcon from "../../assets/LightModeIcon";

const LightMode = styled.button`
    display: flex;
    align-items: center;
    column-gap: 20px;
    width: 170px;
    height: 42px;

    padding: 0;
    border: none;
    cursor: pointer;
    background: ${(props) => props.theme.Grayscale03};
    border-radius: 21px;

    font-weight: 400;
    font-size: 20px;
    line-height: 100%;
    /* identical to box height, or 20px */

    letter-spacing: -0.04em;
    color: ${(props) => props.theme.Grayscale01};

    > svg {
        margin-left: 7px;
    }
`;

function LightModeComponent() {
    return (
        <LightMode>
            <LightModeIcon />
            <span>Light mode</span>
        </LightMode>
    );
}

export default LightModeComponent;
