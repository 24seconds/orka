import React from "react";
import styled from "styled-components";
import { mobileWidth } from "../../constants/styleConstants";

const MobileSetting = styled.div`
    @media (max-width: ${mobileWidth}) {
        grid-area: peer;
        flex-grow: 1;
        width: unset;
    }
`;

function MobileSettingsComponent(props) {
    return <MobileSetting>hoho</MobileSetting>;
}

export default MobileSettingsComponent;
