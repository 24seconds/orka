import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import HandsUpIcon from "../../assets/HandsUpIcon";
import { renderActivityRowComponent } from "./common";
import { mobileWidth } from "../../constants/styleConstants";

const SectionDivider = styled.div`
    height: 10px;
    background: ${(props) => props.theme.Grayscale04};

    @media (max-width: ${mobileWidth}) {
        background: ${(props) => props.theme.MobileHandsUpSectionDivider};
    }
`;

const HandsUpTitle = styled.div`
    display: flex;
    align-items: center;
    margin-left: 32px;
    margin-bottom: 11px;

    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.PlaceholderTextscale01};

    svg {
        margin-right: 12px;
    }

    @media (max-width: ${mobileWidth}) {
        font-size: 20px;
        line-height: normal;
        letter-spacing: -0.8px;

        margin-left: 24px;

        svg {
            margin-right: 6px;
        }
    }
`;

const HandsUpSection = styled.div`
    ${SectionDivider} {
        margin-top: 12px;
    }
`;

function HandsUpSectionComponent(props) {
    const { className, data, activeRow, onDeleteRow, isEditMode } = props;

    const myOrkaUUID = useSelector((state) => state.myUUID, shallowEqual);

    return (
        <HandsUpSection className={className}>
            <HandsUpTitle>
                <HandsUpIcon />
                <span> Hands Up!</span>
            </HandsUpTitle>
            {data &&
                renderActivityRowComponent(
                    data,
                    activeRow,
                    myOrkaUUID,
                    isEditMode,
                    onDeleteRow
                )}
            <SectionDivider />
        </HandsUpSection>
    );
}

export default HandsUpSectionComponent;
