import React from "react";
import styled from "styled-components";
import MyProfileAndActivityPageContainerComponent from "./MyProfileAndActivityContainer";
import { mobileWidth } from "../../constants/styleConstants";

const MyProfileAndActivityPage = styled.div`
    background: ${(props) => props.theme.Grayscale03};
    border-radius: 30px;
    min-width: 606px;
    /* height: 506px; */
    max-height: 746px;

    @media (max-width: ${mobileWidth}) {
        width: 100vw;
        height: auto;
        position: absolute;
        top: 0px;
        left: 0px;
        border-radius: 0px;
        min-height: 100vh;

        max-height: unset;
        min-width: unset;
    }
`;

function MyProfileAndActivityPageLayoutComponent() {
    return (
        <MyProfileAndActivityPage>
            <MyProfileAndActivityPageContainerComponent />
        </MyProfileAndActivityPage>
    );
}

export default MyProfileAndActivityPageLayoutComponent;
