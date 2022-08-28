import React from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/CloseIcon";

const CommentContainer = styled.div`
    width: 520px;
    min-height: 500px;
    background: ${(props) => props.theme.Grayscale03};
    border-radius: 30px;
`;

const CommentTitleContainer = styled.div`
    display: flex;
    align-items: center;

    .orka-title {
        flex-grow: 1;
    }

    svg {
        margin-right: 32px;
    }
`;

const CommentTitle = styled.div`
    display: flex;
    align-items: center;
    padding-left: 32px;
    height: 95px;

    color: ${(props) => props.theme.PlaceholderTextscale01};
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.04em;
`;

function CommentContainerComponent() {
    return (
        <CommentContainer>
            <CommentTitleContainer>
                <CommentTitle className="orka-title">Comments</CommentTitle>
                <CloseIcon />
            </CommentTitleContainer>
        </CommentContainer>
    );
}

export default CommentContainerComponent;
