import React, { useState } from "react";
import styled, { css } from "styled-components";
import UploadLinkIcon from "../../assets/UploadLinkIcon";

const placeHolderTextStyle = css`
    font-weight: 400;
    font-size: 18px;
    line-height: 120%;
    letter-spacing: -0.04em;

    color: ${(props) => props.theme.Grayscale01};
`;

const InputStyle = styled.input`
    width: 100%;
    margin-left: 24px;

    background: ${(props) => props.theme.Blackscale01};
    border: none;
    outline: none;
    padding: 0;

    font-weight: 300;
    font-size: 18px;
    line-height: 120%;
    letter-spacing: -0.04em;
    color: ${(props) => props.theme.White};

    ::placeholder {
        ${placeHolderTextStyle}
        opacity: 1;
    }

    ::-ms-input-placeholder {
        ${placeHolderTextStyle}
    }
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 33px;
    height: 33px;
    margin-right: 16px;
    cursor: pointer;
`;

const CommentInput = styled.div`
    display: flex;
    align-items: center;
    width: 302px;
    height: 54px;
    background: ${(props) => props.theme.Blackscale01};
    border-radius: 18px;

    .icon-container {
        circle {
            fill: ${(props) =>
                props.isActive && props.theme.ActivityRowBackgroundscale02};
        }
    }
`;

// TODO(young): There are many comment logics between UploadLinkComponent.
// Refactor this later.
function CommentInputComponent() {
    const [text, setText] = useState("");

    function onChange(event) {
        setText(event?.target?.value || "");
    }

    return (
        <CommentInput isActive={(text?.length || 0) > 0}>
            <InputStyle
                className="desc"
                placeholder="Type a comment"
                onChange={onChange}
            />
            <IconContainer className="icon-container">
                <UploadLinkIcon />
            </IconContainer>
        </CommentInput>
    );
}

export default CommentInputComponent;
