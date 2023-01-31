import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import {
    selectTableUsersWithLatestSharingDataTypeExcludingMyself,
    updateSelectedPeerUUID,
    updateSelectedRowID,
} from "../../utils/localApi";
import PeerComponent from "./Peer/PeerComponent";
import { v4 as uuidv4 } from "uuid";
import EmpyPeerComponent from "./Peer/EmptyPeerComponent";

const PeerListLayout = styled.div`
    width: 520px;
    display: inline-grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 14px;

    flex-grow: 1;
    min-height: 0;

    overflow-y: scroll;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    ::-webkit-scrollbar {
        display: none;
    }
`;

const maxEmptyPeerCount = 6;

function renderEmptyPeerComponent(number) {
    if (number <= 0) {
        return;
    }

    const dummyKeys = [];
    for (let i = 0; i < number; i++) {
        dummyKeys.push(`dummy-peer-${uuidv4()}`);
    }

    return dummyKeys.map((key) => {
        return <EmpyPeerComponent key={key} />;
    });
}

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
        if (myOrkaUUID === null) {
            return;
        }

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
            {peers.length < maxEmptyPeerCount &&
                renderEmptyPeerComponent(maxEmptyPeerCount - peers.length)}
        </PeerListLayout>
    );
}

export default PeerListLayoutComponent;
