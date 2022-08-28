import React from "react";
import styled from "styled-components";

const NotificationRow = styled.div`
    display: flex;
    align-items: center;
    height: 75px;
    margin-left: 32px;
    margin-bottom: 32px;

    .orka-peer-profile {
        margin-right: 14px;
    }
`;

const PeerProfile = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${(props) => props.theme.Black};
`;

const InfoContainer = styled.div`
    height: 100%;
    .orka-text {
        color: ${(props) => props.theme.White};
        font-weight: 400;
        font-size: 20px;
        line-height: 120%;
        letter-spacing: -0.04em;
        margin-bottom: 8px;
    }

    .orka-timestamp {
        color: ${(props) => props.theme.Grayscale01};
        font-weight: 400;
        font-size: 15px;
        line-height: 18px;
        letter-spacing: -0.04em;
    }
`;

const TextHighlighter = styled.span`
    font-weight: 600;
`;

function NotificationRowComponent() {
    return (
        <NotificationRow>
            <PeerProfile className="orka-peer-profile"></PeerProfile>
            <InfoContainer className="orka-info-container">
                <div className="orka-text">
                    <TextHighlighter>Person A</TextHighlighter> was downloaded
                    <br />
                    <TextHighlighter>filename.png</TextHighlighter> file!
                </div>
                <div className="orka-timestamp">20H ago</div>
            </InfoContainer>
        </NotificationRow>
    );
}

export default NotificationRowComponent;
