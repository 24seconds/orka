import React from "react";
import { DATATYPE_FILE, DATATYPE_LINK } from "../../constants/constant";
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
                createdAt={new Date(data.uploaded_at)}
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
                createdAt={new Date(data.uploaded_at)}
                onClick={onClick}
            />
        );
    }
}

function filterSharingData(data, option) {
    return data.filter((d) => {
        if (option === "Files") {
            return d.dataType === DATATYPE_FILE;
        }
        if (option === "URLs") {
            return d.dataType === DATATYPE_LINK;
        }
        return true;
    });
}

export { renderActivityRowComponent, filterSharingData };
