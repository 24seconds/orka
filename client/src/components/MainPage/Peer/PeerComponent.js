import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import PeerTitleComponent from "./PeerTitleComponent";
import PeerRecentComponent from "./PeerRecentComponent";

const selectedStyle = css`
    outline: 2px solid ${(props) => props.theme.PrimaryColor};
`;

const Peer = styled.div`
    display: flex;
    flex-direction: column;
    width: 164px;
    height: 245px;
    border-radius: 30px;
    cursor: pointer;

    background: ${(props) => props.theme.Grayscale03};
    ${(props) => props.isSelected && selectedStyle}
`;

function PeerComponent(props) {
    const { orders, dataTypes, isSelected, onClick, uuid } = props;

    return (
        <Peer
            isSelected={isSelected}
            onClick={() => {
                onClick(uuid);
            }}
        >
            <PeerTitleComponent />
            <PeerRecentComponent orders={orders} dataTypes={dataTypes} />
        </Peer>
    );
}

PeerComponent.propTypes = {
    orders: PropTypes.array,
    dataTypes: PropTypes.array,
    isSelected: PropTypes.bool,
    uuid: PropTypes.string,
};

PeerComponent.defaultProps = {
    orders: ["0", "1"],
    dataTypes: ["PNG", "TXT"],
    isSelected: false,
    uuid: "",
};

export default PeerComponent;
