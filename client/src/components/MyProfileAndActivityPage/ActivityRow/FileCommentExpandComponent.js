import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FileCommentIcon from "../../../assets/FileCommentIcon";

const FileCommentExpand = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;
    border-radius: 50%;

    background: ${(props) =>
        props.isSelected ? props.theme.Grayscale03 : props.theme.Grayscale04};

    position: relative;

    cursor: pointer;

    ${(props) =>
        props.isSelected &&
        `
        > svg {
            fill: ${(props) => props.theme.Grayscale03};
        }
    `}

    &:hover {
        opacity: 0.6;
    }
`;

const CommentCounter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 28px;
    height: 28px;
    background: ${(props) => props.theme.ActivityRowBackgroundscale03};
    border-radius: 50%;

    position: absolute;
    top: -10px;
    right: -10px;

    color: ${(props) => props.theme.White};
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 100%;

    letter-spacing: -0.02em;
`;

// TODO(young): remove this. It's unused.
function FileCommentExpandComponent(props) {
    const { isSelected, count, onClickComment } = props;

    return (
        <FileCommentExpand onClick={onClickComment} isSelected={isSelected}>
            <FileCommentIcon />
            {count !== 0 && <CommentCounter>{count}</CommentCounter>}
        </FileCommentExpand>
    );
}

FileCommentExpandComponent.propsTypes = {
    count: PropTypes.number.isRequired,
};

FileCommentExpandComponent.defaultProps = {
    count: 0,
};

export default FileCommentExpandComponent;
