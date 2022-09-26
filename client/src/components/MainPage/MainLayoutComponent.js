import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { Tabs } from "../../constants/constant";
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

const MainLayout = styled.div``;

function MainLayoutComponent() {
    const [selectedTab, setSelectedTab] = useState(Tabs.Home);

    const [uploadActivated, setUploadActivated] = useState(false);

    console.log("selectedTab:", selectedTab);
    console.log("uploadActivated:", uploadActivated);

    function onClick(tab) {
        setSelectedTab(tab);
    }

    function onClickUplaodButton() {
        setUploadActivated(!uploadActivated);
    }

    return (
        <MainLayout>
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

            {
                {
                    [Tabs.Home]: <PeerListLayoutComponent />,
                    [Tabs.Profile]: <MyProfileAndActivityPageComponent />,
                    [Tabs.Notification]: <NotificationLayoutComponent />,
                }[selectedTab]
            }
        </MainLayout>
    );
}

export default MainLayoutComponent;
