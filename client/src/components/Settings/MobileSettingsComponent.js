import React from "react";
import styled, { css } from "styled-components";
import { mobileWidth } from "../../constants/styleConstants";
import store from "../../redux/store";
import { updateOrkaTheme } from "../../redux/action";
import { shallowEqual, useSelector } from "react-redux";
import { THEME_ORKA_DARK } from "../../constants/constant";

const CreatorBadgeContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const titleTextStyle = css`
    color: ${(props) => props.theme.MobileSettingTitle};
    font-size: 20px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.8px;
`;

const BadgeTitle = styled.div`
    flex-grow: 1;

    ${titleTextStyle}
`;

const Creators = styled.div`
    text-align: end;
    color ${(props) => props.theme.Grayscale01};
    font-size: 20px;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.8px;
`;

const DarkModeToggleContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const DarkModeTitle = styled.div`
    flex-grow: 1;

    ${titleTextStyle}
`;

const DarkModeToggle = styled.div`
    font-size: 20px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.8px;
    color: ${(props) =>
        props.isDarkMode ? props.theme.PrimaryColor : props.theme.Grayscale01};
`;

const MobileSetting = styled.div`
    @media (max-width: ${mobileWidth}) {
        width: 90vw;
        margin: 0 24px;
        grid-area: peer;
        height: 100%;
        min-height: 0;

        ${DarkModeToggleContainer} {
            margin-bottom 24px;
        }
    }
`;

function MobileSettingsComponent(props) {
    const orkaTheme = useSelector((state) => state.orkaTheme, shallowEqual);

    function onSwitchTheme() {
        store.dispatch(updateOrkaTheme());
    }

    function onClickGithub() {
        window.open("https://github.com/24seconds/orka", "_blank");
    }

    function onClickBehance() {
        window.open("https://www.behance.net/goodman089e31", "_blank");
    }

    const isDarkMode = orkaTheme?.name === THEME_ORKA_DARK;
    console.log("isDarkMode:", isDarkMode, orkaTheme, THEME_ORKA_DARK);

    return (
        <MobileSetting>
            <DarkModeToggleContainer>
                <DarkModeTitle>Darkmode</DarkModeTitle>
                <DarkModeToggle onClick={onSwitchTheme} isDarkMode={isDarkMode}>
                    {isDarkMode ? "on" : "off"}
                </DarkModeToggle>
            </DarkModeToggleContainer>
            <CreatorBadgeContainer>
                <BadgeTitle>We made this!</BadgeTitle>
                <Creators>
                    <div onClick={onClickGithub}>Geunyeong</div>
                    <div onClick={onClickBehance}>Sunghwan</div>
                </Creators>
            </CreatorBadgeContainer>
        </MobileSetting>
    );
}

export default MobileSettingsComponent;
