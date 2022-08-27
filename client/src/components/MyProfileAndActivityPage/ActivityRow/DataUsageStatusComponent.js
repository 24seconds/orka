import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const DataUsageStatus = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 116px;
    height: 26px;
    background: ${(props) => props.theme.ActivityRowBackgroundscale01};
    border-radius: 9px;

    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.04em;
    color: ${(props) => props.theme.Grayscale02};
`;

function DataUsageStatusComponent(props) {
    const { text } = props;
    return <DataUsageStatus>{text}</DataUsageStatus>;
}

DataUsageStatusComponent.propTypes = {
    text: PropTypes.string,
};

DataUsageStatusComponent.defaultProps = {
    text: "empty",
};

export default DataUsageStatusComponent;
