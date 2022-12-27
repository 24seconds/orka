import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { IMAGE_URL } from "../../../constants/constant";
import { getProfilePath } from "../../../utils/commonUtil";

const PeerMiniProfile = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;

    img {
        width: 100%;
        height: 100%;
    }
`;

const PeerNameContainer = styled.div`
    display: flex;
    align-items: center;
    height: 38px;
`;

const PeerName = styled.div`
    width: 82px;

    font-size: 18px;
    line-height: 110%;
    letter-spacing: -0.04em;

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    color: ${(props) => props.theme.Button};

    // TODO(young): Not sure about how to handle this.
    &:hover {
        overflow: visible;
        white-space: normal;
        height: auto;
    }
`;

const PeerTitle = styled.div`
    display: flex;
    height: 38px;

    margin: 20px 20px 0 20px;

    font-weight: 500;
    color: ${(props) => props.theme.White};

    ${PeerNameContainer} {
        margin-left: 6px;
    }
`;

function PeerTitleComponent(props) {
    const { name, profile } = props;

    const profilePath = getProfilePath(profile);

    return (
        <PeerTitle>
            <PeerMiniProfile>
                <img src={`/${IMAGE_URL}/${profilePath}`} alt="peer profile" />
            </PeerMiniProfile>
            <PeerNameContainer>
                <PeerName>{name}</PeerName>
            </PeerNameContainer>
        </PeerTitle>
    );
}

PeerTitleComponent.propTypes = {
    name: PropTypes.string,
    profile: PropTypes.number,
};

PeerTitleComponent.defaultProps = {
    name: "",
    profile: 0,
};

export default PeerTitleComponent;
