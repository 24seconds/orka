import React, { Component, Fragment } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import "./utils/localApi";
import "./utils/window";
import HeaderComponent from "./components/HeaderComponent";
import PeerTabComponent from "./components/Message/PeerTabComponent";
import MetaDataComponent from "./components/MetaData/MetaDataComponent";
import MessageTableComponent from "./components/Message/MessageTableComponent";
import MessageTableHeaderComponent from "./components/Message/MessageTableHeaderComponent";
import FooterComponent from "./components/FooterComponent";
import SendComponent from "./components/Send/SendComponent";
import { mobileWidth } from "./constants/styleConstants";
import { ColorThemes } from "./constants/styleTheme";
import MainLayoutComponent from "./components/MainPage/MainLayoutComponent";
import PeerActivityLayout from "./components/MainPage/PeerActivityLayoutComponent";
import CommentLayoutComponent from "./components/CommentPage/CommentLayoutComponent";
import LightAndDarkContainerComponent from "./components/LightAndDark/LightAndDarkContainer";
import CreatorBadgeComponent from "./components/CreatorBadge/CreatorBadgeComponent";

const GlobalStyle = createGlobalStyle`  
  html, body {
    background-color: ${(props) => props.theme.Grayscale05};
  }
`;

const OrkaLightAndDarkContainerComponent = styled(
    LightAndDarkContainerComponent
)`
    position: fixed;
    top: 36px;
    right: 40px;
`;

const OrkaCreatorBadgeComponent = styled(CreatorBadgeComponent)`
    position: fixed;
    top: 38px;
    left: 40px;
`;

const OrkaApp = styled.div`
    // TODO(young): Remove this height if it is not necessary
    height: calc(100% - 110px);
    display: grid;
    padding: 50px 100px;

    @media (max-width: ${mobileWidth}) {
        padding: 0;
    }

    grid-template-areas:
        "empty1 empty1 empty1"
        "sidebar1 main sidebar2"
        "empty2 empty2 empty2";

    grid-template-columns: 1fr auto 1fr;
`;

const OrkaMainLayout = styled(MainLayoutComponent)`
    grid-area: ${(props) => (props.IsPeerActivityLayoutOpen ? "home" : "peer")};
`;

const OrkaPeerActivityLayout = styled(PeerActivityLayout)`
`;

const OrkaContainer = styled.div`
    display: inline-grid;

    grid-area: main;
    grid-template-areas: "home peer comment";
    grid-template-columns: auto auto auto;
    gap: 0 20px;
    align-items: flex-start;
`;

const Container = styled.div`
    border: solid 2px ${(props) => props.theme.Contrast};
    border-radius: 5px;
    height: 100%;

    @media (max-width: ${mobileWidth}) {
        margin: 0;
        border: none;
    }
`;

const MobileSticky = styled.div`
    background-color: ${(props) => props.theme.SecondBackground};

    @media (max-width: ${mobileWidth}) {
        position: sticky;
        top: 0;
    }
`;

class App extends Component {
    STORAGE_COLOR_THEME_KEY = "STORAGE_COLOR_THEME_KEY";
    themeIndex = 0;

    constructor(props) {
        super(props);

        this.state = {
            colorTheme:
                ColorThemes[this.getStorageColorTheme() || "ThemeOrkaDark"],
        };

        this.onChangeTheme = this.onChangeTheme.bind(this);
    }

    getStorageColorTheme() {
        return window.localStorage.getItem(this.STORAGE_COLOR_THEME_KEY);
    }

    setStorageColorTheme(value) {
        window.localStorage.setItem(this.STORAGE_COLOR_THEME_KEY, value);
    }

    getNextKey(keys) {
        const nextKey = keys[this.themeIndex];
        this.themeIndex = (this.themeIndex + 1) % keys.length;

        if (nextKey === localStorage.getItem(this.STORAGE_COLOR_THEME_KEY)) {
            return this.getNextKey(keys);
        } else {
            return nextKey;
        }
    }

    onChangeTheme() {
        console.log("onChangeTheme called");

        const keys = Object.keys(ColorThemes);
        const nextKey = this.getNextKey(keys);
        this.setStorageColorTheme(nextKey);

        console.log("randomKey is ", nextKey);

        this.setState({
            colorTheme: ColorThemes[nextKey],
        });
    }

    render() {
        const { selectedPeer, selectedRow } = this.props;
        const { colorTheme } = this.state;

        console.log("colorTheme is ", colorTheme);
        console.log("selectedPeer:", selectedPeer);
        console.log("selectedRow:", selectedRow);

        const shouldOpenPeerActivityLayout = selectedPeer !== null;
        const shouldOpenCommentLayout = selectedRow != null;

        return (
            <ThemeProvider theme={colorTheme}>
                <GlobalStyle />
                <OrkaApp className="App">
                    <OrkaCreatorBadgeComponent />
                    <OrkaLightAndDarkContainerComponent
                        onChangeTheme={this.onChangeTheme}
                        theme={colorTheme}
                    />
                    <OrkaContainer>
                        <OrkaMainLayout
                            IsPeerActivityLayoutOpen={
                                shouldOpenPeerActivityLayout ||
                                shouldOpenCommentLayout
                            }
                        />
                        {shouldOpenPeerActivityLayout && (
                            <OrkaPeerActivityLayout />
                        )}
                        {shouldOpenCommentLayout && <CommentLayoutComponent />}
                        {/* <Container className="localdrop-app-container">
                        <MobileSticky>                            
                            <SendComponent />
                            <MetaDataComponent
                                onChangeTheme={this.onChangeTheme}
                            />
                            <PeerTabComponent />
                            <MessageTableHeaderComponent />
                        </MobileSticky>
                        <MessageTableComponent />
                        <FooterComponent />
                    </Container> */}
                    </OrkaContainer>
                </OrkaApp>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedPeer: state.selectedPeer,
    selectedRow: state.selectedRow,
});

export default connect(mapStateToProps)(App);
