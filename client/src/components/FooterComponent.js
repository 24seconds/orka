import React from "react";
import styled from "styled-components";
import GithubLogo from "../assets/GithubLogo";
import { mobileWidth } from "../constants/styleConstants";
import { LOCALDROP_APP_VERSION } from "../constants/constant";

const Footer = styled.div`
    display: flex;
    height: 40px;
    color: ${(props) => props.theme.StringsColor};
    background: ${(props) => props.theme.Background};

    div {
        display: flex;
        align-items: center;
        text-align: left;
        font-size: 14px;
        margin: 2px 20px 2px 20px;
        cursor: pointer;

        svg {
            width: 20px;
            height: 20px;
            margin-right: 6px;
            fill: ${(props) => props.theme.SecondText};
        }
    }

    .localdrop-app-version {
        margin-left: auto;
    }

    @media (max-width: ${mobileWidth}) {
        display: none;
    }
`;

function FooterComponent() {
    function onClickId() {
        window.open("https://github.com/24seconds/", "_blank");
    }

    function onClickRepo() {
        window.open("https://github.com/24seconds/localdrop", "_blank");
    }

    return (
        <Footer className="localdrop-footer">
            <div onClick={onClickId}>
                <GithubLogo />
                24seconds
            </div>
            <div onClick={onClickRepo}>
                <GithubLogo />
                repo : localdrop
            </div>
            <div className="localdrop-app-version">
                {`version: ${LOCALDROP_APP_VERSION}`}
            </div>
        </Footer>
    );
}

export default FooterComponent;
