import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import {
    selectTableUsersWithLatestSharingDataTypeExcludingMyself,
    updateSelectedPeerUUID,
    updateSelectedRowID,
} from "../../utils/localApi";
import PeerComponent from "./Peer/PeerComponent";

const PeerListLayout = styled.div`
    display: inline-grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 14px;
    padding: 2px;

    flex-grow: 1;
    min-height: 0;

    overflow-y: scroll;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    ::-webkit-scrollbar {
        display: none;
    }
`;

function PeerListLayoutComponent() {
    const [peers, setPeers] = useState([]);

    const tableUsers = useSelector((state) => state.tableUsers, shallowEqual);
    const activePeerUUID = useSelector(
        (state) => state.selectedPeer,
        shallowEqual
    );
    const myOrkaUUID = useSelector((state) => state.myUUID, shallowEqual);

    const tableSharingData = useSelector(
        (state) => state.tableSharingData,
        shallowEqual
    );

    useEffect(() => {
        console.log("PeerListLayoutComponent userEffect called");
        (async () => {
            const usersWithLatestFileType =
                await selectTableUsersWithLatestSharingDataTypeExcludingMyself();
            if (usersWithLatestFileType?.length > 0) {
                setPeers(usersWithLatestFileType);
            }
        })();
    }, [tableUsers, tableSharingData, myOrkaUUID]);

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
            {peers.map((user) => {
                const dataTypes = [];
                if (user.latest_data_type !== null) {
                    dataTypes.push(user.latest_data_type);
                }

                return (
                    <PeerComponent
                        key={user.id}
                        uuid={user.id}
                        name={user.name}
                        profile={user.profile}
                        isSelected={activePeerUUID === user.id}
                        onClick={onClick}
                        dataTypes={dataTypes}
                    />
                );
            })}
        </PeerListLayout>
    );
}

export default PeerListLayoutComponent;
