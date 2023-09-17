import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import UploadPlusIcon from "../../assets/UploadPlusIcon";
import { mobileWidth } from "../../constants/styleConstants";
import { toggleGuide } from "../../utils/localApi";
import { HideScroll } from "../SharedStyle";

const GuideContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;

    background: ${(props) => props.theme.GuideDimLayout};
`;

const Guide = styled.div`
    width: 90vw;
    max-height: 80vh;
    padding: 16px 24px;
    background: ${(props) => props.theme.GuideBackground};
    position: relative;

    border-radius: 18px;

    color: ${(props) => props.theme.GuideText};

    h2 {
        font-size: 28px;
    }

    h3 {
        font-size: 24px;
        color: ${(props) => props.theme.PrimaryColor};    
    }

    h4 {
        font-size: 22px;
    }

    h5 { font-size: 20px; }

    p {
        font-size: 18px;
    }

    overflow-y: scroll;
    ${HideScroll}

    @media (max-width: ${mobileWidth}) {
        height: 100%;
        overflow-y: scroll;
        max-height: unset;
    }
`;

const CloseIconContainer = styled.div`
    position: absolute;
    top: 36px;
    right: 32px;
    transform: rotate(45deg);

    path {
        stroke: ${(props) => props.theme.GuideClose};
    }

    cursor: pointer;
`;


function GuideContainerComponent() {
    const orkaTheme = useSelector((state) => state.orkaTheme, shallowEqual);
    const isGuideOpen = useSelector((state) => state.guideOpen, shallowEqual);

    function onClose() {
        toggleGuide();
    }

    return (
        <ThemeProvider theme={orkaTheme}>
            {isGuideOpen && <GuideContainer>
                <Guide>
                    <CloseIconContainer onClick={onClose}>
                        <UploadPlusIcon/>
                    </CloseIconContainer>
                    <h2> 🐬 Orka! </h2>
                    <p>
                        Orka is peer to peer LAN(Local Area Network) data sharing service. It's a renewal version of LocalDrop.
                    </p>
                    <h3>How to use</h3>
                    <h4>Main features</h4>
                    <p>
                        There are mainly two features. One is sharing your data to other peers and the other one is accessing other peers data.
                    </p>
                    <h5>UPLOAD YOUR DATA</h5>
                    <p>
                        To share your data, Click the <strong>Upload</strong> button. You will see the <strong>file upload UI</strong> and <strong>text upload UI</strong>. <br/>
                        Upload what you want to share to! <br/>
                        In the first page, you will see the <strong>My</strong>. My is you. If you click My then you can check what you have shared.
                    </p>
                    <h5>ACCESS PEER'S DATA</h5>
                    <p>
                        In the first page, you will see the <strong>My</strong> and other peer's name. If other peers have shared any data, you can see the data icon right below the peer's name. <strong>Click the peer</strong> and download if the data is file or copy it if the data is link or text!
                    </p>
                    <h4>Other features</h4>
                    <p>
                        There are other features you might be interested in
                    </p>
                    <h5>HANDS UP FEATURE</h5>
                    <p>
                        If you click <strong>My</strong> then you will see <strong>hands icon</strong>. You can emphasize one data to other peers. Then other peers will see the hands up data in the first row.
                    </p>
                </Guide>
            </GuideContainer>}
        </ThemeProvider>
    );
}

export default GuideContainerComponent;
