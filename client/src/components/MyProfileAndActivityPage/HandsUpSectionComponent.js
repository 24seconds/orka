import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import HandsUpIcon from "../../assets/HandsUpIcon";
import { renderActivityRowComponent } from "./common";

const SectionDivider = styled.div`
    height: 10px;
    background: ${(props) => props.theme.Grayscale04};
`;

const HandsUpTitle = styled.div`
    display: flex;
    align-items: center;
    margin-left: 32px;
    margin-bottom: 11px;

    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.04em;
    color: ${(props) => props.theme.PlaceholderTextscale01};

    svg {
        margin-right: 12px;
    }
`;

const HandsUpSection = styled.div`
    ${SectionDivider} {
        margin-top: 12px;
    }
`;

function HandsUpSectionComponent(props) {
    const { className, data, activeRow, onClick } = props;

    const myOrkaUUID = useSelector((state) => state.myOrkaUUID, shallowEqual);

    console.log("HandsUpSectionComponent, data:", data);

    return (
        <HandsUpSection className={className}>
            <HandsUpTitle>
                <HandsUpIcon />
                <span> Hands Up!</span>
            </HandsUpTitle>
            {data &&
                onClick &&
                renderActivityRowComponent(
                    data,
                    activeRow,
                    myOrkaUUID,
                    onClick
                )}
            <SectionDivider />
        </HandsUpSection>
    );
}

export default HandsUpSectionComponent;
