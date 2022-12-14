import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { Tabs } from "../../constants/constant";
import {
    updateSelectedPeerUUID,
    updateSelectedRowID,
} from "../../utils/localApi";
import MyProfileAndActivityPageComponent from "../MyProfileAndActivityPage/MyProfileAndActivityLayoutComponent";
import NotificationLayoutComponent from "../NotificationPage/NotificationLayoutComponent";
import PeerListLayoutComponent from "./PeerListLayoutComponent";
import TabComponent from "./TabComponent";
import UploadButtonComponent from "./UploadButtonComponent";
import UploadFilesComponent from "./UploadFilesComponent";
import UploadLinkComponent from "./UploadLinkComponent";

const TabContainer = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 14px;

    margin-bottom: 20px;
`;

const StyledUploadButtonComponent = styled(UploadButtonComponent)`
    margin-bottom: 20px;
`;

const StyledUploadFilesComponent = styled(UploadFilesComponent)`
    margin-bottom: 20px;
`;

const StyledUploadLinkComponent = styled(UploadLinkComponent)`
    margin-bottom: 20px;
`;

const OrkaTitle = styled.div`
    height: 68px;
    color: ${(props) => props.theme.OrkaTitle};
    font-weight: 600;
    font-size: 56px;
    line-height: 68px;
    letter-spacing: -0.04em;

    margin-bottom: 20px;
`;

const MainLayout = styled.div``;

const MainLayoutContainer = styled.div`
    display: inline-grid;
    grid-template-areas:
        "tabs"
        "upload"
        "peers";
    grid-auto-rows: minmax(min-content, max-content);
    height: 746px;
`;

function MainLayoutComponent(props) {
    const { className } = props;

    const [selectedTab, setSelectedTab] = useState(Tabs.Home);
    const [uploadActivated, setUploadActivated] = useState(false);

    function onClick(tab) {
        setSelectedTab(tab);

        // clear peerID and rowID
        updateSelectedPeerUUID(null);
        updateSelectedRowID(null);
    }

    function onClickUplaodButton() {
        setUploadActivated(!uploadActivated);
    }

    return (
        <MainLayout className={className}>
            <OrkaTitle>orka</OrkaTitle>
            <MainLayoutContainer>
                <TabContainer>
                    {Object.values(Tabs).map((tab) => (
                        <TabComponent
                            key={tab.toString()}
                            iconType={tab}
                            onClick={onClick}
                            isSelected={selectedTab === tab}
                        />
                    ))}
                </TabContainer>
                <StyledUploadButtonComponent
                    onClick={onClickUplaodButton}
                    isActive={uploadActivated}
                />
                {uploadActivated && (
                    <Fragment>
                        <StyledUploadFilesComponent />
                        <StyledUploadLinkComponent />
                    </Fragment>
                )}
                {!uploadActivated &&
                    {
                        [Tabs.Home]: <PeerListLayoutComponent />,
                        [Tabs.Profile]: <MyProfileAndActivityPageComponent />,
                        [Tabs.Notification]: <NotificationLayoutComponent />,
                    }[selectedTab]}
            </MainLayoutContainer>
        </MainLayout>
    );
}

export default MainLayoutComponent;
