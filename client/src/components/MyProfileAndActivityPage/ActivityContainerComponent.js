import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import CloseIcon from "../../assets/CloseIcon";
import { DATATYPE_FILE, DATATYPE_LINK } from "../../constants/constant";
import { filterSharingData } from "../../utils/commonUtil";
import {
    selectTableSharingDataWithCommentCount,
    updateSelectedRowID,
    updateSender,
    updateSelectedPeerUUID,
} from "../../utils/localApi";
import { renderActivityRowComponent } from "./common";
import FilterTabComponent from "./FilterTabComponent";
import HandsUpSectionComponent from "./HandsUpSectionComponent";

const MiniProfile = styled.div`
    display: inline-block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #000000;
`;

const StyledHandsUpSection = styled(HandsUpSectionComponent)`
    margin-bottom: 28px;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const ActivityTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 68px;
    margin-left: 32px;

    ${IconContainer} {
        margin-left: auto;
        margin-right: 34px;
    }
`;

const ProfileName = styled.span`
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.04em;

    color: ${(props) => props.theme.PlaceholderTextscale01};
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
    const [rowsToBeDeleted, setRowsToBeDeleted] = useState({});

    const tableSharingData = useSelector(
        (state) => state.tableSharingData,
        shallowEqual
    );
    const activePeerUUID = useSelector(
        (state) => state.selectedPeer,
        shallowEqual
    );

    console.log("activePeerUUID:", activePeerUUID);

    useEffect(() => {
        (async () => {
            const sharingData = await selectTableSharingDataWithCommentCount(
                activePeerUUID
            );
            setData(sharingData);
        })();
    }, [tableSharingData, activePeerUUID]);

    // only one hands up data is possible
    const handsUpData = data.filter((d) => d.hands_up)?.[0];
    const restData = data.filter((d) => !d.hands_up);
    const filteredData = filterSharingData(
        restData,
        activeFilter,
        rowsToBeDeleted
    );

    console.log("handsUpData:", handsUpData);

    function onClick(rowID, senderID) {
        console.log("onClick called, rowID:", rowID, senderID);
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

    function onClose() {
        updateSelectedPeerUUID(null);
        updateSelectedRowID(null);
    }

    function onDeleteRow(rowID) {
        const newState = { ...rowsToBeDeleted };
        newState[rowID] = rowID;
        setRowsToBeDeleted(newState);
    }

    return (
        <ActivityContainer>
            <ActivityTitleContainer>
                <ActivityProfileContainer>
                    <MiniProfile />
                    <ProfileName className="orka-profile-name">
                        Person
                    </ProfileName>
                </ActivityProfileContainer>
                <IconContainer onClick={onClose}>
                    <CloseIcon />
                </IconContainer>
            </ActivityTitleContainer>
            {handsUpData && (
                <StyledHandsUpSection
                    data={handsUpData}
                    activeRow={activeRow}
                    onClick={onClick}
                />
            )}
            <ActivityFilterAndSortContainer>
                <FilterContainer>
                    {["ALL", "Files", "URLs"].map((n) => {
                        console.log("FilterContainer:", n);
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
                <SortButton>Newest</SortButton>
            </ActivityFilterAndSortContainer>
            <ActivityRowContainer>
                {filteredData.map((d) =>
                    renderActivityRowComponent(
                        d,
                        activeRow,
                        onClick,
                        onDeleteRow
                    )
                )}
            </ActivityRowContainer>
        </ActivityContainer>
    );
}

export default ActivityContainerComponent;
