import React, { useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const MiniProfile = styled.div`
    display: inline-block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #000000;
`;

const TitleContentStyle = styled.div`
    display: flex;
    align-items: center;

    .orka-profile-name {
        margin-right: 10px;

        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: -0.04em;
        color: ${(props) => props.theme.White};
    }

    .orka-timestamp {
        margin-right: 6px;

        font-weight: 300;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: -0.04em;

        color: ${(props) => props.theme.Grayscale06};
    }

    .orka-unread-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${(props) => props.theme.ActivityRowBackgroundscale03};
    }

    ${MiniProfile} {
        margin-right: 10px;
    }
`;

const TextContentStyle = styled.p`
    width: 100%;
    margin: 0;
    word-break: break-all;

    font-weight: 300;
    font-size: 18px;
    line-height: 140%;
    letter-spacing: -0.04em;
    color: ${(props) => props.theme.White};
`;

const CommentRow = styled.div`
    display: flex;
    flex-direction: column;

    ${TitleContentStyle} {
        margin-bottom: 10px;
    }
`;

function convertTimestampTohhmm(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (hours <= 12) {
        return `AM ${hours}:${minutes}`;
    } else {
        return `PM ${hours - 12}:${minutes}`;
    }
}


function CommentRowComponent(props) {
    const { className, senderName, createdAt, text, isRead } = props;

    console.log("createdAt:", createdAt);

    const timestamp = useMemo(() => {
        return convertTimestampTohhmm(createdAt);
    }, [createdAt])

    return (
        <CommentRow className={className}>
            <TitleContentStyle>
                <MiniProfile></MiniProfile>
                <span className="orka-profile-name">{senderName}</span>
                <span className="orka-timestamp">{timestamp}</span>
                <div className="orka-unread-dot"></div>
            </TitleContentStyle>
            <TextContentStyle>
                { text }
            </TextContentStyle>
        </CommentRow>
    );
}

CommentRowComponent.propTypes = {
    senderName: PropTypes.string.isRequired,
    // date object
    createdAt: PropTypes.instanceOf(Date).isRequired,
    text: PropTypes.string,
};

CommentRowComponent.defaultProps = {
    senderName: "",
};

export default CommentRowComponent;
