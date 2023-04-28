import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DownloadArrowIcon from "../../../assets/DownloadArrowIcon";
import { hoverOpacity } from "../../SharedStyle";
import { DATATYPE_FILE, DATATYPE_LINK, DATATYPE_TEXT } from "../../../constants/constant";

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
        ${(props) => props.type === DATATYPE_TEXT && "rotate: 270deg;"}
    }

    ${hoverOpacity}
`;

// TODO(young): implement onClick function later
function ActionButtonComponent(props) {
    const { type, onClick } = props;

    return (
        <ActionButton type={type} onClick={onClick}>
            <DownloadArrowIcon />
        </ActionButton>
    );
}

ActionButtonComponent.propTypes = {
    type: PropTypes.oneOf([DATATYPE_FILE, DATATYPE_LINK, DATATYPE_TEXT]).isRequired,
};

ActionButtonComponent.defaultProps = {
    type: "FILE",
};

export default ActionButtonComponent;
