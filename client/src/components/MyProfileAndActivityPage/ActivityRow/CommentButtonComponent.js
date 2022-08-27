import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import StyledButton from "./StyledButton";

const CommentButton = styled(StyledButton)`
    position: relative;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.04em;

    .orka-title {
        margin-left: 20px;
        color: ${(props) => props.theme.ActivityRowButtonTextscale01};
    }

    .orka-count {
        width: 36px;
        height: 24px;
        text-align: right;
        margin-left: auto;
        margin-right: 20px;
        color: ${(props) => props.theme.ActivityRowButtonTextscale01};
    }

    .orka-notification-indicator {
        /* TODO display none */
        display: ${(props) => (props.hasNewComment ? "revert" : "none")};
        position: absolute;
        right: -2px;
        top: -2px;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: ${(props) => props.theme.PrimaryColor};
    }
`;

// TODO(young): seems unused. remove it later (2022-08-27)
function CommentButtonComponent(props) {
    const { count, hasNewComment } = props;

    return (
        <CommentButton hasNewComment={hasNewComment}>
            <div className="orka-title">comments</div>
            <div className="orka-count">{count}</div>
            <div className="orka-notification-indicator" />
        </CommentButton>
    );
}

CommentButtonComponent.propTypes = {
    count: PropTypes.number.isRequired,
    hasNewComment: PropTypes.bool.isRequired,
};

CommentButtonComponent.defaultProps = {
    count: 0,
    hasNewComment: false,
};

export default CommentButtonComponent;
