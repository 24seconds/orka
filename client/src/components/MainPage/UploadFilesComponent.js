import React, { useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { Fragment } from "react";
import {
    generateFingerPrint,
    getSubtypeOfMIMEtypes,
} from "../../utils/commonUtil";
import FingerprintedFile from "../../utils/dataSchema/FingerprintedFile";
import {
    addFingerPrintedFiles,
    createTableSharingData,
    notifySharingData,
} from "../../utils/localApi";
import { DATATYPE_FILE } from "../../constants/constant";

const UploadFiles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 520px;
    background: ${(props) => props.theme.Grayscale03};
    border-radius: 30px;
    cursor: pointer;

    .orka-or {
        margin: 18px 0;
    }

    .orka-release-desc {
        margin-bottom: 18px;
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

    const onDrop = useCallback(async (acceptedFiles) => {
        // store File object in somehwere; store file related data to db;
        // display upload process - 0.3~0.5sec animation is okay
        if (acceptedFiles?.length === 0) {
            return;
        }

        const fingerprintedFiles = [];
        for (let i = 0; i < acceptedFiles.length; i++) {
            fingerprintedFiles.push(
                new FingerprintedFile({
                    file: acceptedFiles[i],
                    // TODO(young): use generateSharingDataUUID later and unify terminology
                    // fingerprint (x), data UUID (o)
                    fingerprint: generateFingerPrint(),
                })
            );
        }

        // save to database
        const sharingDataList = await Promise.all(
            fingerprintedFiles.map((fingerprintedFile) => {
                const dataID = fingerprintedFile.fingerprint;
                const fileName = fingerprintedFile.file.name;
                const fileType =
                    getSubtypeOfMIMEtypes(fingerprintedFile.file.type) ||
                    "unknown";
                const sizeInBytes = fingerprintedFile.file.size;

                return createTableSharingData({
                    dataID,
                    type: DATATYPE_FILE,
                    name: fileName,
                    size: sizeInBytes,
                    extension: fileType,
                });
            })
        );

        // save in store
        addFingerPrintedFiles(fingerprintedFiles);

        // notify to other peers
        if (sharingDataList?.length > 0) {
            for (const sharingData of sharingDataList) {
                await notifySharingData(sharingData);
            }
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <UploadFiles className={className} {...getRootProps()}>
            <Description>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <div className="orka-release-desc">
                        Release to drop the files here
                    </div>
                ) : (
                    <Fragment>
                        <div>
                            Drag your documents, photos or videos here to
                            uploading.
                        </div>
                        <div className="orka-or">or</div>
                    </Fragment>
                )}
            </Description>
            <BrowsFiles>Browse files</BrowsFiles>
        </UploadFiles>
    );
}

export default UploadFilesComponent;
