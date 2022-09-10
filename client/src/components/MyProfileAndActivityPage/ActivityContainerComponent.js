import React from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/CloseIcon";
import ActivityRowComponent from "./ActivityRow/ActivityRowComponent";
import FilterTabComponent from "./FilterTabComponent";

const MiniProfile = styled.div`
    display: inline-block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #000000;
`;

const ActivityContainer = styled.div`
    background: ${(props) => props.theme.Grayscale03};
    border-radius: 30px;
    min-width: 606px;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ActivityTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 108px;
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
`;

const ActivityRowContainer = styled.div``;

function ActivityContainerComponent() {
    return (
        <ActivityContainer>
            <ActivityTitleContainer>
                <ActivityProfileContainer>
                    <MiniProfile />
                    <ProfileName className="orka-profile-name">
                        Person
                    </ProfileName>
                </ActivityProfileContainer>
                <IconContainer>
                    <CloseIcon />
                </IconContainer>
            </ActivityTitleContainer>
            <ActivityFilterAndSortContainer>
                <FilterContainer>
                    <FilterTabComponent name="ALL" />
                    <FilterTabComponent name="Files" />
                    <FilterTabComponent name="Link" />
                </FilterContainer>
                <SortButton>Newest</SortButton>
            </ActivityFilterAndSortContainer>
            <ActivityRowContainer>
                <ActivityRowComponent />
                <ActivityRowComponent />
                <ActivityRowComponent />
            </ActivityRowContainer>
        </ActivityContainer>
    );
}

export default ActivityContainerComponent;