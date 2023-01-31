import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Peer = styled.div`
    display: flex;
    flex-direction: column;
    width: 164px;
    height: 244px;

    border-radius: 30px;
    box-sizing: border-box;
    border: 2px solid transparent;

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
