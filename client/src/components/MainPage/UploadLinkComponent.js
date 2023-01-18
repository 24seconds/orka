import React, { useState } from "react";
import styled from "styled-components";
import UploadLinkIcon from "../../assets/UploadLinkIcon";
import {
    createTableSharingData,
    notifySharingData,
} from "../../utils/localApi";

const UploadLink = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 520px;
    height: 138px;
    background: ${(props) => props.theme.Grayscale03};
    border-radius: 30px;
`;

const PlaceHolder = styled.div`
    display: flex;
    align-items: center;
    width: 448px;
    height: 66px;
    background: ${(props) => props.theme.Grayscale04};
    border-radius: 18px;

    color: ${(props) => props.theme.Grayscale01};
    font-weight: 400;
    font-size: 24px;
    line-height: 120%;
    letter-spacing: -0.04em;

    .desc {
        width: 100%;
        margin-left: 24px;
    }

    .icon-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 54px;
        height: 54px;

        margin: 0 13px;
        cursor: pointer;

        circle {
            fill: ${(props) =>
                props.isActive && props.theme.ActivityRowBackgroundscale02};
        }
    }

    input {
        background: ${(props) => props.theme.Grayscale04};
        border: none;
        outline: none;
        height: 100%;
        padding: 0;

        font-weight: 400;
        font-size: 18px;
        line-height: 120%;
        letter-spacing: -0.04em;

        color: ${(props) => props.theme.White};

        ::placeholder {
            color: ${(props) => props.theme.Grayscale01};
            opacity: 1;
        }

        ::-ms-input-placeholder {
            color: ${(props) => props.theme.Grayscale01};
        }
    }
`;

// TODO(young): There are many comment logics between CommentInputComponent.
function UploadLinkComponent(props) {
    const { className } = props;

    const [text, setText] = useState("");

    function onChange(event) {
        setText(event?.target?.value || "");
    }

    async function onKeyDown(event) {
        if (event?.key === "Enter") {
            console.log("enter pressed");
            await onClick(event);
        }
    }

    async function onClick(event) {
        console.log("clicked");

        // save to database
        const sharingData = await createTableSharingData({ text });

        // flush
        setText("");

        // notify to other peers
        if (!!sharingData) {
            await notifySharingData(sharingData);
        }
    }

    return (
        <UploadLink className={className}>
            <PlaceHolder isActive={text.length > 0}>
                <input
                    className="desc"
                    placeholder="Type the URL link here!"
                    value={text}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
                <div className="icon-container" onClick={onClick}>
                    <UploadLinkIcon />
                </div>
            </PlaceHolder>
        </UploadLink>
    );
}

export default UploadLinkComponent;
