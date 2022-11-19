import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import PeerTitleComponent from "./PeerTitleComponent";
import PeerRecentComponent from "./PeerRecentComponent";
import { updateSelectedRowID } from "../../../utils/localApi";

const selectedStyle = css`
    outline: 2px solid ${(props) => props.theme.PrimaryColor};
`;

const Peer = styled.div`
    display: flex;
    flex-direction: column;
    width: 164px;
    height: 244px;
    border-radius: 30px;
    cursor: pointer;

    background: ${(props) => props.theme.Grayscale03};
    ${(props) => props.isSelected && selectedStyle}
`;

function PeerComponent(props) {
    const { name, profile, orders, dataTypes, isSelected, onClick, uuid } =
        props;

    const isEmpty = dataTypes?.length === 0;

    return (
        <Peer
            isSelected={isSelected}
            onClick={() => {
                onClick(uuid);
                updateSelectedRowID(null);
            }}
        >
            <PeerTitleComponent name={name} profile={profile} />
            {!isEmpty && (
                <PeerRecentComponent orders={orders} dataTypes={dataTypes} />
            )}
        </Peer>
    );
}

PeerComponent.propTypes = {
    name: PropTypes.string,
    profile: PropTypes.number,
    orders: PropTypes.array,
    dataTypes: PropTypes.array,
    isSelected: PropTypes.bool,
    uuid: PropTypes.string,
};

PeerComponent.defaultProps = {
    name: "",
    profile: 0,
    orders: ["0", "1"],
    dataTypes: ["PNG", "TXT"],
    isSelected: false,
    uuid: "",
};

export default PeerComponent;
