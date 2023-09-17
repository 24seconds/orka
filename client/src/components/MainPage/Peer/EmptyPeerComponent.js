import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { PeerStyle } from "../../SharedStyle";

const Peer = styled.div`
    ${PeerStyle}

    background: ${(props) => props.theme.Grayscale04};
`;

function EmptyPeerComponent(props) {
    const { uuid } = props;

    return <Peer></Peer>;
}

EmptyPeerComponent.propTypes = {
    uuid: PropTypes.string,
};

EmptyPeerComponent.defaultProps = {
    uuid: "",
};

export default EmptyPeerComponent;
