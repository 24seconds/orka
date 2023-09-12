import React, { useRef, useState } from "react";
import styled from "styled-components";
import UploadLinkIcon from "../../assets/UploadLinkIcon";
import {
    addToast,
    createTableSharingData,
    notifySharingData,
    toggleModal,
} from "../../utils/localApi";
import { inferDataTypeOfText } from "../../utils/commonUtil";
import {
    DATATYPE_LINK,
    DATA_EXTENSION_LINK,
    DATA_EXTENSION_TEXT,
} from "../../constants/constant";
import { mobileWidth } from "../../constants/styleConstants";

const UploadLink = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 520px;
    max-height: 226px;
    background: ${(props) => props.theme.Grayscale03};
    border-radius: 30px;

    @media (max-width: ${mobileWidth}) {
        width: 100%;
    }
`;

const PlaceHolder = styled.div`
    display: flex;
    width: 100%;
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
        width: 32px;
        height: 32px;

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

    @media (max-width: ${mobileWidth}) {
        margin: 0 24px;

        textarea {
            margin: 16px 0 16px 24px;
            font-size: 16px;
        }

        .icon-container {
            margin: 9px 12px 9px 24px;
            align-self: center;
        }
    }
`;

function UploadLinkComponent(props) {
    const {
        className,
        shouldTriggerToast = true,
        toastMessage,
        shouldToggleModal = false,
    } = props;

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

            if (!!textareaRef?.current?.style) {
                textareaRef.current.style.height = textareaDefaultHeight;
                textareaRef.current.style.height = `${event.target.scrollHeight}px`;
            }
        }
    }

    async function onClick(event) {
        // save to database

        // infer text is LINK or TEXT
        const type = inferDataTypeOfText(text);
        const extension = (() => {
            if (type === DATATYPE_LINK) {
                return DATA_EXTENSION_LINK;
            }
            return DATA_EXTENSION_TEXT;
        })();
        const sharingData = await createTableSharingData({
            text,
            type,
            extension,
        });

        // flush
        setText("");

        if (!!sharingData) {
            // notify to other peers
            await notifySharingData(sharingData);

            if (shouldTriggerToast) {
                // notify to user with toast message
                if (!!toastMessage?.title) {
                    addToast(toastMessage?.title, toastMessage?.description);
                } else {
                    addToast("Success!", "Check out 'my page'!");
                }
            }

            if (shouldToggleModal) {
                toggleModal();
            }
        }
    }

    return (
        <UploadLink className={className}>
            <PlaceHolder
                isActive={text.length > 0}
                textareaDefaultHeight={textareaDefaultHeight}
            >
                <textarea
                    className="desc"
                    placeholder="Type the Text or URL link here!"
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
