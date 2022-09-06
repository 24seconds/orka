import React from "react";
import styled from "styled-components";

const UploadFiles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 520px;
    background: ${(props) => props.theme.Grayscale03};
    border-radius: 30px;

    .orka-or {
        margin: 18px 0;
    }
`;

const BrowsFiles = styled.button`
    width: 220px;
    height: 62px;
    cursor: pointer;
    border: 1.5px solid ${(props) => props.theme.ActivityRowBackgroundscale02};
    border-radius: 18px;
    background: transparent;
    margin-bottom: 32px;

    font-weight: 500;
    font-size: 24px;
    color: ${(props) => props.theme.ActivityRowBackgroundscale02};
    letter-spacing: -0.04em;
    line-height: 29px;
`;

const Description = styled.div`
    width: 300px;
    margin: 29px 109px 0 109px;
    color: ${(props) => props.theme.Grayscale01};
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    letter-spacing: -0.04em;
`;

function UploadFilesComponent(props) {
    const { className } = props;

    return (
        <UploadFiles className={className}>
            <Description>
                <div>
                    Drag your documents, photos or videos here to uploading.
                </div>
                <div className="orka-or">or</div>
            </Description>
            <BrowsFiles>Browse files</BrowsFiles>
        </UploadFiles>
    );
}

export default UploadFilesComponent;
