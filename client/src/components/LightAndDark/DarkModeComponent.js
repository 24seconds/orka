import React from "react";
import styled from "styled-components";
import DarkModeIcon from "../../assets/DarkModeIcon";

const DarkMode = styled.button`
    display: flex;
    align-items: center;
    column-gap: 12px;
    width: 171px;
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

    letter-spacing: -0.02em;
    color: ${(props) => props.theme.Grayscale01};

    > svg {
        margin-left: 10px;
    }

    > span {
        width: 107px;
    }

    &:hover {
        color: ${(props) => props.theme.White};

        > svg {
            > path {
                fill: ${(props) => props.theme.White};
            }
        }
    }
`;

function DarkModeComponent() {
    return (
        <DarkMode>
            <DarkModeIcon />
            <span>Dark mode</span>
        </DarkMode>
    );
}

export default DarkModeComponent;
