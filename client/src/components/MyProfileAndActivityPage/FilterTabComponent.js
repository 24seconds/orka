import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { hoverFilterTab } from "../SharedStyle";

const FilterTab = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    min-width: 90px;
    height: 40px;

    border: 1px solid ${(props) => props.theme.Grayscale01};
    border-radius: 27px;

    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
    letter-spacing: -0.02em;
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
`;

function FilterTabComponent(props) {
    const { name, isSelected, onClickFilterTab } = props;

    function onClick() {
        onClickFilterTab?.(name);
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
