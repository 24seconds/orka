import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
    letter-spacing: -0.04em;
    color: ${(props) =>
        props.isSelected ? props.theme.Grayscale03 : props.theme.White};

    cursor: pointer;

    background: ${(props) => (props.isSelected ? props.theme.White : "none")};

    // TODO(young): Consider using outline instead of border if it is annoying
    ${(props) => props.isSelected && `border-color: transparent;`}
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
    name: PropTypes.string,
};

FilterTabComponent.defaultProps = {
    name: "ALL",
};

export default FilterTabComponent;
