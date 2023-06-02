import React, { Component } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import "./utils/localApi";
import "./utils/window";
import { mobileWidth } from "./constants/styleConstants";
import MainLayoutComponent from "./components/MainPage/MainLayoutComponent";
import PeerActivityLayout from "./components/MainPage/PeerActivityLayoutComponent";
import LightAndDarkContainerComponent from "./components/LightAndDark/LightAndDarkContainer";
import CreatorBadgeComponent from "./components/CreatorBadge/CreatorBadgeComponent";
import { onSwitchTheme } from "./utils/localApi";

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

const OrkaPeerActivityLayout = styled(PeerActivityLayout)``;

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
    constructor(props) {
        super(props);

        this.onChangeTheme = this.onChangeTheme.bind(this);
    }

    onChangeTheme() {
        onSwitchTheme();
    }

    render() {
        const { orkaTheme, selectedPeer, selectedRow, myOrkaUUID } = this.props;

        console.log("colorTheme is ", orkaTheme);
        console.log("selectedPeer:", selectedPeer);
        console.log("selectedRow:", selectedRow);

        const shouldOpenPeerActivityLayout = selectedPeer !== null;
        const mySelected = selectedPeer === myOrkaUUID;

        return (
            <ThemeProvider theme={orkaTheme}>
                <GlobalStyle />
                <OrkaApp className="App">
                    <OrkaCreatorBadgeComponent />
                    <OrkaLightAndDarkContainerComponent
                        onChangeTheme={this.onChangeTheme}
                        theme={orkaTheme}
                    />
                    <OrkaContainer>
                        <OrkaMainLayout
                            IsPeerActivityLayoutOpen={
                                shouldOpenPeerActivityLayout
                            }
                        />
                        {shouldOpenPeerActivityLayout && (
                            <OrkaPeerActivityLayout mySelected={mySelected} />
                        )}
                        {/* <Container className="localdrop-app-container">
                        <MobileSticky>                            
                        </MobileSticky>
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
    orkaTheme: state.orkaTheme,
    myOrkaUUID: state.myUUID,
});

export default connect(mapStateToProps)(App);
