import React, { useEffect, useState } from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import {
    selectTableUsers,
    selectTableUsersWithLatestFileType,
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
        console.log("PeerListLayoutComponent userEffect called");
        (async () => {
            const usersWithLatestFileType =
                await selectTableUsersWithLatestFileType();
            if (usersWithLatestFileType?.length > 0) {
                setPeers(usersWithLatestFileType);
            }
        })();
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

    return (
        <PeerListLayout>
            {peers.map((user) => (
                <PeerComponent
                    key={user.id}
                    uuid={user.id}
                    name={user.name}
                    profile={user.profile}
                    isSelected={activePeerUUID === user.id}
                    onClick={onClick}
                    dataTypes={[user.latest_data_type]}
                />
            ))}
        </PeerListLayout>
    );
}

export default PeerListLayoutComponent;
