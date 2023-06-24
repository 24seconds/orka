import React, { Fragment, useMemo } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import ActionButtonComponent from "./ActionButtonComponent";
import TextCopyComponent from "./TextCopyComponent";
import { hoverRow } from "../../SharedStyle";
import CloseIcon from "../../../assets/CloseIcon";
import HandsUpButtonComponent from "./HandsUpButtonComponent";
import {
    checkHandsUpTableSharingData,
    notifySharingData,
    patchTableSharingDataByID,
    requestDownloadFile,
} from "../../../utils/localApi";
import { shallowEqual, useSelector } from "react-redux";
import HandsUpActivateButtonComponent from "./HandsUpActivateButtomComponent";
import { convertTimestampReadable } from "../../../utils/commonUtil";
import {
    DATATYPE_FILE,
    DATATYPE_LINK,
    DATATYPE_TEXT,
    DATA_EXTENSION_GENERAL,
} from "../../../constants/constant";
import DataExtensionHolderComponent from "./DataExtensionHolderComponent";

const selectedStyle = css`
    background: ${(props) => props.theme.Grayscale04};
`;

const StyledDataExtensionHolder = styled(DataExtensionHolderComponent)`
    margin-left: 32px;
`;

const ActivityRow = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 128px;
    /* margin: 0 32px; */
    /* background: red; */

    ${(props) => props.isSelected && selectedStyle}

    ${StyledDataExtensionHolder} {
        margin-left: 32px;
    }

    .orka-metadata-container {
        display: flex;
        align-items: center;

        flex-grow: 1;
        height: 93px;
        margin-left: 14px;
    }

    .orka-action-container {
        display: flex;
        flex-direction: row;
        column-gap: 18px;
        margin-left: 16px;
        margin-right: 34px;
    }

    ${(props) => !props.isSelected && hoverRow}

    &:hover {
        ${StyledDataExtensionHolder} {
            background: ${(props) => props.theme.Grayscale01};
            svg > path {
                fill: ${(props) => props.theme.White};
            }
        }

        background: ${(props) => props.theme.Grayscale02};
    }
