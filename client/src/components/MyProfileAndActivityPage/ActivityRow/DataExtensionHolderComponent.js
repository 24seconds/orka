import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
    DATA_EXTENSION_AUDIO,
    DATA_EXTENSION_GENERAL,
    DATA_EXTENSION_IMAGE,
    DATA_EXTENSION_LINK,
    DATA_EXTENSION_TEXT,
    DATA_EXTENSION_VIDEO,
} from "../../../constants/constant";
import DataExtensionIconGeneral from "../../../assets/DataExtensionIconGeneral";
import DataExtensionIconLink from "../../../assets/DataExtensionIconLink";
import DataExtensionIconText from "../../../assets/DataExtensionIconText";
import DataExtensionIconVideo from "../../../assets/DataExtensionIconVideo";
import DataExtensionIconAudio from "../../../assets/DataExtensionIconAudio";
import DataExtensionIconImage from "../../../assets/DataExtensionIconImage";
import { mobileWidth } from "../../../constants/styleConstants";

const DataExtensionHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 84px;
    min-width: 84px;
    height: 100px;
    background: ${(props) => props.theme.DataTypeHolderBackground};
    border-radius: 11px;
    word-break: break-all;
    filter: drop-shadow(0px 2.6px 2.6px rgba(0, 0, 0, 0.25));

    font-weight: 600;
    font-size: 20px;
    color: ${(props) => props.theme.DataTypeHolderText};
    line-height: 23px;

    left: ${(props) => props.order};
    top: ${(props) => props.order};
    z-index: ${(props) => props.zIndex};

    @media (max-width: ${mobileWidth}) {
        width: 60px;
        height: 72px;
        min-width: unset;
    }
`;

function DataExtensionHolderComponent(props) {
    const { className, extension } = props;

    return (
        <DataExtensionHolder className={className}>
            {(() => {
                return {
                    [DATA_EXTENSION_GENERAL]: <DataExtensionIconGeneral />,
                    [DATA_EXTENSION_LINK]: <DataExtensionIconLink />,
                    [DATA_EXTENSION_TEXT]: <DataExtensionIconText />,
                    [DATA_EXTENSION_VIDEO]: <DataExtensionIconVideo />,
                    [DATA_EXTENSION_AUDIO]: <DataExtensionIconAudio />,
                    [DATA_EXTENSION_IMAGE]: <DataExtensionIconImage />,
                }[extension];
            })()}
        </DataExtensionHolder>
    );
}

DataExtensionHolderComponent.propTypes = {
    extension: PropTypes.string.isRequired,
};

DataExtensionHolderComponent.defaultProps = {
    extension: DATA_EXTENSION_GENERAL,
};

export default DataExtensionHolderComponent;
