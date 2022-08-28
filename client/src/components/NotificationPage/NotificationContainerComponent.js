import React from "react";
import styled from "styled-components";

const NotificationContainer = styled.div`
    width: 520px;
    min-height: 500px;
    background: ${(props) => props.theme.Grayscale03};
    border-radius: 30px;
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
        </NotificationContainer>
    );
}

export default NotificationContainerComponent;
