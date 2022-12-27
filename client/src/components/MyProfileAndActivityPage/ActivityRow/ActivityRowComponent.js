import React, { Fragment, useMemo } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import DataUsageStatusComponent from "./DataUsageStatusComponent";
import FileCommentExpandComponent from "./FileCommentExpandComponent";
import ActionButtonComponent from "./ActionButtonComponent";
import TextCopyComponent from "./TextCopyComponent";
import { hoverOpacity, hoverRow } from "../../SharedStyle";
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

const selectedStyle = css`
    background: ${(props) => props.theme.Grayscale04};
`;

const ActivityRow = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 128px;
    /* margin: 0 32px; */
    /* background: red; */
    cursor: pointer;

    ${(props) => props.isSelected && selectedStyle}

    .orka-data-type-holder {
        margin-left: 32px;
    }

    .orka-metadata-container {
        flex-grow: 1;
        height: 93px;
        margin-left: 14px;
    }

    .orka-file-metadata-container {
        margin-bottom: 10px;
    }

    .orka-action-container {
        display: flex;
        flex-direction: row;
        column-gap: 18px;
        margin-left: 16px;
        margin-right: 34px;
    }

    ${(props) => !props.isSelected && hoverRow}
`;

// TODO(young): Refactor this to make it reusable. It is also used in peer component.
const DataTypeHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 84px;
    min-width: 84px;
    height: 100px;
    background: ${(props) => props.theme.DataTypeHolderBackground};
    border-radius: 11px;
    word-break: break-all;
    filter: drop-shadow(0px 2.6px 2.6px rgba(0, 0, 0, 0.25));

    font-weight: 600;
    font-size: 20px;
    color: ${(props) => props.theme.DataTypeHolderText};
    line-height: 23px;

    left: ${(props) => props.order};
    top: ${(props) => props.order};
    z-index: ${(props) => props.zIndex};
`;

const FileMetaData = styled.div`
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.04em;

    .orka-file-name {
        width: 220px;
        margin-bottom: 10px;
        color: ${(props) => props.theme.ActiveRowDisplayText};

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .orka-size-and-timestamp {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: -0.04em;
        color: ${(props) => props.theme.Grayscale01};
    }
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

    ${hoverOpacity}
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
    isEditMode,
    dataType,
    commentCount,
    url,
    isMyProfileRow,
    isHandsUpRow,
    onClick,
    onClickHandsUp,
    onClickDonwloadButton,
    onCancelHandsUp
) {
    if (isEditMode) {
        return (
            <Fragment>
                <DeleteButton onClick={onClick}>
                    <CloseIcon />
                </DeleteButton>
            </Fragment>
        );
    }

    const renderIcon = () => {
        if (isMyProfileRow && isHandsUpRow) {
            return <HandsUpActivateButtonComponent onClick={onCancelHandsUp} />;
        }

        return isMyProfileRow ? (
            <HandsUpButtonComponent onClick={onClickHandsUp} />
        ) : (
            <ActionButtonComponent
                type={dataType === "URL" ? "TEXT" : "FILE"}
                onClick={onClickDonwloadButton}
            />
        );
    };

    return (
        <Fragment>
            {dataType === "URL" ? (
                <TextCopyComponent text={url} />
            ) : (
                <FileCommentExpandComponent count={commentCount} />
            )}
            {renderIcon()}
        </Fragment>
    );
}

// TODO(young): refactor this later. dataType is used in several ways.
function ActivityRowComponent(props) {
    const {
        dataType,
        displayName,
        isSelected,
        onClick,
        // rowID is data ID
        rowID,
        senderID,
        usageCount,
        size,
        commentCount,
        isMyProfileRow,
        isEditMode,
        createdAt,
        onDeleteRow,
        isHandsUpRow,
        dataURL,
    } = props;

    const sizeHumanReadable = useMemo(
        () => convertByteToHumanReadable(size),
        [size]
    );

    const timestampHumanReadable = useMemo(
        () => convertTimestampReadable(createdAt, new Date()),
        [createdAt]
    );

    const myOrkaUUID = useSelector((state) => state.myUUID, shallowEqual);

    function onClickDeleteButton(event) {
        onDeleteRow?.(rowID);
        event?.stopPropagation();
    }

    async function onClickDonwloadButton(event) {
        event?.stopPropagation();
        // TODO(young): fingerprint should be renamed to sharingDataID
        await requestDownloadFile(senderID, { fingerprint: rowID});
    }

    async function onClickHandsUp(event) {
        event?.stopPropagation();

        const result = await checkHandsUpTableSharingData(myOrkaUUID);
        if (result?.length === 0) {
            const sharingData = await patchTableSharingDataByID({ handsUp: true }, rowID);

            // notify to other peers
            if (!!sharingData) {
                await notifySharingData(sharingData);
            }
        }
    }

    async function onCancelHandsUp(event) {
        event?.stopPropagation();

        const sharingData = await patchTableSharingDataByID({ handsUp: false }, rowID);

        // notify to other peers
        if (!!sharingData) {
            await notifySharingData(sharingData);
        }
    }

    

    return (
        <ActivityRow
            isSelected={isSelected}
            onClick={() => {
                onClick?.(rowID, senderID);
            }}
        >
            <DataTypeHolder className="orka-data-type-holder">
                {/* TODO(young): refactor this part. 
                    if the dataType is FILE then extract extensions. FILE type's default is 'FILE'  */}
                {dataType}
            </DataTypeHolder>
            <div className="orka-metadata-container">
                <div className="orka-file-metadata-container">
                    <FileMetaData>
                        <div className="orka-file-name">{displayName}</div>
                        <div className="orka-size-and-timestamp">
                            {dataType === "TXT"
                                ? `URL description blah blah blah | ${timestampHumanReadable}`
                                : `${sizeHumanReadable} | ${timestampHumanReadable}`}
                        </div>
                    </FileMetaData>
                </div>
                <DataUsageStatusComponent
                    text={
                        dataType === "URL"
                            ? `${usageCount} views`
                            : `${usageCount} downloaded`
                    }
                    isActive={usageCount > 0}
                />
            </div>
            <div className="orka-action-container">
                {renderAction(
                    isEditMode,
                    dataType,
                    commentCount,
                    dataURL,
                    isMyProfileRow,
                    isHandsUpRow,
                    onClickDeleteButton,
                    onClickHandsUp,
                    onClickDonwloadButton,
                    onCancelHandsUp,
                )}
            </div>
        </ActivityRow>
    );
}

ActivityRowComponent.propTypes = {
    dataType: PropTypes.string.isRequired,
    displayName: PropTypes.string,
    usageCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    isMyProfileRow: PropTypes.bool,
    isHandsUpRow: PropTypes.bool,
};

ActivityRowComponent.defaultProps = {
    dataType: "PNG",
    displayName: "",
    usageCount: 0,
    commentCount: 0,
    isMyProfileRow: false,
    isHandsUpRow: false,
};

export default ActivityRowComponent;
