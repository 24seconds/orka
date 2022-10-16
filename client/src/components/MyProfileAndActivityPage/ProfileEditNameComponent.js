import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import ProfileEditNameClearIcon from "../../assets/ProfileEditNameClearIcon";
import { IMAGE_URL } from "../../constants/constant";
import { shallowEqual, useSelector } from "react-redux";
import {
    patchTableUsersByID,
    selectTableUsersByID,
} from "../../utils/localApi";

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
        max-width: 47px;
        height: 100%;
        cursor: pointer;
        margin-left: ${(props) => (props.shouldShowDone ? "17px" : "30px")};

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
    const { className } = props;
    const [myUserProfile, setMyUserProfile] = useState(0);
    const [myUserName, setMyUserName] = useState("");
    const [memoUserName, setMemoUserName] = useState("");

    const myOrkaUUID = useSelector((state) => state.myOrkaUUID, shallowEqual);
    const inputEl = useRef(null);

    useEffect(() => {
        (async () => {
            const user = await selectTableUsersByID(myOrkaUUID);
            const myUser = user?.[0];

            setMyUserProfile(myUser?.profile || 0);
            setMyUserName(myUser?.name || "");
            setMemoUserName(myUser?.name || "");
        })();
    }, [myOrkaUUID]);

    function onChange(event) {
        setMyUserName(event?.target?.value || "");
    }

    async function onUpdateName() {
        console.log("onUpdateName called");
        await patchTableUsersByID({ name: myUserName.trim() }, myOrkaUUID);

        // reset memo
        setMemoUserName(myUserName);
    }

    function onClear() {
        setMyUserName("");
        inputEl.current.focus();
    }

    const profilePath = `profile_${myUserProfile}.png`;
    const shouldShowDone = myUserName !== memoUserName;

    return (
        <ProfileEditName className={className} shouldShowDone={shouldShowDone}>
            <MiniProfile className="orka-mini-profile">
                <img src={`/${IMAGE_URL}/${profilePath}`} alt="my profile" />
            </MiniProfile>
            <NameEditor>
                <InputStyle
                    ref={inputEl}
                    value={myUserName}
                    onChange={onChange}
                ></InputStyle>
                <div className="orka-icon-container" onClick={onClear}>
                    <ProfileEditNameClearIcon />
                </div>
            </NameEditor>
            <div
                className="orka-edit-button"
                onClick={shouldShowDone ? onUpdateName : null}
            >
                {shouldShowDone ? "Done" : "Edit"}
            </div>
        </ProfileEditName>
    );
}

ProfileEditNameComponent.propTypes = {};

ProfileEditNameComponent.defaultProps = {};

export default ProfileEditNameComponent;
