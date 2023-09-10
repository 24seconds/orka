import React, { Fragment, useState } from "react";
import styled, { css } from "styled-components";
import { Tabs } from "../../constants/constant";
import {
    toggleModal,
    updateSelectedPeerUUID,
    updateSelectedRowID,
} from "../../utils/localApi";
import MyProfileAndActivityPageComponent from "../MyProfileAndActivityPage/MyProfileAndActivityLayoutComponent";
import PeerListLayoutComponent from "./PeerListLayoutComponent";
import TabComponent from "./TabComponent";
import UploadButtonComponent from "./UploadButtonComponent";
import UploadFilesComponent from "./UploadFilesComponent";
import UploadLinkComponent from "./UploadLinkComponent";
import { mobileWidth } from "../../constants/styleConstants";
import MobileUploadButtonAndSettingsComponent from "./MobileUploadButtonAndSettingsComponent";
import MobileUploadDataComponent from "./MobileUploadDataComponent";
import { useSelector } from "react-redux";
import MobileSettingsComponent from "../Settings/MobileSettingsComponent";

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
    letter-spacing: -0.02em;

    margin-bottom: 20px;

    @media (max-width: ${mobileWidth}) {
        display: flex;
        align-items: center;
        font-size: 32px;
        margin-bottom: 0px;

        .orka-title-text {
            flex-grow: 1;
        }

        ${(props) =>
            props.shouldOpenMobileSettings &&
            css`
                margin-left: 24px;
                margin-right: 24px;
                margin-bottom: 8px;
            `};
    }
`;

const MainLayout = styled.div`
    @media (max-width: ${mobileWidth}) {
        ${(props) =>
            props.shouldOpenMobileSettings &&
            css`
                position: fixed;
                top: 0px;
            `};
    }
`;

const MainLayoutContainer = styled.div`
    display: inline-grid;
    grid-template-areas:
        "tabs"
        "upload"
        "peers";
    grid-auto-rows: minmax(min-content, max-content);
    height: 746px;

    @media (max-width: ${mobileWidth}) {
        margin-top: 18px;
        height: auto;

        ${(props) =>
            props.shouldOpenMobileSettings &&
            css`
                margin-top: 0px;
            `};
    }
`;

function renderMainLayoutContent(
    shouldOpenMobileSettings,
    uploadActivated,
    selectedTab
) {
    if (shouldOpenMobileSettings) {
        return <MobileSettingsComponent />;
    }

    if (uploadActivated) {
        return (
            <Fragment>
                <StyledUploadFilesComponent />
                <StyledUploadLinkComponent />
            </Fragment>
        );
    } else {
        return {
            [Tabs.Home]: <PeerListLayoutComponent />,
        }[selectedTab];
    }
}

function MainLayoutComponent(props) {
    const { className, settingsOpen, setSettingsOpen } = props;

    const [selectedTab, setSelectedTab] = useState(Tabs.Home);
    const [uploadActivated, setUploadActivated] = useState(false);
    const uploadModalOpenState = useSelector((state) => state.uploadModalOpen);
    const isMobileWidth = useSelector((state) => state.isMobileWidth);
    const shouldOpenMobileSettings = isMobileWidth && settingsOpen;

    function onClickUplaodButton() {
        if (uploadActivated) {
            setUploadActivated(!uploadActivated);
            setSelectedTab(Tabs.Home);

            return;
        }

        setUploadActivated(!uploadActivated);

        setSelectedTab(null);
        // clear peerID and rowID
        updateSelectedPeerUUID(null);
        updateSelectedRowID(null);
    }

    function onClickMobileUploadButton() {
        toggleModal();
    }

    function onClickSettingIcon() {
        setSettingsOpen?.(!settingsOpen);
    }

    return (
        <MainLayout
            className={`${className} orka-title-main-layout`}
            shouldOpenMobileSettings={shouldOpenMobileSettings}
        >
            <OrkaTitle shouldOpenMobileSettings={shouldOpenMobileSettings}>
                <div className="orka-title-text">orka</div>
                <MobileUploadButtonAndSettingsComponent
                    onClick={onClickMobileUploadButton}
                    onClickSettings={onClickSettingIcon}
                    isActive={uploadModalOpenState}
                    shouldOpenMobileSettings={shouldOpenMobileSettings}
                />
            </OrkaTitle>
            <MainLayoutContainer
                shouldOpenMobileSettings={shouldOpenMobileSettings}
            >
                {!shouldOpenMobileSettings && (
                    <StyledUploadButtonComponent
                        onClick={onClickUplaodButton}
                        isActive={uploadActivated}
                    />
                )}
                {renderMainLayoutContent(
                    shouldOpenMobileSettings,
                    uploadActivated,
                    selectedTab
                )}
                {/* {uploadActivated && (
                    <Fragment>
                        <StyledUploadFilesComponent />
                        <StyledUploadLinkComponent />
                    </Fragment>
                )}
                {!uploadActivated &&
                    {
                        [Tabs.Home]: <PeerListLayoutComponent />,
                    }[selectedTab]} */}
            </MainLayoutContainer>
            {uploadModalOpenState && (
                <MobileUploadDataComponent
                    onClick={onClickMobileUploadButton}
                />
            )}
        </MainLayout>
    );
}

export default MainLayoutComponent;
