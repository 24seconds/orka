import React, { useRef, useState } from "react";
import styled from "styled-components";
import UploadLinkIcon from "../../assets/UploadLinkIcon";
import {
    addToast,
    createTableSharingData,
    notifySharingData,
} from "../../utils/localApi";

const UploadLink = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 520px;
    max-height: 226px;
    background: ${(props) => props.theme.Grayscale03};
    border-radius: 30px;
`;

const PlaceHolder = styled.div`
    display: flex;
    width: 448px;
    max-height: 226px;
    background: ${(props) => props.theme.Grayscale04};
    border-radius: 18px;

    color: ${(props) => props.theme.Grayscale01};
    font-weight: 400;
    font-size: 24px;
    line-height: 120%;
    letter-spacing: -0.02em;

    margin: 36px;

    .desc {
        width: 100%;
        margin-left: 24px;
    }

    .icon-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 33px;
        height: 33px;

        margin: 16px 13px 0 13px;
        cursor: pointer;

        circle {
            fill: ${(props) =>
                props.isActive
                    ? props.theme.ActivityRowBackgroundscale02
                    : props.theme.Grayscale01};
        }

        > svg > path {
            stroke: ${(props) => props.theme.Grayscale04};
        }
    }

    textarea {
        resize: none;
        background: ${(props) => props.theme.Grayscale04};
        border: none;
        outline: none;
        height: ${(props) => props.textareaDefaultHeight};
        max-height: 110px;
        padding: 0;

        margin-top: 22px;
        margin-bottom: 22px;

        font-weight: 400;
        font-size: 18px;
        line-height: 120%;
        letter-spacing: -0.02em;

        color: ${(props) => props.theme.UploadInputText};

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
    const textareaRef = useRef(null);

    const textareaDefaultHeight = `22px`;

    function onChange(event) {
        setText(event?.target?.value || "");

        textareaRef.current.style.height = "1px";
        textareaRef.current.style.height = `${event.target.scrollHeight}px`;
    }

    async function onKeyDown(event) {
        if (event?.key === "Enter" && (event?.metaKey || event?.ctrlKey)) {
            await onClick(event);

            textareaRef.current.style.height = textareaDefaultHeight;
            textareaRef.current.style.height = `${event.target.scrollHeight}px`;
        }
    }

    async function onClick(event) {
        // save to database
        const sharingData = await createTableSharingData({ text });

        // flush
        setText("");

        if (!!sharingData) {
            // notify to other peers
            await notifySharingData(sharingData);

            // notify to user with toast message
            addToast("Success!", "Check out 'my page'!");
        }
    }

    return (
        <UploadLink className={className}>
            <PlaceHolder isActive={text.length > 0} textareaDefaultHeight={textareaDefaultHeight}>
                <textarea
                    className="desc"
                    placeholder="Type the URL link here!"
                    value={text}
                    ref={textareaRef}
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
