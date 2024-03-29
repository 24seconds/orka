import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import CloseIcon from "../../assets/CloseIcon";
import {
    ACTIVITY_ROW_FILTER_ALL,
    ACTIVITY_ROW_FILTER_FILE,
    ACTIVITY_ROW_FILTER_LINK,
    ACTIVITY_ROW_FILTER_TEXT,
    IMAGE_URL,
} from "../../constants/constant";
import { filterSharingData, getProfilePath } from "../../utils/commonUtil";
import {
    updateSelectedRowID,
    updateSelectedPeerUUID,
    selectTableSharingDataWithOrderBy,
    selectTableUsersByID,
} from "../../utils/localApi";
import { hoverCloseButton, hoverOpacity } from "../SharedStyle";
import { renderActivityRowComponent } from "./common";
import FilterTabComponent from "./FilterTabComponent";
import HandsUpSectionComponent from "./HandsUpSectionComponent";
import { mobileWidth } from "../../constants/styleConstants";
import MobileActivityContainerCloseIcon from "../../assets/MobileActivityContainerCloseIcon";

const MiniProfile = styled.div`
    display: inline-block;
    border-radius: 50%;

    img {
        width: 52px;
        height: 52px;
    }

    @media (max-width: ${mobileWidth}) {
        height: 32px;

        img {
            width: 32px;
            height: 32px;
        }
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

    @media (max-width: ${mobileWidth}) {
        display: none;
        visibility: hidden;
    }
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

    @media (max-width: ${mobileWidth}) {
        margin-left: 8px;
    }
`;

const IconContainer = styled.div`
    display: none;
    width: 0px;
    height: 0px;
    visibility: hidden;

    @media (max-width: ${mobileWidth}) {
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: unset;

        width: 40px;
        height: 40px;
    }
`;

const ProfileName = styled.span`
    max-width: 400px;

    font-weight: 500;
    font-size: 24px;
    line-height: normal;
    letter-spacing: -0.02em;

    color: ${(props) => props.theme.PlaceholderTextscale01};

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: ${mobileWidth}) {
        width: 200px;
        max-width: unset;
        font-size: 20px;
        letter-spacing: -0.8px;
        height: 100%;

        text-overflow: ellipsis;
    }
`;

const ActivityProfileContainer = styled.div`
    display: flex;
    align-items: center;

    ${MiniProfile} {
        margin-right: 14px;

        @media (max-width: ${mobileWidth}) {
            margin-right: 12px;
        }
    }
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

    @media (max-width: ${mobileWidth}) {
        margin-left: 28px;
        column-gap: 12px;
    }
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

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    ::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: ${mobileWidth}) {
        overflow-x: hidden;
        overflow-y: visible;
        height: auto;
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

    @media (max-width: ${mobileWidth}) {
        width: 100vw;
        height: auto;
        position: absolute;
        top: 0px;
        left: 0px;
        border-radius: 0px;
        min-height: 100vh;

        background: ${(props) => props.theme.Grayscale05};
    }
`;

function ActivityContainerComponent(props) {
    const [activeFilter, setActiveFilter] = useState(ACTIVITY_ROW_FILTER_ALL);
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
    const selectedRowID = useSelector(
        (state) => state.selectedRow,
        shallowEqual
    );

    const myOrkaUUID = useSelector((state) => state.myUUID, shallowEqual);

    useEffect(() => {
        (async () => {
            const data = await selectTableSharingDataWithOrderBy(
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

    function onClickFilterTab(filterName) {
        setActiveFilter(filterName);
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
        <ActivityContainer>
            <ActivityTitleContainer>
                <IconContainer onClick={onClose}>
                    <MobileActivityContainerCloseIcon />
                </IconContainer>
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
                    activeRow={selectedRowID}
                />
            )}
            <ActivityFilterAndSortContainer>
                <FilterContainer>
                    {tabs.map(({ displayName, filter }) => {
                        return (
                            <FilterTabComponent
                                key={filter}
                                name={displayName}
                                filter={filter}
                                isSelected={filter === activeFilter}
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
                        selectedRowID,
                        myOrkaUUID,
                        false,
                        onDeleteRow
                    )
                )}
            </ActivityRowContainer>
        </ActivityContainer>
    );
}

export default ActivityContainerComponent;
