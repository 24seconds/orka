import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import PeerTitleComponent from "./PeerTitleComponent";
import PeerRecentComponent from "./PeerRecentComponent";
import { updateSelectedRowID } from "../../../utils/localApi";
import {
    DATA_EXTENSION_GENERAL,
    DATA_EXTENSION_IMAGE,
} from "../../../constants/constant";
import { PeerStyle } from "../../SharedStyle";

const selectedStyle = css`
    /* outline: 2px solid ${(props) => props.theme.PrimaryColor}; */
    border: 2px solid ${(props) => props.theme.PrimaryColor};
`;

const Peer = styled.div`
    ${PeerStyle}

    background: ${(props) => props.theme.Grayscale03};
    ${(props) => props.isSelected && selectedStyle}

    &:hover {
        /* outline: 2px solid ${(props) => props.theme.Grayscale01}; */
        border: 2px solid ${(props) => props.theme.Grayscale01};

        svg > path {
            fill: ${(props) => props.theme.White};
        }
    }
`;

function PeerComponent(props) {
    const { name, profile, orders, dataExtensions, isSelected, onClick, uuid } =
        props;

    const isEmpty = dataExtensions?.length === 0;

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
                <PeerRecentComponent
                    orders={orders}
                    dataExtensions={dataExtensions}
                />
            )}
        </Peer>
    );
}

PeerComponent.propTypes = {
    name: PropTypes.string,
    profile: PropTypes.number,
    orders: PropTypes.array,
    dataExtensions: PropTypes.array,
    isSelected: PropTypes.bool,
    uuid: PropTypes.string,
};

PeerComponent.defaultProps = {
    name: "",
    profile: 0,
    orders: ["0", "1"],
    dataExtensions: [DATA_EXTENSION_IMAGE, DATA_EXTENSION_GENERAL],
    isSelected: false,
    uuid: "",
};

export default PeerComponent;
