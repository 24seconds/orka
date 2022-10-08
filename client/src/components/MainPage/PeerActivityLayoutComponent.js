import React from "react";
import styled from "styled-components";
import ActivityContainerComponent from "../MyProfileAndActivityPage/ActivityContainerComponent";

const PeerActivityLayout = styled.div``;

const EmptyDivForTitle = styled.div`
    height: 68px;
    margin-bottom: 20px;
`;

function PeerActivityLayoutComponent(props) {
    const { className } = props;
    return (
        <PeerActivityLayout className={className}>
            <EmptyDivForTitle />
            <ActivityContainerComponent />
        </PeerActivityLayout>
    );
}

export default PeerActivityLayoutComponent;
