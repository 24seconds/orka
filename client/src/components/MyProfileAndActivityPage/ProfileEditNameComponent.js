import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ProfileEditNameClearIcon from "../../assets/ProfileEditNameClearIcon";

const ProfileEditName = styled.div`
    display: flex;
    align-items: center;
    height: 96px;

    .orka-mini-profile {
        margin-right: 12px;
    }

    .orka-edit-button {
        display: flex;
        align-items: center;
        width: 40px;
        height: 100%;
        cursor: pointer;
        margin-left: auto;
        margin-right: 30px;

        color: ${(props) => props.theme.PrimaryColor};
        font-weight: 300;
        font-size: 24px;
        line-height: 29px;
        letter-spacing: -0.04em;
    }
`;

const MiniProfile = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #000000;
`;

const NameEditor = styled.div`
    display: flex;
    align-items: center;
    padding-left: 17px;
    min-width: 260px;
    height: 46px;
    border-radius: 12px;
    background: ${(props) => props.theme.PlaceholderBackgroundscale01};

    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */

    letter-spacing: -0.04em;
    color: ${(props) => props.theme.PlaceholderTextscale01};

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
    const { name } = props;

    return (
        <ProfileEditName>
            <MiniProfile className="orka-mini-profile" />
            <NameEditor>
                <div className="orka-input-placeholder">{ name }</div>
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
};

ProfileEditNameComponent.defaultProps = {
    name: "Person",
};

export default ProfileEditNameComponent;
