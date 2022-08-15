import React from "react";
import styled from "styled-components";
import UploadPlusIcon from "../../assets/UploadPlusIcon";

const UploadButton = styled.div`
    display: flex;
    align-items: center;
    width: 520px;
    height: 100px;
    background: ${(props) => props.theme.PrimaryColor};
    border-radius: 30px;

    font-size: 32px;
    line-height: 32px;

    .orka-upload-button-title {
        display: flex;
        width: 100%;
        align-items: center;
        font-weight: 600;
        margin: 34px 0 34px 48px;
    }

    .orka-icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 54px;
        height: 54px;
        margin-right: 16px;
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
