import React, { useState } from "react";
import styled from "styled-components";
import { updateSelectedPeerUUID } from "../../utils/localApi";
import PeerComponent from "./Peer/PeerComponent";

const PeerListLayout = styled.div`
    display: inline-grid;
    grid-template-columns: auto auto auto;
    gap: 14px;
`;

function PeerListLayoutComponent() {
    const [activePeer, setActivePeer] = useState(null);

    function onClick(uuid) {
        if (uuid === activePeer) {
            setActivePeer(null);
            // TODO(young): This might be a bad practice. Refactor this later.
            updateSelectedPeerUUID(null);
        } else {
            setActivePeer(uuid);
            // TODO(young): This might be a bad practice. Refactor this later.
            updateSelectedPeerUUID(uuid);
        }
    }

    const peerList = ["uuid-1", "uuid-2", "uuid-3", "uuid-4"];

    return (
        <PeerListLayout>
            {peerList.map((uuid) => (
                <PeerComponent
                    key={uuid}
                    uuid={uuid}
                    isSelected={activePeer === uuid}
                    onClick={onClick}
                />
            ))}
        </PeerListLayout>
    );
}

export default PeerListLayoutComponent;
