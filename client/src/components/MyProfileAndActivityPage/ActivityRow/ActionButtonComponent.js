import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DownloadArrowIcon from "../../../assets/DownloadArrowIcon";
import { hoverOpacity } from "../../SharedStyle";

const ActionButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;
    border-radius: 27px;
    background: ${(props) => props.theme.PrimaryColor};
    cursor: pointer;

    svg {
        ${(props) => props.type === "TEXT" && "rotate: 270deg;"}
    }

    ${hoverOpacity}
`;

// TODO(young): implement onClick function later
function ActionButtonComponent(props) {
    const { type, onClick } = props;

    return (
        <ActionButton type={type} onClick={type === "FILE" ? onClick : null}>
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
