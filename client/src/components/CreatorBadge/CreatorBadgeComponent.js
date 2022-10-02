import React from "react";
import styled from "styled-components";
import BehanceLogo from "../../assets/BehanceLogo";
import GithubLogo from "../../assets/GithubLogo";
import { THEME_ORKA_DARK } from "../../constants/constant";

const CreatorBadge = styled.div`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    column-gap: 26px;
`;
const Container = styled.div`
    display: flex;
    align-items: center;

    font-weight: 300;
    font-size: 18px;
    line-height: 23px;
    letter-spacing: -0.04em;
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
`;

function CreatorBadgeComponent(props) {
    const { className } = props;

    return (
        <CreatorBadge className={className}>
            <Container>
                <div className="orka-github-logo">
                    <GithubLogo />
                </div>
                <span>24seconds</span>
            </Container>
            <Container>
                <BehanceLogo />
                <span>Sunghwan Kim</span>
            </Container>
        </CreatorBadge>
    );
}

export default CreatorBadgeComponent;
