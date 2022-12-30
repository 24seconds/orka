import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const PeerNameTooltip = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    height: 30px;
    background: ${(props) => props.theme.PrimaryColor};

    position: fixed;
    text-align: center;
    border-radius: 30px;

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    top: ${(props) => props.positionY}px;
    left: ${(props) => props.positionX}px;
`;

function PeerNameTooltipComponent(props) {
    const { className, name, position } = props;
    const [x, y] = position;

    return (
        <PeerNameTooltip className={className} positionX={x} positionY={y}>
            {name}
        </PeerNameTooltip>
    );
}

PeerNameTooltipComponent.propTypes = {
    name: PropTypes.string,
};

export default PeerNameTooltipComponent;
