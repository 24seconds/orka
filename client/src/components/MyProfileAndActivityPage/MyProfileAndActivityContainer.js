import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { DATATYPE_FILE, DATATYPE_LINK } from "../../constants/constant";
import {
    selectTableSharingDataWithCommentCount,
    updateSelectedRowID,
    updateSender,
} from "../../utils/localApi";
import ActivityRowComponent from "./ActivityRow/ActivityRowComponent";
import FilterTabComponent from "./FilterTabComponent";
import ProfileEditNameComponent from "./ProfileEditNameComponent";

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
                onClick={onClick}
            />
        );
    }
}

function MyProfileAndActivityPageContainerComponent() {
    const [data, setData] = useState([]);

    const tableSharingData = useSelector(
        (state) => state.tableSharingData,
        shallowEqual
    );
    const myOrkaUUID = useSelector((state) => state.myOrkaUUID, shallowEqual);
    const activeRow = useSelector((state) => state.selectedRow, shallowEqual);

    console.log("myOrkaUUID:", myOrkaUUID);

    useEffect(() => {
        (async () => {
            const data = await selectTableSharingDataWithCommentCount(
                myOrkaUUID
            );
            setData(data);
        })();
    }, [tableSharingData, myOrkaUUID]);

    function onClick(rowID, senderID) {
        console.log("onClick called, rowID:", rowID);
        if (rowID === activeRow) {
            updateSelectedRowID(null);
        } else {
            updateSelectedRowID(rowID);
        }
        updateSender(senderID);
    }

    const restData = data.filter((d) => !d.handsUp);

    return (
        <MyProfileAndActivityPageContainer>
            <StyledProfileEditNameComponent />
            <ActivityFilterAndSortContainer>
                <FilterContainer>
                    <FilterTabComponent name="ALL" />
                    <FilterTabComponent name="Files" />
                    <FilterTabComponent name="Link" />
                </FilterContainer>
                <SortButton>Newest</SortButton>
            </ActivityFilterAndSortContainer>
            <ActivityRowContainer>
                {restData.map((d) =>
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
