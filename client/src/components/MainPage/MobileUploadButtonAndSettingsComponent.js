import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import UploadPlusIcon from "../../assets/UploadPlusIcon";
import HamburgerIcon from "../../assets/HamburgerIcon";
import { mobileWidth } from "../../constants/styleConstants";
import CloseIcon from "../../assets/CloseIcon";

const UploadButton = styled.div`
    display: flex;
    align-items: center;
    width: 520px;
    height: 100px;
    background: ${(props) => props.theme.Button};
    border-radius: 30px;
    cursor: pointer;

    font-weight: 600;
    font-size: 32px;
    line-height: 32px;
    letter-spacing: -0.02em;

    &:hover {
        .orka-icon-container {
            path {
                stroke: ${(props) => props.theme.PrimaryColor};
            }
        }
    }

    .orka-upload-button-title {
        display: flex;
        width: 100%;
        align-items: center;
        font-weight: 600;
        margin-left: 48px;

        color: ${(props) => props.theme.IconColor};
    }

    .orka-icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 48px;
        cursor: pointer;
        transition: 0.2s linear;

        ${(props) => props.isActive && `transform: rotate(45deg)`};

        path {
            stroke: ${(props) => props.theme.IconColor};
        }
    }

    @media (max-width: ${mobileWidth}) {
        display: none;
    }
`;

const UploadButtonMobile = styled.div`
    display: none;

    @media (max-width: ${mobileWidth}) {
        display: block;

        .orka-icon-container {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            > div {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
            }

            path {
                stroke: ${(props) => props.theme.PrimaryColor};
            }

            .orka-hamburger-container {
                path {
                    stroke: ${(props) => props.theme.Grayscale01};
                }
            }
        }

        .orka-setting-close {
            path {
                stroke: ${(props) => props.theme.Grayscale01};
            }
        }
    }
`;

function MobileUploadButtonAndSettingsComponent(props) {
    const { className, isActive, onClickSettings, shouldOpenMobileSettings } =
        props;

    const onClickSetting = () => {
        console.log("onClickSetting called");
        onClickSettings?.();
    };

    return (
        <UploadButtonMobile className={className} isActive={isActive}>
            <div className="orka-icon-container">
                {shouldOpenMobileSettings ? (
                    <div
                        className="orka-setting-close"
                        onClick={onClickSetting}
                    >
                        <CloseIcon />
                    </div>
                ) : (
                    <Fragment>
                        <div onClick={props.onClick}>
                            <UploadPlusIcon />
                        </div>
                        <div
                            className="orka-hamburger-container"
                            onClick={onClickSetting}
                        >
                            <HamburgerIcon />
                        </div>
                    </Fragment>
                )}
            </div>
        </UploadButtonMobile>
    );
}

MobileUploadButtonAndSettingsComponent.propTypes = {
    isActive: PropTypes.bool,
};

export default MobileUploadButtonAndSettingsComponent;
