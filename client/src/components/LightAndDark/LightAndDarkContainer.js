import React from "react";
import styled from "styled-components";
import DarkModeComponent from "./DarkModeComponent";
import LightModeComponent from "./LightModeComponent";
import { mobileWidth } from "../../constants/styleConstants";

const LightAndDarkContainer = styled.div`
    @media (max-width: ${mobileWidth}) {
        display: none;
    }
`;

function LightAndDarkContainerComponent(props) {
    const { className, onChangeTheme } = props;

    return (
        <LightAndDarkContainer className={className} onClick={onChangeTheme}>
            {props?.theme?.name === "OrkaDark" ? (
                <DarkModeComponent />
            ) : (
                <LightModeComponent />
            )}
        </LightAndDarkContainer>
    );
}

export default LightAndDarkContainerComponent;
