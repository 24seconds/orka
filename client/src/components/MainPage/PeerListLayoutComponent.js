import React, { useEffect, useState } from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { selectTableUsers, updateSelectedPeerUUID, updateTableUsers } from "../../utils/localApi";
import PeerComponent from "./Peer/PeerComponent";

const PeerListLayout = styled.div`
    display: inline-grid;
    grid-template-columns: auto auto auto;
    gap: 14px;
`;

function PeerListLayoutComponent() {
    const [activePeer, setActivePeer] = useState(null);
    const [peers, setPeers] = useState([]);

    const tableUsers = useSelector((state) => state.tableUsers, shallowEqual);
    console.log("tableUsers:", tableUsers);

    useEffect(() => {
        (async () => {
            const users = await selectTableUsers();
            console.log("users:", users, users.length);
            setPeers(users.map(u => u.id));
        })()
        console.log("useEffect called");

        selectTableUsers()

    }, [tableUsers]);

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
            {peers.map((uuid) => (
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
