import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import ProfileEditNameClearIcon from "../../assets/ProfileEditNameClearIcon";
import { IMAGE_URL } from "../../constants/constant";

const ProfileEditName = styled.div`
    display: flex;
    align-items: center;
    height: 68px;

    .orka-mini-profile {
        margin-right: 16px;
    }

    .orka-edit-button {
        display: flex;
        align-items: center;
        width: 40px;
        height: 100%;
        cursor: pointer;
        margin-left: auto;

        color: ${(props) => props.theme.PrimaryColor};
        font-weight: 300;
        font-size: 24px;
        line-height: 29px;
        letter-spacing: -0.04em;
    }
`;

const placeHolderTextStyle = css`
    font-weight: 400;
    font-size: 18px;
    line-height: 120%;
    letter-spacing: -0.04em;

    color: ${(props) => props.theme.Grayscale01};
`;

const InputStyle = styled.input`
    width: 100%;
    height: 100%;

    background: ${(props) => props.theme.Grayscale04};
    border-radius: 12px;
    border: none;
    outline: none;
    padding: 0 0 0 17px;

    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */

    letter-spacing: -0.04em;
    color: ${(props) => props.theme.PlaceholderTextscale01};

    ::placeholder {
        ${placeHolderTextStyle}
        opacity: 1;
    }

    ::-ms-input-placeholder {
        ${placeHolderTextStyle}
    }
`;

const MiniProfile = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #000000;

    img {
        width: 100%;
        height: 100%;
    }
`;

const NameEditor = styled.div`
    display: flex;
    align-items: center;
    min-width: 260px;
    height: 46px;
    border-radius: 12px;
    background: ${(props) => props.theme.Grayscale04};

    .orka-input-placeholder {
        width: 100%;
    }

    .orka-icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        margin-right: 18px;
        cursor: pointer;
    }
`;

function ProfileEditNameComponent(props) {
    const { className, name, profile } = props;

    const profilePath = `profile_${profile}.png`;

    return (
        <ProfileEditName className={className}>
            <MiniProfile className="orka-mini-profile">
                <img src={`/${IMAGE_URL}/${profilePath}`} alt="my profile" />
            </MiniProfile>
            <NameEditor>
                <InputStyle value={name}></InputStyle>
                {/* <div className="orka-input-placeholder">{name}</div> */}
                <div className="orka-icon-container">
                    <ProfileEditNameClearIcon />
                </div>
            </NameEditor>
            <div className="orka-edit-button">Edit</div>
        </ProfileEditName>
    );
}

ProfileEditNameComponent.propTypes = {
    name: PropTypes.string,
    profile: PropTypes.number,
};

ProfileEditNameComponent.defaultProps = {
    name: "Person",
    profile: 0,
};

export default ProfileEditNameComponent;
