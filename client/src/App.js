import React, { useState } from "react";
import styled, {
    css,
    createGlobalStyle,
    ThemeProvider,
} from "styled-components";
import { connect } from "react-redux";
import "./utils/localApi";
import "./utils/window";
import { mobileWidth, mobileWidthNumber } from "./constants/styleConstants";
import MainLayoutComponent from "./components/MainPage/MainLayoutComponent";
import PeerActivityLayout from "./components/MainPage/PeerActivityLayoutComponent";
import LightAndDarkContainerComponent from "./components/LightAndDark/LightAndDarkContainer";
import CreatorBadgeComponent from "./components/CreatorBadge/CreatorBadgeComponent";
import {
    getIsMobileWidthState,
    onSwitchTheme,
    updateIsMobileWidthState,
} from "./utils/localApi";
import GuideInformationComponent from "./components/Guide/GuideInformationComponent";

const GlobalStyle = createGlobalStyle`  
  html, body {
    background-color: ${(props) => props.theme.Grayscale05};
  }

  body {
    overflow: auto;

    // modal open
    ${(props) =>
        (props.uploadModalOpen || props.guideOpen) &&
        css`
            overflow: hidden;
        `};
  }
`;

const OrkaLightAndDarkContainerComponent = styled(
    LightAndDarkContainerComponent
)`

`;

const OrkaCreatorBadgeComponent = styled(CreatorBadgeComponent)`
    position: fixed;
    top: 38px;
    left: 40px;
`;

const OrkaApp = styled.div`
    height: calc(100% - 110px);
    display: grid;
    padding: 50px 100px;

    grid-template-areas:
        "empty1 empty1 empty1"
        "sidebar1 main sidebar2"
        "empty2 empty2 empty2";

    grid-template-columns: 1fr auto 1fr;

    @media (max-width: ${mobileWidth}) {
        padding: 0;
        grid-template-areas:
            "empty1 empty1 empty1"
            "empty3 main empty3"
            "empty2 empty2 empty2";

        grid-template-columns: 0px auto 0px;
    }
`;

const OrkaMainLayout = styled(MainLayoutComponent)`
    grid-area: ${(props) => (props.IsPeerActivityLayoutOpen ? "home" : "peer")};
`;

const OrkaPeerActivityLayout = styled(PeerActivityLayout)`
    @media (max-width: ${mobileWidth}) {
        z-index: 150;
    }
`;

const OrkaContainer = styled.div`
    display: inline-grid;

    grid-area: main;
    grid-template-areas: "home peer comment";
    grid-template-columns: auto auto auto;
    gap: 0 20px;
    align-items: flex-start;

    @media (max-width: ${mobileWidth}) {
        gap: 0;
        grid-template-columns: 24px auto 24px;

        ${(props) => props.shouldOpenMobileSettings} && {
            // grid-template-areas: "home";
            // grid-template-columns: auto;
            // grid-area: auto;
        }
    }
`;

const OrkaHeaderRightContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0 12px;

    position: fixed;
    top: 36px;
    right: 40px;

    @media (max-width: ${mobileWidth}) {
        display: none;
    }
`;

function App(props) {
    const {
        orkaTheme,
        selectedPeer,
        selectedRow,
        myOrkaUUID,
        uploadModalOpen,
        guideOpen,
        isMobileWidth,
    } = props;

    const [settingsOpen, setSettingsOpen] = useState(false);

    function onChangeTheme() {
        onSwitchTheme();
    }

    console.log("colorTheme is ", orkaTheme);
    console.log("selectedPeer:", selectedPeer);
    console.log("selectedRow:", selectedRow);

    const isPeerActivityLayoutOpen = selectedPeer !== null;
    const mySelected = selectedPeer === myOrkaUUID;

    const shouldHideForActivityLayout =
        (isPeerActivityLayoutOpen || mySelected) && isMobileWidth;

    const shouldOpenMobileSettings = isMobileWidth && settingsOpen;

    return (
        <ThemeProvider theme={orkaTheme}>
            <GlobalStyle
                uploadModalOpen={uploadModalOpen}
                guideOpen={guideOpen}
                isPeerActivityLayoutOpen={isPeerActivityLayoutOpen}
            />
            <OrkaApp className="App">
                {!shouldHideForActivityLayout && <OrkaCreatorBadgeComponent />}
                {!shouldHideForActivityLayout && (
                    <OrkaHeaderRightContainer>
                        <GuideInformationComponent />
                        <OrkaLightAndDarkContainerComponent
                            onChangeTheme={onChangeTheme}
                            theme={orkaTheme}
                        />
                    </OrkaHeaderRightContainer>
                )}
                <OrkaContainer
                    shouldOpenMobileSettings={shouldOpenMobileSettings}
                >
                    {!shouldHideForActivityLayout && (
                        <OrkaMainLayout
                            IsPeerActivityLayoutOpen={isPeerActivityLayoutOpen}
                            shouldOpenMobileSettings={shouldOpenMobileSettings}
                            settingsOpen={settingsOpen}
                            setSettingsOpen={setSettingsOpen}
                        />
                    )}
                    {!shouldOpenMobileSettings && isPeerActivityLayoutOpen && (
                        <OrkaPeerActivityLayout mySelected={mySelected} />
                    )}
                    {}
                    {/* <Container className="localdrop-app-container">
                        <MobileSticky>                            
                        </MobileSticky>
                    </Container> */}
                </OrkaContainer>
            </OrkaApp>
        </ThemeProvider>
    );
}

const mapStateToProps = (state) => ({
    selectedPeer: state.selectedPeer,
    selectedRow: state.selectedRow,
    orkaTheme: state.orkaTheme,
    myOrkaUUID: state.myUUID,
    uploadModalOpen: state.uploadModalOpen,
    isMobileWidth: state.isMobileWidth,
    guideOpen: state.guideOpen,
});

function handleWindowSize() {
    const currentIsMobileWidth = getIsMobileWidthState();

    if (currentIsMobileWidth && window.innerWidth > mobileWidthNumber) {
        updateIsMobileWidthState(false);
    } else if (
        !currentIsMobileWidth &&
        window.innerWidth <= mobileWidthNumber
    ) {
        updateIsMobileWidthState(true);
    }
}

window.addEventListener("load", (event) => {
    handleWindowSize();
});

window.addEventListener(
    "resize",
    function (event) {
        handleWindowSize();
    },
    true
);

export default connect(mapStateToProps)(App);
