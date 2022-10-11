import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import UploadPlusIcon from "../../assets/UploadPlusIcon";

const UploadButton = styled.div`
    display: flex;
    align-items: center;
    width: 520px;
    height: 100px;
    background: ${(props) => props.theme.Button};
    border-radius: 30px;
    cursor: pointer;

    font-weight: 600;
    font-size: 32px;
    line-height: 32px;
    letter-spacing: -0.04em;

    .orka-upload-button-title {
        display: flex;
        width: 100%;
        align-items: center;
        font-weight: 600;
        margin-left: 48px;

        color: ${(props) => props.theme.IconColor};
    }

    .orka-icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 48px;
        cursor: pointer;
        transition: 0.2s linear;

        ${(props) => props.isActive && `transform: rotate(45deg)`};

        path {
            stroke: ${(props) => props.theme.IconColor};
        }
    }
`;

function UploadButtonComponent(props) {
    const { className, isActive } = props;

    return (
        <UploadButton
            className={className || "orka-upload-button"}
            onClick={props.onClick}
            isActive={isActive}
        >
            <div className="orka-upload-button-title">Upload</div>
            <div className="orka-icon-container">
                <UploadPlusIcon />
            </div>
        </UploadButton>
    );
}

UploadButtonComponent.propTypes = {
    isActive: PropTypes.bool,
};

export default UploadButtonComponent;
