import React, { useState } from "react";
import styled from "styled-components";
import NotificationRowComponent from "./NotificationRowComponent";
import { updateSelectedRowID } from "../../utils/localApi";

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

const naiveNotificationRowIds = [
    "row-id-1",
    "row-id-2",
    "row-id-3",
    "row-id-4",
    "row-id-5",
    "row-id-6",
    "row-id-7",
    "row-id-8",
];

function NotificationContainerComponent() {
    const [activeRow, setActiveRow] = useState(null);

    function onClick(rowID) {
        console.log("onClick called, rowID:", rowID);
        if (rowID === activeRow) {
            setActiveRow(null);
            updateSelectedRowID(null);
        } else {
            setActiveRow(rowID);
            updateSelectedRowID(rowID);
        }
    }

    return (
        <NotificationContainer>
            <NotificationContainerTitle>
                Notification
            </NotificationContainerTitle>
            {naiveNotificationRowIds.map((rowID) => (
                <StyledNotificationRowComponent
                    key={rowID}
                    rowID={rowID}
                    isActive={activeRow === rowID}
                    onClick={onClick}
                />
            ))}
        </NotificationContainer>
    );
}

export default NotificationContainerComponent;
