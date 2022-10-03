import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NotificationRowComponent from "./NotificationRowComponent";
import {
    selectTableNotifications,
    updateSelectedRowID,
    updateSender,
} from "../../utils/localApi";
import { shallowEqual, useSelector } from "react-redux";

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

function renderNotificationRow(notification, activeRow, onClick) {
    const { id, type, text, data_id, sender_id } = notification;

    return (
        <StyledNotificationRowComponent
            key={id}
            rowID={id}
            type={type}
            dataID={data_id}
            senderID={sender_id}
            isActive={activeRow === id}
            text={text}
            onClick={onClick}
        />
    );
}

function NotificationContainerComponent() {
    const [notifications, setNotifications] = useState([]);

    const selectedRowID = useSelector(
        (state) => state.selectedRow,
        shallowEqual
    );

    const tableNotifications = useSelector(
        (state) => state.tableNotifications,
        shallowEqual
    );

    useEffect(() => {
        (async () => {
            // TODO(young): select noficiation with user later
            const notifications = await selectTableNotifications();
            console.table(notifications);

            setNotifications(notifications);
        })();
    }, [tableNotifications]);

    function onClick(notificationID, dataID, senderID) {
        console.log("onClick called, rowID:", notificationID);
        if (notificationID === selectedRowID) {
            updateSelectedRowID(null);
        } else {
            updateSelectedRowID(notificationID);
        }
        updateSender(senderID);
    }

    return (
        <NotificationContainer>
            <NotificationContainerTitle>
                Notification
            </NotificationContainerTitle>
            {notifications.map((n) =>
                renderNotificationRow(n, selectedRowID, onClick)
            )}
        </NotificationContainer>
    );
}

export default NotificationContainerComponent;
