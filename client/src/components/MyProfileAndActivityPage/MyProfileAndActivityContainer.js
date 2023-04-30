import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import {
    ACTIVITY_ROW_FILTER_ALL,
    ACTIVITY_ROW_FILTER_FILE,
    ACTIVITY_ROW_FILTER_LINK,
    ACTIVITY_ROW_FILTER_TEXT,
    DATATYPE_FILE,
    DATATYPE_LINK,
} from "../../constants/constant";
import { filterSharingData } from "../../utils/commonUtil";
import {
    deleteTableSharingDataByIDs,
    selectTableSharingDataWithOrderBy,
    updateSelectedRowID,
    updateSender,
} from "../../utils/localApi";
import { hoverOpacity } from "../SharedStyle";
import ActivityRowComponent from "./ActivityRow/ActivityRowComponent";
import FilterTabComponent from "./FilterTabComponent";
import HandsUpSectionComponent from "./HandsUpSectionComponent";
import ProfileEditNameComponent from "./ProfileEditNameComponent";

const StyledHandsUpSection = styled(HandsUpSectionComponent)`
    margin-top: 8px;
    margin-bottom: 20px;
`;

const StyledProfileEditNameComponent = styled(ProfileEditNameComponent)`
    height: auto;
    margin: 32px 32px 24px 32px;
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
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.Grayscale01};
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 32px;

    ${hoverOpacity}
`;

const FilterContainer = styled.div`
    display: inline-flex;
    column-gap: 14px;
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
    height: 323px;
    margin-top: 34px;
    margin-bottom: 24px;

    // TODO(young: it is a common style. Move this to common style for reusability.
    overflow-y: scroll;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    ::-webkit-scrollbar {
        display: none;
    }
`;

// TODO(young): this function is duplicate. Refactor it later.
function renderActivityRowComponent(
    data,
    activeRow,
    onClick,
    myOrkaUUID,
    isEditMode,
    onDeleteRow
) {
    if (data?.dataType === DATATYPE_FILE) {
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
                isEditMode={isEditMode}
                onClick={onClick}
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
                isEditMode={isEditMode}
                onClick={onClick}
                onDeleteRow={onDeleteRow}
            />
        );
    }
}

function MyProfileAndActivityPageContainerComponent() {
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState("DESC");
    const [editMode, setEditMode] = useState(false);
    const [rowsToBeDeleted, setRowsToBeDeleted] = useState({});

    const tableSharingData = useSelector(
        (state) => state.tableSharingData,
        shallowEqual
    );
    const myOrkaUUID = useSelector((state) => state.myUUID, shallowEqual);
    const activeRow = useSelector((state) => state.selectedRow, shallowEqual);

    console.log("myOrkaUUID:", myOrkaUUID);
    console.log("tableSharingData:", tableSharingData);

    useEffect(() => {
        (async () => {
            const data = await selectTableSharingDataWithOrderBy(
                myOrkaUUID,
                sortOrder
            );
            setData(data);
        })();
    }, [tableSharingData, myOrkaUUID, sortOrder]);

    useEffect(() => {
        (async () => {
            const rowsToDelete = Object.keys(rowsToBeDeleted);

            if (!editMode && rowsToDelete.length > 0) {
                console.log("useEffect, update database:", editMode);

                await deleteTableSharingDataByIDs(rowsToDelete);
                setRowsToBeDeleted({});
            }

            console.log("useEffect, editMode:", editMode);
        })();
    }, [editMode, rowsToBeDeleted]);

    function onClickFilterTab(filter) {
        setActiveFilter(filter);
    }

    function onClickSort() {
        setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    }

    function onClickEdit() {
        setEditMode(!editMode);
    }

    function onSetEditMode(b) {
        setEditMode(b);
    }

    function onDeleteRow(rowID) {
        const newState = { ...rowsToBeDeleted };
        newState[rowID] = rowID;
        setRowsToBeDeleted(newState);
    }

    const handsUpData = data.filter((d) => d.hands_up)?.[0];
    const restData = data.filter((d) => !d.hands_up);
    const filteredData = filterSharingData(
        restData,
        activeFilter,
        rowsToBeDeleted
    );
    const sortText = sortOrder === "ASC" ? "Oldest" : "Newest";

    const tabs = useMemo(
        () => [
            { displayName: "ALL", filter: ACTIVITY_ROW_FILTER_ALL },
            { displayName: "File", filter: ACTIVITY_ROW_FILTER_FILE },
            { displayName: "URL", filter: ACTIVITY_ROW_FILTER_LINK },
            { displayName: "Talk", filter: ACTIVITY_ROW_FILTER_TEXT },
        ],
        []
    );

    return (
        <MyProfileAndActivityPageContainer>
            <StyledProfileEditNameComponent
                onClick={onClickEdit}
                editMode={editMode}
                onSetEditMode={onSetEditMode}
            />
            {
                // handsup data
                handsUpData && (
                    <StyledHandsUpSection
                        data={handsUpData}
                        activeRow={activeRow}
                    />
                )
            }
            <ActivityFilterAndSortContainer>
                <FilterContainer>
                    {
                        // duplicate logic in ActivityContainerComponent.
                        // Refactor this later.
                        tabs.map(({ displayName, filter }) => (
                            <FilterTabComponent
                                key={displayName}
                                name={displayName}
                                filter={filter}
                                isSelected={filter === activeFilter}
                                onClickFilterTab={onClickFilterTab}
                            />
                        ))
                    }
                </FilterContainer>
                <SortButton onClick={onClickSort}>{sortText}</SortButton>
            </ActivityFilterAndSortContainer>
            <ActivityRowContainer>
                {filteredData.map((d) =>
                    renderActivityRowComponent(
                        d,
                        activeRow,
                        myOrkaUUID,
                        editMode,
                        onDeleteRow
                    )
                )}
            </ActivityRowContainer>
        </MyProfileAndActivityPageContainer>
    );
}

export default MyProfileAndActivityPageContainerComponent;
