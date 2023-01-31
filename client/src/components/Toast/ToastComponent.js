import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Toast = styled.div``;

function ToastComponent(props) {
    const { className } = props;

    return <Toast className={className}></Toast>;
}

export default ToastComponent;
