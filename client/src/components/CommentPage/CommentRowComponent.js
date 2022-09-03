import React from "react";
import styled from "styled-components";

const MiniProfile = styled.div`
    display: inline-block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #000000;
`;

const TitleContentStyle = styled.div`
    display: flex;
    align-items: center;

    .orka-profile-name {
        margin-right: 10px;

        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: -0.04em;
        color: ${(props) => props.theme.White};
    }

    .orka-timestamp {
        margin-right: 6px;

        font-weight: 300;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: -0.04em;

        color: ${(props) => props.theme.Grayscale06};
    }

    .orka-unread-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${(props) => props.theme.ActivityRowBackgroundscale03};
    }

    ${MiniProfile} {
        margin-right: 10px;
    }
`;

const TextContentStyle = styled.p`
    width: 100%;
    margin: 0;
    word-break: break-all;

    font-weight: 300;
    font-size: 18px;
    line-height: 140%;
    letter-spacing: -0.04em;
    color: ${(props) => props.theme.White};
`;

const ComponentRow = styled.div`
    display: flex;
    flex-direction: column;

    ${TitleContentStyle} {
        margin-bottom: 10px;
    }
`;

function ComponentRowComponent() {
    return (
        <ComponentRow>
            <TitleContentStyle>
                <MiniProfile></MiniProfile>
                <span className="orka-profile-name">Person 2</span>
                <span className="orka-timestamp">8:21AM</span>
                <div className="orka-unread-dot"></div>
            </TitleContentStyle>
            <TextContentStyle>
                i want to download but i
                can’tdaklfdjaslkdjfalkdsnfaldlafksldkfjalsdkjfaljdflksa
            </TextContentStyle>
        </ComponentRow>
    );
}

export default ComponentRowComponent;
