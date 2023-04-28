import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const DataUsageStatus = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    height: 26px;
    padding: 0 15px;
    background: ${(props) =>
        props.isActive ? props.theme.StatusActive : props.theme.Grayscale03p5};
    border-radius: 9px;

    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: ${(props) =>
        props.isActive
            ? props.theme.StatusActiveText
            : props.theme.Grayscale02};
`;

// TODO (young): remove this later. It's unused
function DataUsageStatusComponent(props) {
    const { text, isActive } = props;
    return <DataUsageStatus isActive={isActive}>{text}</DataUsageStatus>;
}

DataUsageStatusComponent.propTypes = {
    text: PropTypes.string,
    isActive: PropTypes.bool,
};

DataUsageStatusComponent.defaultProps = {
    text: "empty",
    isActive: false,
};

export default DataUsageStatusComponent;
