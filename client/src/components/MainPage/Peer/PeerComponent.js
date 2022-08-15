import React, { useCallback, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import PeerTitleComponent from "./PeerTitleComponent";
import PeerRecentComponent from "./PeerRecentComponent";

const Peer = styled.div`
    display: flex;
    flex-direction: column;
    width: 164px;
    height: 245px;
    border-radius: 30px;

    background: ${(props) => props.theme.Grayscale03};
`;

function PeerComponent(props) {
    const { orders, dataTypes } = props;

    return (
        <Peer>
            <PeerTitleComponent />
            <PeerRecentComponent orders={orders} dataTypes={dataTypes} />
        </Peer>
    );
}

PeerComponent.propTypes = {
    orders: PropTypes.array,
    dataTypes: PropTypes.array,
};

PeerComponent.defaultProps = {
    orders: ["0", "1"],
    dataTypes: ["PNG", "TXT"],
};

export default PeerComponent;
