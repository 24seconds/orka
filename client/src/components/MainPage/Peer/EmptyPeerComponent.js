import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { PeerStyle } from "../../SharedStyle";

const Peer = styled.div`
    ${PeerStyle}

    background: ${(props) => props.theme.Grayscale04};
`;

function EmpyPeerComponent(props) {
    const { uuid } = props;

    return <Peer></Peer>;
}

EmpyPeerComponent.propTypes = {
    uuid: PropTypes.string,
};

EmpyPeerComponent.defaultProps = {
    uuid: "",
};

export default EmpyPeerComponent;
