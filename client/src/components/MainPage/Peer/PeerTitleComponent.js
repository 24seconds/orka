import React from "react";
import styled from "styled-components";

const PeerTitle = styled.div`
    display: flex;
    width: 100%;
    height: 38px;

    margin: 20px 20px 0 20px;

    font-weight: 500;
    color: ${(props) => props.theme.White};

    > div {
        display: flex;
        align-items: center;
        font-size: 18px;
        line-height: 110%;
        letter-spacing: -0.04em;
        margin-left: 6px;
    }
`;

const PeerMiniProfile = styled.div`
    display: inline-block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #000000;
`;

function PeerMiniProfileComponent() {
    return <PeerMiniProfile />;
}

function PeerTitleComponent() {
    return (
        <PeerTitle>
            <PeerMiniProfileComponent />
            <div>Good</div>
        </PeerTitle>
    );
}

export default PeerTitleComponent;
