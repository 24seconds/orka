import React, { useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { IMAGE_URL } from "../../constants/constant";
import { getProfilePath } from "../../utils/commonUtil";

const MiniProfile = styled.div`
    display: inline-block;
    border-radius: 50%;
    background: #000000;

    img {
        width: 36px;
        height: 36px;
    }
`;

const ProfileName = styled.span`
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.04em;
    color: ${(props) => props.theme.CommentRowText};

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const TitleContentStyle = styled.div`
    display: flex;
    align-items: center;

    ${ProfileName} {
        margin-right: 10px;
    }

    .orka-timestamp {
        margin-right: 6px;

        min-width: 60px;
        max-width: 60px;

        font-weight: 300;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: -0.04em;

        color: ${(props) => props.theme.Grayscale01};
    }

    .orka-unread-dot {
        display: inline-block;
        min-width: 8px;
        max-width: 8px;
        min-height: 8px;
        max-height: 8px;
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
    color: ${(props) => props.theme.CommentRowText};
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
    const {
        className,
        senderID,
        senderName,
        senderProfile,
        createdAt,
        text,
        isRead,
    } = props;

    const timestamp = useMemo(() => {
        return convertTimestampTohhmm(createdAt);
    }, [createdAt]);

    const profilePath = getProfilePath(senderProfile);

    return (
        <CommentRow className={className}>
            <TitleContentStyle>
                <MiniProfile>
                    <img
                        src={`/${IMAGE_URL}/${profilePath}`}
                        alt="sender profile"
                    />
                </MiniProfile>
                <ProfileName>{senderName}</ProfileName>
                <span className="orka-timestamp">{timestamp}</span>
                {!isRead && <div className="orka-unread-dot"></div>}
            </TitleContentStyle>
            <TextContentStyle>{text}</TextContentStyle>
        </CommentRow>
    );
}

CommentRowComponent.propTypes = {
    senderName: PropTypes.string.isRequired,
    senderID: PropTypes.string.isRequired,
    // date object
    createdAt: PropTypes.instanceOf(Date).isRequired,
    text: PropTypes.string,
    isRead: PropTypes.bool,
};

CommentRowComponent.defaultProps = {
    senderName: "",
    isRead: true,
};

export default CommentRowComponent;
