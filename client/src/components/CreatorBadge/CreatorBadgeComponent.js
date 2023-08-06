import React from "react";
import styled from "styled-components";
import BehanceLogo from "../../assets/BehanceLogo";
import GithubLogo from "../../assets/GithubLogo";
import { THEME_ORKA_DARK } from "../../constants/constant";
import { mobileWidth } from "../../constants/styleConstants";

const CreatorBadge = styled.div`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    column-gap: 26px;
`;
const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    font-weight: 300;
    font-size: 18px;
    line-height: 23px;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.Grayscale01};

    svg {
        width: 20px;
        height: 20px;
        margin-right: 8px;
    }

    .orka-github-logo {
        svg {
            fill: ${(props) =>
                props.theme.name === THEME_ORKA_DARK
                    ? props.theme.White
                    : props.theme.Black};
        }
    }

    @media (max-width: ${mobileWidth}) {
        display: none;
    }
`;

function CreatorBadgeComponent(props) {
    const { className } = props;

    function onClickGithub() {
        window.open("https://github.com/24seconds/orka", "_blank");
    }

    function onClickBehance() {
        window.open("https://www.behance.net/goodman089e31", "_blank");
    }

    return (
        <CreatorBadge className={className}>
            <Container onClick={onClickGithub}>
                <div className="orka-github-logo">
                    <GithubLogo />
                </div>
                <span>24seconds</span>
            </Container>
            <Container onClick={onClickBehance}>
                <BehanceLogo />
                <span>Sunghwan Kim</span>
            </Container>
        </CreatorBadge>
    );
}

export default CreatorBadgeComponent;
