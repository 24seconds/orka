import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import DataUsageStatusComponent from "./DataUsageStatusComponent";
import FileCommentExpandComponent from "./FileCommentExpandComponent";
import ActionButtonComponent from "./ActionButtonComponent";
import TextCopyComponent from "./TextCopyComponent";

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
`;

// TODO(young): Refactor this to make it reusable. It is also used in peer component.
const DataTypeHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 84px;
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

    color: ${(props) => props.theme.White};

    .orka-file-name {
        margin-bottom: 10px;
    }

    .orka-size-and-timestamp {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: -0.04em;
        color: ${(props) => props.theme.Grayscale01};
    }
`;

function convertByteToHumanReadable(size) {
    if (!size) {
        return `Unknown`;
    }

    let s = size;
    for (const dimension of ["B", "KB", "MB", "GB"]) {
        if (s < 1024) {
            return `${Math.round(s)} ${dimension}`;
        }
        s = size / 1024;
    }

    return `Too large`;
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
    } = props;

    const sizeHumanReadable = useMemo(
        () => convertByteToHumanReadable(size),
        [size]
    );

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
                                ? "URL description blah blah blah | 20H ago"
                                : `${sizeHumanReadable} | 20H ago`}
                        </div>
                    </FileMetaData>
                </div>
                <DataUsageStatusComponent
                    text={
                        dataType === "TXT"
                            ? `${usageCount} views`
                            : `${usageCount} downloaded`
                    }
                />
            </div>
            <div className="orka-action-container">
                {dataType === "TXT" ? (
                    <TextCopyComponent text="https://github.com/24seconds/orka" />
                ) : (
                    <FileCommentExpandComponent count={commentCount} />
                )}
                <ActionButtonComponent
                    type={dataType === "TXT" ? "TEXT" : "FILE"}
                />
            </div>
        </ActivityRow>
    );
}

ActivityRowComponent.propTypes = {
    dataType: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    usageCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
};

ActivityRowComponent.defaultProps = {
    dataType: "PNG",
    displayName: "",
    usageCount: 0,
    commentCount: 0,
};

export default ActivityRowComponent;
