import React from "react";
import styled from "styled-components";
import { toggleGuide } from "../../utils/localApi";

const Guide = styled.div`
    display: flex;    
    align-items: center;

    color: ${(props) => props.theme.Grayscale01};
    font-size: 20px;
    font-weight: 600;
    line-height: 100%;
`;

const GuideCircle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid ${(props) => props.theme.Grayscale01};
    box-sizing: border-box;

    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: transparent;

    cursor: pointer;
`;

function GuideInformationComponent() {
    function onClick() {
        toggleGuide();
    }

    return (
        <Guide onClick={onClick}>
            <GuideCircle>i</GuideCircle>
        </Guide>
    );
}

export default GuideInformationComponent;
