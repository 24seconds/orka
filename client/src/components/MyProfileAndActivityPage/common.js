import React from "react";
import { DATATYPE_FILE } from "../../constants/constant";
import ActivityRowComponent from "./ActivityRow/ActivityRowComponent";

function renderActivityRowComponent(data, activeRow, onClick) {
    console.log("renderActivityRowComponent, data:", data);

    if (data?.type === DATATYPE_FILE) {
        return (
            <ActivityRowComponent
                key={data.id}
                rowID={data.id}
                senderID={data.uploader_id}
                isSelected={activeRow === data.id}
                dataType={data.extension}
                displayName={data.name}
                size={data.size}
                usageCount={data.status_count}
                commentCount={data.comment_count}
                onClick={onClick}
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
                dataType={"URL"}
                displayName={data.text}
                usageCount={data.status_count}
                commentCount={data.comment_count}
                onClick={onClick}
            />
        );
    }
}

export { renderActivityRowComponent };
