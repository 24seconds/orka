import React from "react";
import styled from "styled-components";
import NotificationContainerComponent from "./NotificationContainerComponent";

const NotificationLayout = styled.div``;

function NotificationLayoutComponent() {
    return (
        <NotificationLayout>
            <NotificationContainerComponent />
        </NotificationLayout>
    );
}

export default NotificationLayoutComponent;