`;

const FileMetaData = styled.div`
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.04em;

    .orka-data-name {
        width: 220px;
        margin-bottom: 2px;
        color: ${(props) => props.theme.ActiveRowDisplayText};

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .orka-size-and-timestamp {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: -0.02em;
        color: ${(props) => props.theme.Grayscale01};
    }
`;

const TextPreview = styled.div`
    width: 286px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    font-weight: 400;
    font-size: 14px;
    line-height: 22px;

    letter-spacing: -0.04em;
    color: ${(props) => props.theme.ActiveRowDisplayText};

    margin-bottom: 2px;
`;

const DeleteButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${(props) => props.theme.Grayscale04};
    cursor: pointer;

    &:hover {
        background: ${(props) => props.theme.DeleteButtonHover};

        > svg {
            > path {
                stroke: ${(props) => props.theme.Grayscale03};
            }
        }
    }
`;

function convertByteToHumanReadable(size) {
    if (!size) {
        return `Unknown`;
    }

    let s = size;
    for (const dimension of ["B", "KB", "MB", "GB"]) {
        if (s < 1024) {
            return `${s.toFixed(1)} ${dimension}`;
        }
        s = s / 1024;
    }

    return `Too large`;
}

function renderAction(
    isSelected,
    isEditMode,
    dataType,
    url,
    isMyProfileRow,
    isHandsUpRow,
    onClickDeleteButton,
    onClickHandsUp,
    onClickDonwloadButton,
    onClickURLNavigate,
    onCancelHandsUp
) {
    if (isEditMode) {
        return (
            <Fragment>
                <DeleteButton onClick={onClickDeleteButton}>
                    <CloseIcon />
                </DeleteButton>
            </Fragment>
        );
    }

    const renderIcon = () => {
        if (isMyProfileRow && isHandsUpRow) {
            return <HandsUpActivateButtonComponent onClick={onCancelHandsUp} />;
        }

        if (isMyProfileRow) {
            return <HandsUpButtonComponent onClick={onClickHandsUp} />;
        }

        if (dataType === DATATYPE_LINK || dataType === DATATYPE_TEXT) {
            return <TextCopyComponent text={url} />;
        }

        return (
            <ActionButtonComponent
                type={dataType}
                onClick={
                    dataType === DATATYPE_LINK
                        ? onClickURLNavigate
                        : onClickDonwloadButton
                }
            />
        );
    };

    return <Fragment>{renderIcon()}</Fragment>;
}

// TODO(young): refactor this later. dataType is used in several ways.
function ActivityRowComponent(props) {
    const {
        dataType,
        dataExtension,
        displayName,
        isSelected,
        // rowID is data ID
        rowID,
        senderID,
        size,
        isMyProfileRow,
        isEditMode,
        createdAt,
        onDeleteRow,
        isHandsUpRow,
        dataText,
    } = props;

    const sizeHumanReadable = useMemo(
        () => convertByteToHumanReadable(size),
        [size]
    );

    const timestampHumanReadable = useMemo(
        () => convertTimestampReadable(createdAt, new Date()),
        [createdAt]
    );

    const metadataDesc = useMemo(() => {
        if (dataType === DATATYPE_FILE) {
            return `${sizeHumanReadable} | ${timestampHumanReadable}`;
        } else {
            return `${timestampHumanReadable}`;
        }
    }, [sizeHumanReadable, timestampHumanReadable, dataType]);

    const myOrkaUUID = useSelector((state) => state.myUUID, shallowEqual);

    function onClickDeleteButton(event) {
        onDeleteRow?.(rowID);
        event?.stopPropagation();
    }

    async function onClickDonwloadButton(event) {
        event?.stopPropagation();
        // TODO(young): fingerprint should be renamed to sharingDataID
        await requestDownloadFile(senderID, { fingerprint: rowID });
    }

    function onClickURLNavigate() {
        window.open(dataText, "_blank");
    }

    async function onClickHandsUp(event) {
        event?.stopPropagation();

        const result = await checkHandsUpTableSharingData(myOrkaUUID);
        if (result?.length === 0) {
            const sharingData = await patchTableSharingDataByID(
                { handsUp: true },
                rowID
            );

            // notify to other peers
            if (!!sharingData) {
                await notifySharingData(sharingData);
            }
        }
    }

    async function onCancelHandsUp(event) {
        event?.stopPropagation();

        const sharingData = await patchTableSharingDataByID(
            { handsUp: false },
            rowID
        );

        // notify to other peers
        if (!!sharingData) {
            await notifySharingData(sharingData);
        }
    }

    const dataName = useMemo(() => {
        if (dataType !== DATATYPE_TEXT) {
            return displayName;
        }

        const lines = displayName?.split(/\r?\n|\r|\n/g);
        return lines?.[0];
    }, [dataType, displayName]);

    const textPreview = useMemo(() => {
        if (dataType !== DATATYPE_TEXT) {
            return null;
        }

        const lines = dataText?.split(/\r?\n|\r|\n/g);

        if (lines.length >= 2) {
            return lines[1];
        }

        return "No additional text";
    }, [dataText, dataType]);

    return (
        <ActivityRow isSelected={isSelected}>
            {/* TODO(young): refactor this. It should show icon, not text */}
            <StyledDataExtensionHolder extension={dataExtension} />
            <div className="orka-metadata-container">
                <div className="orka-file-metadata-container">
                    <FileMetaData>
                        <div className="orka-data-name">{dataName}</div>
                        {dataType === DATATYPE_TEXT && (
                            <TextPreview>{textPreview}</TextPreview>
                        )}
                        <div className="orka-size-and-timestamp">
                            {metadataDesc}
                        </div>
                    </FileMetaData>
                </div>
            </div>
            <div className="orka-action-container">
                {renderAction(
                    isSelected,
                    isEditMode,
                    dataType,
                    dataText,
                    isMyProfileRow,
                    isHandsUpRow,
                    onClickDeleteButton,
                    onClickHandsUp,
                    onClickDonwloadButton,
                    onClickURLNavigate,
                    onCancelHandsUp
                )}
            </div>
        </ActivityRow>
    );
}

ActivityRowComponent.propTypes = {
    dataType: PropTypes.string.isRequired,
    dataExtension: PropTypes.string.isRequired,
    displayName: PropTypes.string,
    isMyProfileRow: PropTypes.bool,
    isHandsUpRow: PropTypes.bool,
};

ActivityRowComponent.defaultProps = {
    dataType: "PNG",
    dataExtension: DATA_EXTENSION_GENERAL,
    displayName: "",
    isMyProfileRow: false,
    isHandsUpRow: false,
};

export default ActivityRowComponent;
