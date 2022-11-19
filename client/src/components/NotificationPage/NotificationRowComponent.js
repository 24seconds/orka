import React, { Fragment, useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { hoverRow } from "../SharedStyle";
import { IMAGE_URL, NOTIFICATION_TYPE_STATUS } from "../../constants/constant";
import { convertTimestampReadable } from "../../utils/commonUtil";

const NotificationRow = styled.div`
    display: flex;
    align-items: center;
    height: 106px;
    padding-left: 32px;
    cursor: pointer;

    .orka-peer-profile {
        margin-right: 14px;
    }

    background: ${(props) => props.isActive && props.theme.Grayscale04};

    ${(props) => !props.isActive && hoverRow}
`;

const PeerProfile = styled.div`
    border-radius: 50%;
    background: ${(props) => props.theme.Black};

    img {
        width: 60px;
        height: 60px;
    }
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 100%;

    .orka-text {
        color: ${(props) => props.theme.NotificationRowText};
        font-weight: 400;
        font-size: 20px;
        line-height: 120%;
        letter-spacing: -0.04em;
        margin-bottom: 8px;
    }

    .orka-timestamp {
        color: ${(props) => props.theme.Grayscale01};
        font-weight: 400;
        font-size: 15px;
        line-height: 18px;
        letter-spacing: -0.04em;
    }
`;

const TextHighlighter = styled.span`
    // should be same as font size
    height: 20px;
    font-weight: 600;

    ${(props) =>
        props.shouldTruncated &&
        `
        display: inline-block;
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;    `};
`;

function renderNotificationTypeStatus(userName, dataName) {
    return (
        <Fragment>
            <TextHighlighter shouldTruncated={true}>{userName}</TextHighlighter>{" "}
            downloaded
            <br />
            <TextHighlighter>{dataName}</TextHighlighter> file!
        </Fragment>
    );
}

function renderNotificationTypeComment(userName, dataName) {
    return (
        <Fragment>
            <TextHighlighter shouldTruncated={true}>{userName}</TextHighlighter>{" "}
            left a comment at
            <br />
            <TextHighlighter>{dataName}</TextHighlighter> file!
        </Fragment>
    );
}

function NotificationRowComponent(props) {
    const {
        className,
        rowID,
        type,
        dataID,
        senderID,
        isActive,
        text,
        createdAt,
        userID,
        userName,
        userProfile,
        onClick,
        dataName,
    } = props;

    const profilePath = `profile_${userProfile}.png`;

    const timestampHumanReadable = useMemo(
        () => convertTimestampReadable(createdAt, new Date()),
        [createdAt]
    );

    return (
        <NotificationRow
            className={className}
            isActive={isActive}
            onClick={() => onClick?.(rowID, dataID, senderID)}
        >
            <PeerProfile className="orka-peer-profile">
                <img src={`/${IMAGE_URL}/${profilePath}`} alt="peer profile" />
            </PeerProfile>
            <InfoContainer className="orka-info-container">
                <div className="orka-text">
                    {type === NOTIFICATION_TYPE_STATUS
                        ? renderNotificationTypeStatus(userName, dataName)
                        : renderNotificationTypeComment(userName, dataName)}
                </div>
                <div className="orka-timestamp">{timestampHumanReadable}</div>
            </InfoContainer>
        </NotificationRow>
    );
}

NotificationRowComponent.propTypes = {
    isActive: PropTypes.bool.isRequired,
    userID: PropTypes.string.isRequired,
    userName: PropTypes.string,
    userProfile: PropTypes.number.isRequired,
    // date object
    createdAt: PropTypes.instanceOf(Date).isRequired,
    dataName: PropTypes.string,
};

NotificationRowComponent.defaultProps = {
    isActive: false,
    userProfile: 0,
};

export default NotificationRowComponent;
