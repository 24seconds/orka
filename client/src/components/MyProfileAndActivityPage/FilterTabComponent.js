import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FilterTab = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    min-width: 72px;
    height: 40px;

    border: 1px solid ${(props) => props.theme.PrimaryColor};
    border-radius: 27px;

    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
    letter-spacing: -0.04em;
    color: ${(props) =>
        props.isSelected ? props.theme.Graysacle05 : props.theme.PrimaryColor};

    cursor: pointer;

    background: ${(props) =>
        props.isSelected ? props.theme.PrimaryColor : "none"};

    .is-selected {
        color: ${(props) => props.theme.Graysacle05};
    }
`;

function FilterTabComponent(props) {
    const { name } = props;
    const [isSelected, setIsSelected] = useState(false);

    function onClick() {
        setIsSelected(!isSelected);
    }

    return (
        <FilterTab onClick={onClick} isSelected={isSelected}>
            {name}
        </FilterTab>
    );
}

FilterTabComponent.propTypes = {
    name: PropTypes.string.isRequired,
};

FilterTabComponent.propTypes = {
    name: "ALL",
};

export default FilterTabComponent;
