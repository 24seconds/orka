import React from "react";
import styled from "styled-components";
import ActivityContainerComponent from "../MyProfileAndActivityPage/ActivityContainerComponent";
import MyProfileAndActivityPageLayoutComponent from "../MyProfileAndActivityPage/MyProfileAndActivityLayoutComponent";

const PeerActivityLayout = styled.div``;

const EmptyDivForTitle = styled.div`
    height: 68px;
    margin-bottom: 20px;
`;

function PeerActivityLayoutComponent(props) {
    const { className, mySelected } = props;
    return (
        <PeerActivityLayout className={className}>
            <EmptyDivForTitle />
            {mySelected ? (
                <MyProfileAndActivityPageLayoutComponent />
            ) : (
                <ActivityContainerComponent />
            )}
        </PeerActivityLayout>
    );
}

export default PeerActivityLayoutComponent;
