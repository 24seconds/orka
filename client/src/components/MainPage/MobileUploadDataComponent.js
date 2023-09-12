import React, { useState, useCallback } from "react";
import styled, { css } from "styled-components";
import MobileUploadFileIcon from "../../assets/MobileUploadFileIcon";
import MobileUploadTextIcon from "../../assets/MobileUploadTextIcon";
import { useOnDrop } from "./UploadFilesComponent";
import { useDropzone } from "react-dropzone";
import UploadLinkComponent from "./UploadLinkComponent";

const MobileUploadData = styled.div`
    display: flex;
    flex-direction: column;

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background: ${(props) => props.theme.MobileUploadDataDimLayout};
    z-index: 100;

    .dimmed-area {
        width: 100%;
        height: auto;
        flex-grow: 1;
    }
`;

const containerCss = css`
    display: flex;
    align-items: center;
    height: 36px;
    color: ${(props) => props.theme.MobileUplaodDataText};
    font-size: 20px;
    font-weight: 500;
`;

const UploadFileContainer = styled.div`
    ${containerCss}
`;

const UploadTextContainer = styled.div`
    ${containerCss}
`;

const UploadTextDesc = styled.div`
    margin-left: 4px;
`;

const UploadDataContainer = styled.div`
    position: sticky;
    background: red;
    background: ${(props) => props.theme.Grayscale03};
    border-radius: 20px 20px 0px 0px;
    width: 100%;

    ${UploadFileContainer} {
        margin-top: 24px;
        margin-bottom: 18px;
        margin-left: 18px;
    }

    ${UploadTextContainer} {
        margin-left: 18px;
        margin-bottom: 24px;
    }

    ${(props) =>
        props.isUploadTextActive &&
        css`
            ${UploadTextContainer} {
                margin-top: 24px;
                margin-bottom: 24px;
            }
        `}
`;

const IconContainer = styled.div`
    display: flex;
    justifycontent: center;
    alignitems: center;
`;

function MobileUploadDataComponent(props) {
    const { className, onClick } = props;
    const [isUploadTextActive, setIsUploadTextActive] = useState(false);
    const toastMessage = {
        title: "Success!",
        description: "",
    };

    const onDrop = useOnDrop(true, true, toastMessage);

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        // noClick: true,
    });

    const onClickUploadTextContainer = useCallback(() => {
        setIsUploadTextActive(true);
    }, []);

    return (
        <MobileUploadData className={className}>
            <div className="dimmed-area" onClick={onClick}></div>
            <UploadDataContainer isUploadTextActive={isUploadTextActive}>
                {!isUploadTextActive && (
                    <UploadFileContainer {...getRootProps()}>
                        <IconContainer>
                            <MobileUploadFileIcon />
                        </IconContainer>
                        <input {...getInputProps()} />
                        <UploadTextDesc>Upload a files</UploadTextDesc>
                    </UploadFileContainer>
                )}
                <UploadTextContainer onClick={onClickUploadTextContainer}>
                    <IconContainer>
                        <MobileUploadTextIcon />
                    </IconContainer>
                    <UploadTextDesc>Upload a URL or text</UploadTextDesc>
                </UploadTextContainer>
                {isUploadTextActive && (
                    <UploadLinkComponent
                        shouldTriggerToast={true}
                        shouldToggleModal={true}
                        toastMessage={toastMessage}
                    />
                )}
            </UploadDataContainer>
        </MobileUploadData>
    );
}

export default MobileUploadDataComponent;
