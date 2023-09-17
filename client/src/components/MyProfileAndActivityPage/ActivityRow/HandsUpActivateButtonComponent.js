import React from "react";
import styled from "styled-components";
import HandsUpCheckIcon from "../../../assets/HandsUpCheckIcon";
import { hoverOpacity } from "../../SharedStyle";
import { mobileWidth } from "../../../constants/styleConstants";

const HandsUpActivateButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${(props) => props.theme.Grayscale04};
    cursor: pointer;

    svg {
        path: ${(props) => props.theme.Grayscale01};
    }

    ${hoverOpacity}

    @media (max-width: ${mobileWidth}) {
        width: 40px;
        height: 40px;
    }
`;

function HandsUpActivateButtonComponent(props) {
    const { onClick } = props;

    function onCancel(event) {
        event?.stopPropagation();
        onClick?.();
    }

    return (
        <HandsUpActivateButton onClick={onCancel}>
            <HandsUpCheckIcon />
        </HandsUpActivateButton>
    );
}

export default HandsUpActivateButtonComponent;
