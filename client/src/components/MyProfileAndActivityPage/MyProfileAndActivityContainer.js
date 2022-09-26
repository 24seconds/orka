import React from "react";
import styled from "styled-components";
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

function MyProfileAndActivityPageContainerComponent() {
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
                <ActivityRowComponent />
                <ActivityRowComponent />
                <ActivityRowComponent />
                <ActivityRowComponent />
            </ActivityRowContainer>
        </MyProfileAndActivityPageContainer>
    );
}

export default MyProfileAndActivityPageContainerComponent;
