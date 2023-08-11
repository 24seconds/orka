import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { hoverFilterTab } from "../SharedStyle";
import { mobileWidth } from "../../constants/styleConstants";

const FilterTab = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    padding: 0 20px;
    height: 38px;

    border: 2px solid ${(props) => props.theme.Grayscale01};
    border-radius: 27px;

    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.04em;
    color: ${(props) =>
        props.isSelected
            ? props.theme.FilterTextActive
            : props.theme.FilterTextInActive};

    cursor: pointer;

    background: ${(props) =>
        props.isSelected ? props.theme.FilterActive : "none"};

    // TODO(young): Consider using outline instead of border if it is annoying
    ${(props) => props.isSelected && `border-color: transparent;`}

    ${(props) => !props.isSelected && hoverFilterTab}

    @media (max-width: ${mobileWidth}) {
        font-size: 16px;
        font-weight: 600;
        padding: 0 12px;
    }
`;

function FilterTabComponent(props) {
    const { name, filter, isSelected, onClickFilterTab } = props;

    function onClick() {
        onClickFilterTab?.(filter);
    }

    return (
        <FilterTab onClick={onClick} isSelected={isSelected}>
            {name}
        </FilterTab>
    );
}

FilterTabComponent.propTypes = {
    name: PropTypes.string,
    isSelected: PropTypes.bool,
};

FilterTabComponent.defaultProps = {
    name: "ALL",
    isSelected: false,
};

export default FilterTabComponent;
