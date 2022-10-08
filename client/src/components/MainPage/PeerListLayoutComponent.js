import React, { useEffect, useState } from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import {
    selectTableUsers,
    updateSelectedPeerUUID,
    updateSelectedRowID,
    updateTableUsers,
} from "../../utils/localApi";
import PeerComponent from "./Peer/PeerComponent";

const PeerListLayout = styled.div`
    display: inline-grid;
    grid-template-columns: auto auto auto;
    gap: 14px;
`;

function PeerListLayoutComponent() {
    const [peers, setPeers] = useState([]);

    const tableUsers = useSelector((state) => state.tableUsers, shallowEqual);
    const activePeerUUID = useSelector(
        (state) => state.selectedPeer,
        shallowEqual
    );

    useEffect(() => {
        (async () => {
            const users = await selectTableUsers();
            console.table(users);
            console.log("users:", users, users.length);
            setPeers(users.map((u) => u.id));
        })();
        console.log("useEffect called");

        selectTableUsers();
    }, [tableUsers]);

    function onClick(uuid) {
        if (uuid === activePeerUUID) {
            // TODO(young): This might be a bad practice. Refactor this later.
            updateSelectedPeerUUID(null);
            updateSelectedRowID(null);
        } else {
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
                    isSelected={activePeerUUID === uuid}
                    onClick={onClick}
                />
            ))}
        </PeerListLayout>
    );
}

export default PeerListLayoutComponent;
