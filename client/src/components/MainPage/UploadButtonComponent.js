import React from "react";
import styled from "styled-components";

const UploadButton = styled.div`
    display: flex;
    width: 520px;
    height: 100px;
    background: ${(props) => props.theme.PrimaryColor};
    border-radius: 30px;

    font-size: 32px;
    line-height: 32px;

    .orka-upload-button-title {
        display: flex;
        align-items: center;
        font-weight: 600;
        margin: 34px 0 34px 48px;
    }
`;

function UploadButtonComponent() {
    return (
        <UploadButton className="orka-upload-buton">
            <div className="orka-upload-button-title">Upload</div>
        </UploadButton>
    );
}

export default UploadButtonComponent;
