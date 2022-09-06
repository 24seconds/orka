import React from "react";
import styled from "styled-components";
import PeerComponent from "./Peer/PeerComponent";

const PeerListLayout = styled.div`
    display: inline-grid;
    grid-template-columns: auto auto auto;
    gap: 14px;
`;

function PeerListLayoutComponent() {
    return (
        <PeerListLayout>
            <PeerComponent />
            <PeerComponent />
            <PeerComponent />
            <PeerComponent />
        </PeerListLayout>
    );
}

export default PeerListLayoutComponent;
