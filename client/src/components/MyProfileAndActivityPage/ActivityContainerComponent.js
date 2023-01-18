import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import CloseIcon from "../../assets/CloseIcon";
import { IMAGE_URL } from "../../constants/constant";
import { filterSharingData, getProfilePath } from "../../utils/commonUtil";
import {
    updateSelectedRowID,
    updateSender,
    updateSelectedPeerUUID,
    selectTableSharingDataWithCommentCountOrderBy,
    selectTableUsersByID,
} from "../../utils/localApi";
import { hoverCloseButton, hoverOpacity } from "../SharedStyle";
import { renderActivityRowComponent } from "./common";
import FilterTabComponent from "./FilterTabComponent";
import HandsUpSectionComponent from "./HandsUpSectionComponent";

const MiniProfile = styled.div`
    display: inline-block;
    border-radius: 50%;

    img {
        width: 52px;
        height: 52px;
    }
`;

const StyledHandsUpSection = styled(HandsUpSectionComponent)`
    margin-bottom: 28px;
`;

const CloseIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    // TODO(young): revisit hover effect for close icons later.
    ${hoverCloseButton}
`;

const ActivityTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 52px;
    margin-left: 32px;

    ${CloseIconContainer} {
        margin-left: auto;
        margin-right: 34px;
    }
`;

const ProfileName = styled.span`
    max-width: 400px;

    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.04em;

    color: ${(props) => props.theme.PlaceholderTextscale01};

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ActivityProfileContainer = styled.div`
    display: flex;
    align-items: center;

    ${MiniProfile} {
        margin-right: 14px;
    }
`;

// TODO(young): create a new file for this component
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

    ${hoverOpacity}
`;

const FilterContainer = styled.div`
    display: inline-flex;
    column-gap: 10px;
    margin-left: 32px;
`;

const ActivityFilterAndSortContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto;

    ${SortButton} {
        margin-left: auto;
    }

    margin-bottom: 20px;
`;

const ActivityRowContainer = styled.div`
    flex-grow: 1;
    min-height: 0;

    // TODO(young: it is a common style. Move this to common style for reusability.
    overflow-y: scroll;
    // overflow-y: auto;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    ::-webkit-scrollbar {
        display: none;
    }
`;

const ActivityContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 0;

    background: ${(props) => props.theme.Grayscale03};
    border-radius: 30px;
    width: 606px;
    height: 746px;

    ${ActivityTitleContainer} {
        margin-top: 24px;
        margin-bottom: 22px;
    }
`;

// TODO(young): use this later.
function getFileExtension(name) {
    return name.slice((Math.max(0, name.lastIndexOf(".")) || Infinity) + 1);
}

function ActivityContainerComponent(props) {
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [activeRow, setActiveRow] = useState(null);
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState("DESC");
    const [rowsToBeDeleted, setRowsToBeDeleted] = useState({});

    const [peerUserName, setPeerUserName] = useState("");
    const [peerUserProfile, setPeerUserProfile] = useState(0);

    const tableSharingData = useSelector(
        (state) => state.tableSharingData,
        shallowEqual
    );
    const activePeerUUID = useSelector(
        (state) => state.selectedPeer,
        shallowEqual
    );

    const myOrkaUUID = useSelector((state) => state.myUUID, shallowEqual);

    useEffect(() => {
        (async () => {
            const data = await selectTableSharingDataWithCommentCountOrderBy(
                activePeerUUID,
                sortOrder
            );
            setData(data);
        })();
    }, [tableSharingData, activePeerUUID, sortOrder]);

    useEffect(() => {
        (async () => {
            const peerUser = await selectTableUsersByID(activePeerUUID);

            setPeerUserName(peerUser?.name || "");
            setPeerUserProfile(peerUser?.profile || 0);
        })();
    }, [activePeerUUID]);

    // only one hands up data is possible
    const handsUpData = data.filter((d) => d.hands_up)?.[0];
    const restData = data.filter((d) => !d.hands_up);
    const filteredData = filterSharingData(
        restData,
        activeFilter,
        rowsToBeDeleted
    );

    function onClickComment(rowID, senderID) {
        if (rowID === activeRow) {
            setActiveRow(null);
            // dispatch function?
            updateSelectedRowID(null);
        } else {
            setActiveRow(rowID);
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

    function onClose() {
        updateSelectedPeerUUID(null);
        updateSelectedRowID(null);
    }

    function onDeleteRow(rowID) {
        const newState = { ...rowsToBeDeleted };
        newState[rowID] = rowID;
        setRowsToBeDeleted(newState);
    }

    const sortText = sortOrder === "ASC" ? "Oldest" : "Newest";
    const profilePath = getProfilePath(peerUserProfile);

    return (
        <ActivityContainer>
            <ActivityTitleContainer>
                <ActivityProfileContainer>
                    <MiniProfile>
                        <img
                            src={`/${IMAGE_URL}/${profilePath}`}
                            alt="peer profile"
                        />
                    </MiniProfile>
                    <ProfileName className="orka-profile-name">
                        {peerUserName}
                    </ProfileName>
                </ActivityProfileContainer>
                <CloseIconContainer onClick={onClose}>
                    <CloseIcon />
                </CloseIconContainer>
            </ActivityTitleContainer>
            {handsUpData && (
                <StyledHandsUpSection
                    data={handsUpData}
                    activeRow={activeRow}
                    onClick={onClickComment}
                />
            )}
            <ActivityFilterAndSortContainer>
                <FilterContainer>
                    {["ALL", "Files", "URLs"].map((n) => {
                        return (
                            <FilterTabComponent
                                key={n}
                                name={n}
                                isSelected={n === activeFilter}
                                onClickFilterTab={onClickFilterTab}
                            />
                        );
                    })}
                </FilterContainer>
                <SortButton onClick={onClickSort}>{sortText}</SortButton>
            </ActivityFilterAndSortContainer>
            <ActivityRowContainer>
                {filteredData.map((d) =>
                    renderActivityRowComponent(
                        d,
                        activeRow,
                        myOrkaUUID,
                        onClickComment,
                        onDeleteRow
                    )
                )}
            </ActivityRowContainer>
        </ActivityContainer>
    );
}

export default ActivityContainerComponent;
