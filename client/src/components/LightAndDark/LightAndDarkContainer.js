import React from "react";
import styled from "styled-components";
import DarkModeComponent from "./DarkModeComponent";
import LightModeComponent from "./LightModeComponent";

const LightAndDarkContainer = styled.div``;

function LightAndDarkContainerComponent(props) {
    const { className, onChangeTheme } = props;

    console.log("props?.theme?.name:", props?.theme?.name);

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
