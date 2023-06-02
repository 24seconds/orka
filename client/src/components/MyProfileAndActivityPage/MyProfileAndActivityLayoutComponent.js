import React from "react";
import styled from "styled-components";
import MyProfileAndActivityPageContainerComponent from "./MyProfileAndActivityContainer";

const MyProfileAndActivityPage = styled.div`
    background: ${(props) => props.theme.Grayscale03};
    border-radius: 30px;
    min-width: 606px;
    /* height: 506px; */
    max-height: 746px;
`;

function MyProfileAndActivityPageLayoutComponent() {
    return (
        <MyProfileAndActivityPage>
            <MyProfileAndActivityPageContainerComponent />
        </MyProfileAndActivityPage>
    );
}

export default MyProfileAndActivityPageLayoutComponent;
