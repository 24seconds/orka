import React, { useState } from "react";
import styled from "styled-components";
import UploadLinkIcon from "../../assets/UploadLinkIcon";

const UploadURL = styled.div`
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
    background: ${(props) => props.theme.Blackscale01};
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
        background: ${(props) => props.theme.Blackscale01};
        border: none;
        outline: none;
        height: 100%;

        font-weight: 300;
        font-size: 18px;
        line-height: 120%;
        letter-spacing: -0.04em;

        color: ${(props) => props.theme.White};
    }
`;

function UploadURLComponent() {
    const [text, setText] = useState("");

    function onChange(event) {
        setText(event.target.value);
    }

    return (
        <UploadURL>
            <PlaceHolder isActive={text.length > 0}>
                <input
                    className="desc"
                    placeholder="Type the URL link here!"
                    onChange={onChange}
                />
                <div className="icon-container">
                    <UploadLinkIcon />
                </div>
            </PlaceHolder>
        </UploadURL>
    );
}

export default UploadURLComponent;
