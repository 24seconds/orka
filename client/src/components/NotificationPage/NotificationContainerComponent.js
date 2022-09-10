import React from "react";
import styled from "styled-components";
import NotificationRowComponent from "./NotificationRowComponent";

const StyledNotificationRowComponent = styled(NotificationRowComponent)`
    :last-child {
        margin-bottom: 20px;
    }
`;

const NotificationContainer = styled.div`
    width: 520px;
    height: 506px;
    background: ${(props) => props.theme.Grayscale03};
    border-radius: 30px;

    overflow-y: scroll;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    ::-webkit-scrollbar {
        display: none;
    }
`;

const NotificationContainerTitle = styled.div`
    display: flex;
    align-items: center;
    padding-left: 32px;
    height: 90px;

    color: ${(props) => props.theme.PlaceholderTextscale01};
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.04em;
`;

function NotificationContainerComponent() {
    return (
        <NotificationContainer>
            <NotificationContainerTitle>
                Notification
            </NotificationContainerTitle>
            <StyledNotificationRowComponent />
            <StyledNotificationRowComponent />
            <StyledNotificationRowComponent />
            <StyledNotificationRowComponent />
            <StyledNotificationRowComponent />
            <StyledNotificationRowComponent />
            <StyledNotificationRowComponent />
            <StyledNotificationRowComponent />
        </NotificationContainer>
    );
}

export default NotificationContainerComponent;
