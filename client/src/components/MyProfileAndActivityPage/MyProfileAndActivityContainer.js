import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { DATATYPE_FILE, DATATYPE_LINK } from "../../constants/constant";
import {
    selectTableSharingDataWithCommentCount,
    selectTableSharingDataWithCommentCountOrderBy,
    selectTableUsersByID,
    updateSelectedRowID,
    updateSender,
} from "../../utils/localApi";
import ActivityRowComponent from "./ActivityRow/ActivityRowComponent";
import { filterSharingData } from "./common";
import FilterTabComponent from "./FilterTabComponent";
import ProfileEditNameComponent from "./ProfileEditNameComponent";

const StyledProfileEditNameComponent = styled(ProfileEditNameComponent)`
    height: auto;
    margin: 24px 32px 16px 32px;
`;

const MyProfileAndActivityPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 520px;
`;

const SortButton = styled.button`
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.04em;
    color: ${(props) => props.theme.Grayscale01};
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 32px;
`;

const FilterContainer = styled.div`
    display: inline-flex;
    column-gap: 10px;
    margin-left: 32px;
`;

// TODO(young): It is very similar to ActivityFilterAndSortContainer. Refactor this later.
const ActivityFilterAndSortContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto;

    ${SortButton} {
        margin-left: auto;
    }
`;

const ActivityRowContainer = styled.div`
    height: 300px;
    margin-top: 34px;

    // TODO(young: it is a common style. Move this to common style for reusability.
    overflow-y: scroll;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    ::-webkit-scrollbar {
        display: none;
    }
`;

// TODO(young): this function is duplicate. Refactor it later.
function renderActivityRowComponent(data, activeRow, onClick, myOrkaUUID) {
    console.log("renderActivityRowComponent:", data);
    if (data?.dataType === DATATYPE_FILE) {
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
                isMyProfileRow={data.uploader_id === myOrkaUUID}
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
                isMyProfileRow={data.uploader_id === myOrkaUUID}
                createdAt={new Date(data.uploaded_at)}
                onClick={onClick}
            />
        );
    }
}

function MyProfileAndActivityPageContainerComponent() {
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState("DESC");

    const tableSharingData = useSelector(
        (state) => state.tableSharingData,
        shallowEqual
    );
    const myOrkaUUID = useSelector((state) => state.myOrkaUUID, shallowEqual);
    const activeRow = useSelector((state) => state.selectedRow, shallowEqual);

    console.log("myOrkaUUID:", myOrkaUUID);

    useEffect(() => {
        (async () => {
            const data = await selectTableSharingDataWithCommentCountOrderBy(
                myOrkaUUID, sortOrder,
            );
            setData(data);
        })();
    }, [tableSharingData, myOrkaUUID, sortOrder]);

    function onClick(rowID, senderID) {
        console.log("onClick called, rowID:", rowID);
        if (rowID === activeRow) {
            updateSelectedRowID(null);
        } else {
            updateSelectedRowID(rowID);
        }
        updateSender(senderID);
    }

    function onClickFilterTab(tabName) {
        setActiveFilter(tabName);
    }

    function onClickSort() {
        setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    }

    const restData = data.filter((d) => !d.handsUp);
    const filteredData = filterSharingData(restData, activeFilter);
    const sortText = sortOrder === "ASC" ? "Oldest" : "Newest";

    return (
        <MyProfileAndActivityPageContainer>
            <StyledProfileEditNameComponent />
            <ActivityFilterAndSortContainer>
                <FilterContainer>
                    {
                        // duplicate logic in ActivityContainerComponent. 
                        // Refactor this later.
                        ["ALL", "Files", "URLs"].map((n) => <FilterTabComponent 
                            key={n}
                            name={n}
                            isSelected={n === activeFilter}
                            onClickFilterTab={onClickFilterTab} />)
                    }
                </FilterContainer>
                <SortButton onClick={onClickSort}>{sortText}</SortButton>
            </ActivityFilterAndSortContainer>
            <ActivityRowContainer>
                {filteredData.map((d) =>
                    renderActivityRowComponent(
                        d,
                        activeRow,
                        onClick,
                        myOrkaUUID
                    )
                )}
            </ActivityRowContainer>
        </MyProfileAndActivityPageContainer>
    );
}

export default MyProfileAndActivityPageContainerComponent;
