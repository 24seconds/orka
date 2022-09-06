import React, { useState } from "react";
import styled from "styled-components";
import { Tabs } from "../../constants/constant";
import PeerListLayoutComponent from "./PeerListLayoutComponent";
import TabComponent from "./TabComponent";
import UploadButtonComponent from "./UploadButtonComponent";
import UploadFilesComponent from "./UploadFilesComponent";

const TitleStyle = styled.div`
    color: ${(props) => props.theme.White};
    font-weight: 600;
    font-size: 56px;
    line-height: 68px;
    letter-spacing: -0.04em;

    margin-bottom: 20px;
`;

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
            <TitleStyle>orka</TitleStyle>
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
            {uploadActivated && <StyledUploadFilesComponent />}
            <PeerListLayoutComponent />
        </MainLayout>
    );
}

export default MainLayoutComponent;
