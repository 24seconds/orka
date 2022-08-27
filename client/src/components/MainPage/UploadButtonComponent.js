import React from "react";
import styled from "styled-components";
import UploadPlusIcon from "../../assets/UploadPlusIcon";

const UploadButton = styled.div`
    display: flex;
    align-items: center;
    width: 520px;
    height: 100px;
    background: ${(props) => props.theme.White};
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
    }

    .orka-icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 48px;
        cursor: pointer;
        transition: 0.2s linear;

        // Todo(young): execute animation when the button is clicked.
        &:hover {
            background: "#000000";
            transform: rotate(45deg);
        }
    }
`;

function UploadButtonComponent() {
    return (
        <UploadButton className="orka-upload-buton">
            <div className="orka-upload-button-title">Upload</div>
            <div className="orka-icon-container">
                <UploadPlusIcon />
            </div>
        </UploadButton>
    );
}

export default UploadButtonComponent;
