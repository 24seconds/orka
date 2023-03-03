import React, { useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { IMAGE_URL } from "../../../constants/constant";
import { getProfilePath } from "../../../utils/commonUtil";
import PeerNameTooltipComponent from "./PeerNameTooltipComponent";

const PeerMiniProfile = styled.div`
    border-radius: 50%;
    img {
        width: 36px;
        height: 36px;
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
    letter-spacing: -0.02em;

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    color: ${(props) => props.theme.Button};
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
    const peerNameEl = useRef(null);
    const [tooltipPosition, setTooltipPosition] = useState([0, 0]);

    function onMouseEnter() {
        const { right, bottom } = peerNameEl.current.getBoundingClientRect();
        setTooltipPosition([right - 100, bottom + 10]);
    }

    function onMouseLeave() {
        setTooltipPosition([0, 0]);
    }

    return (
        <PeerTitle>
            <PeerMiniProfile>
                <img src={`/${IMAGE_URL}/${profilePath}`} alt="peer profile" />
            </PeerMiniProfile>
            <PeerNameContainer>
                <PeerName
                    ref={peerNameEl}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {name}
                </PeerName>
                {tooltipPosition[0] !== 0 && tooltipPosition[1] !== 0 && (
                    <PeerNameTooltipComponent
                        name={name}
                        position={tooltipPosition}
                    />
                )}
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
