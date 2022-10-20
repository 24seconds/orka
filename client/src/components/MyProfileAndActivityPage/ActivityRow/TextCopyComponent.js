import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TextCopyIcon from "../../../assets/TextCopyIcon";

const TextCopy = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;
    border-radius: 50%;

    background: ${(props) => props.theme.Grayscale04};

    cursor: pointer;

    &:hover {
        opacity: 0.6;
    }
`;

// TODO(young): Notify via any channel the the copy is done successfully
function TextCopyComponent(props) {
    const { text } = props;

    function onClick(event) {
        navigator.clipboard.writeText(text);
        event?.stopPropagation();
    }

    return (
        <TextCopy onClick={onClick}>
            <TextCopyIcon />
        </TextCopy>
    );
}

TextCopyComponent.propsTypes = {
    text: PropTypes.string,
};

export default TextCopyComponent;
