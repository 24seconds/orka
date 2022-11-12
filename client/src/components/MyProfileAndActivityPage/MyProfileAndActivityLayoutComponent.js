import React from "react";
import styled from "styled-components";
import MyProfileAndActivityPageContainerComponent from "./MyProfileAndActivityContainer";

const MyProfileAndActivityPage = styled.div`
    background: ${(props) => props.theme.Grayscale03};
    border-radius: 30px;
    min-width: 520px;
    /* height: 506px; */
    max-height: 746px;
`;

function MyProfileAndActivityPageComponent() {
    return (
        <MyProfileAndActivityPage>
            <MyProfileAndActivityPageContainerComponent />
        </MyProfileAndActivityPage>
    );
}

export default MyProfileAndActivityPageComponent;
