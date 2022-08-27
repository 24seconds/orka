import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DownloadArrowIcon from "../../../assets/DownloadArrowIcon";

const ActionButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;
    border-radius: 27px;
    background: ${(props) => props.theme.ActivityRowBackgroundscale02};
    cursor: pointer;

    svg {
        ${(props) => props.type === "TEXT" && "rotate: 270deg;"}
    }
`;

// TODO(young): implement onClick function later
function ActionButtonComponent(props) {
    const { type } = props;

    return (
        <ActionButton type={type}>
            <DownloadArrowIcon />
        </ActionButton>
    );
}

ActionButtonComponent.propTypes = {
    type: PropTypes.oneOf(["FILE", "TEXT"]).isRequired,
};

ActionButtonComponent.defaultProps = {
    type: "FILE",
};

export default ActionButtonComponent;
