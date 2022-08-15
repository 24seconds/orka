import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CommentButtonComponent from "./CommentButtonComponent";
import HandsUpButtonComponent from "./HandsUpButtonComponent";

const ActivityRow = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 130px;
    margin: 0 32px;

    .orka-metadata-container {
        margin-left: 24px;
    }

    .orka-file-metadata-container {
        width: 100%;
        margin-bottom: 25px;
    }

    .orka-button-container {
        display: flex;
        flex-direction: row;
        column-gap: 11px;
        width: 100%;
    }
`;

// TODO(young): Refactor this to make it reusable. It is also used in peer component.
const DataTypeHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    height: 100%;
    background: ${(props) => props.theme.White};
    border-radius: 11px;
    word-break: break-all;

    font-weight: 600;
    font-size: 16px;
    color: ${(props) => props.theme.Gray};
    line-height: 20px;

    left: ${(props) => props.order};
    top: ${(props) => props.order};
    z-index: ${(props) => props.zIndex};
`;

const FileMetaData = styled.div`
    font-weight: 600;
    font-size: 26px;
    line-height: 31px;
    letter-spacing: -0.04em;

    color: ${(props) => props.theme.White};

    .orka-file-name {
        margin-bottom: 5px;
    }

    .orka-size-and-timestamp {
        font-weight: 400;
        font-size: 15px;
        line-height: 18px;
        letter-spacing: -0.04em;
        color: ${(props) => props.theme.Grayscale01};
    }
`;

function ActivityRowComponent(props) {
    const { dataType, hasNewComment, isActive } = props;

    return (
        <ActivityRow>
            <DataTypeHolder>{dataType}</DataTypeHolder>
            <div className="orka-metadata-container">
                <div className="orka-file-metadata-container">
                    <FileMetaData>
                        <div className="orka-file-name">filename.png</div>
                        <div className="orka-size-and-timestamp">
                            51KB | 20H ago
                        </div>
                    </FileMetaData>
                </div>
                <div className="orka-button-container">
                    <CommentButtonComponent hasNewComment={hasNewComment} />
                    <HandsUpButtonComponent isActive={isActive} />
                </div>
            </div>
        </ActivityRow>
    );
}

ActivityRowComponent.propTypes = {
    dataType: PropTypes.string.isRequired,
    hasNewComment: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
};

ActivityRowComponent.defaultProps = {
    dataType: "PNG",
    hasNewComment: true,
    isActive: false,
};

export default ActivityRowComponent;
