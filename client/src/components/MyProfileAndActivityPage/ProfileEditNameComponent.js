import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import ProfileEditNameClearIcon from "../../assets/ProfileEditNameClearIcon";
import { IMAGE_URL } from "../../constants/constant";
import { shallowEqual, useSelector } from "react-redux";
import {
    notifyUser,
    patchTableUsersByID,
    selectTableUsersByID,
} from "../../utils/localApi";
import { getProfilePath } from "../../utils/commonUtil";
import { mobileWidth } from "../../constants/styleConstants";

const EditButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 66px;
    height: 48px;

    cursor: pointer;
    margin-left: ${(props) => (props.shouldShowDone ? "1px" : "auto")};

    color: ${(props) => props.theme.PrimaryColor};
    font-weight: 300;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.02em;

    &:hover {
        background: ${(props) => props.theme.Grayscale04};
        border-radius: 16px;
    }

    @media (max-width: ${mobileWidth}) {
        font-size: 20px;
    }
`;

const ProfileEditName = styled.div`
    display: flex;
    align-items: center;
    height: 68px;

    .orka-mini-profile {
        margin-right: 16px;
    }
`;

const placeHolderTextStyle = css`
    font-weight: 400;
    font-size: 18px;
    line-height: 120%;
    letter-spacing: -0.02em;

    color: ${(props) => props.theme.Grayscale01};
`;

const editText = css`
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */

    letter-spacing: -0.02em;
    color: ${(props) => props.theme.PlaceholderTextscale01};
`;

const InputStyle = styled.input`
    width: 100%;
    height: 100%;

    background: ${(props) =>
        props.readOnly ? props.theme.Grayscale03 : props.theme.Grayscale04};
    border-radius: 12px;
    border: none;
    outline: none;
    padding: 0 0 0 17px;

    ${editText}

    ::placeholder {
        ${placeHolderTextStyle}
        opacity: 1;
    }

    ::-ms-input-placeholder {
        ${placeHolderTextStyle}
    }

    @media (max-width: ${mobileWidth}) {
        text-overflow: ellipsis;
        font-size: 18px;
        line-height: normal;
        letter-spacing: -0.72px;
    }
`;

const MiniProfile = styled.div`
    border-radius: 50%;

    img {
        width: 52px;
        height: 52px;
    }
`;

const editorStyle = css`
    min-width: 260px;
    height: 46px;
    border-radius: 12px;
    background: ${(props) => props.theme.Grayscale04};

    @media (max-width: ${mobileWidth}) {
        min-width: unset;
        width: 200px;
    }
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-right: 18px;
    ${(props) => props.editMode && "cursor: pointer;"}
`;

const NameEditor = styled.div`
    display: flex;
    align-items: center;

    ${editorStyle}
`;

function ProfileEditNameComponent(props) {
    const { className, editMode: propEditMode, onClick, onSetEditMode } = props;
    const [myUserProfile, setMyUserProfile] = useState(0);
    const [myUserName, setMyUserName] = useState("");

    const myOrkaUUID = useSelector((state) => state.myUUID, shallowEqual);
    const inputEl = useRef(null);

    useEffect(() => {
        (async () => {
            const myUser = await selectTableUsersByID(myOrkaUUID);

            setMyUserProfile(myUser?.profile || 0);
            setMyUserName(myUser?.name || "");
        })();
    }, [myOrkaUUID]);

    function onChange(event) {
        setMyUserName(event?.target?.value || "");

        if (!propEditMode) {
            onSetEditMode(true);
        }
    }

    async function onChangeMode() {
        onClick?.();

        if (propEditMode) {
            onSetEditMode(!propEditMode);
            await onUpdateName();
        }
    }

    async function onUpdateName() {
        const user = await patchTableUsersByID(
            { name: myUserName.trim() },
            myOrkaUUID
        );

        // notify to other peers
        if (!!user) {
            await notifyUser(user);
        }
    }

    function onClear() {
        setMyUserName("");
        inputEl.current.focus();
    }

    const profilePath = getProfilePath(myUserProfile);

    return (
        <ProfileEditName className={className} shouldShowDone={propEditMode}>
            <MiniProfile className="orka-mini-profile">
                <img src={`/${IMAGE_URL}/${profilePath}`} alt="my profile" />
            </MiniProfile>
            <NameEditor readOnly={!propEditMode}>
                <InputStyle
                    ref={inputEl}
                    value={myUserName}
                    onChange={onChange}
                    readOnly={!propEditMode}
                ></InputStyle>
                {propEditMode && (
                    <IconContainer
                        onClick={propEditMode ? onClear : undefined}
                        editMode={propEditMode}
                    >
                        {propEditMode && <ProfileEditNameClearIcon />}
                    </IconContainer>
                )}
            </NameEditor>
            {propEditMode && (
                <EditButton className="orka-edit-button" onClick={onChangeMode}>
                    {propEditMode ? "Done" : "Edit"}
                </EditButton>
            )}
        </ProfileEditName>
    );
}

ProfileEditNameComponent.propTypes = {
    isDeleteMode: PropTypes.bool,
};

ProfileEditNameComponent.defaultProps = {
    isDeleteMode: false,
};

export default ProfileEditNameComponent;
