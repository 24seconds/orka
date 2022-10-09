import React from "react";
import { DATATYPE_FILE } from "../../constants/constant";
import ActivityRowComponent from "./ActivityRow/ActivityRowComponent";

function renderActivityRowComponent(data, activeRow, onClick) {
    console.log("data.uploaded_by:", data.uploaded_by);

    if (data?.dataType === DATATYPE_FILE) {
        return (
            <ActivityRowComponent
                key={data.id}
                rowID={data.id}
                senderID={data.uploaded_by}
                isSelected={activeRow === data.id}
                dataType={data.type}
                displayName={data.name}
                size={data.size}
                usageCount={data.download_count}
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
                senderID={data.uploaded_by}
                isSelected={activeRow === data.id}
                dataType={"TXT"}
                onClick={onClick}
                usageCount={data.view_count}
                commentCount={data.comment_count}
            />
        );
    }
}

export { renderActivityRowComponent };
