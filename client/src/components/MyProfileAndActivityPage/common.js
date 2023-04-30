import React from "react";
import { DATATYPE_FILE } from "../../constants/constant";
import ActivityRowComponent from "./ActivityRow/ActivityRowComponent";

function renderActivityRowComponent(data, activeRow, myOrkaUUID, onDeleteRow) {
    if (data?.type === DATATYPE_FILE) {
        return (
            <ActivityRowComponent
                key={data.id}
                rowID={data.id}
                senderID={data.uploader_id}
                isSelected={activeRow === data.id}
                dataType={data.type}
                dataExtension={data.extension}
                displayName={data.name}
                size={data.size}
                isMyProfileRow={data.uploader_id === myOrkaUUID}
                createdAt={new Date(data.uploaded_at)}
                isHandsUpRow={data.hands_up}
                onDeleteRow={onDeleteRow}
            />
        );
    } else {
        // LINK type
        return (
            <ActivityRowComponent
                key={data.id}
                rowID={data.id}
                senderID={data.uploader_id}
                isSelected={activeRow === data.id}
                dataType={data.type}
                dataExtension={data.extension}
                displayName={data.text}
                isMyProfileRow={data.uploader_id === myOrkaUUID}
                createdAt={new Date(data.uploaded_at)}
                isHandsUpRow={data.hands_up}
                dataURL={data.text}
                onDeleteRow={onDeleteRow}
            />
        );
    }
}

export { renderActivityRowComponent };
