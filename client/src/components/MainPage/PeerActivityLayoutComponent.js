import React from "react";
import styled from "styled-components";
import ActivityContainerComponent from "../MyProfileAndActivityPage/ActivityContainerComponent";

const PeerActivityLayout = styled.div`
    margin-left: 28px;
`;

function PeerActivityLayoutComponent() {
    return (
        <PeerActivityLayout>
            <ActivityContainerComponent />
        </PeerActivityLayout>
    );
}

export default PeerActivityLayoutComponent;
