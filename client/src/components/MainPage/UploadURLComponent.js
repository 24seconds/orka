import React from "react";
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
    }
`;

function UploadURLComponent() {
    return (
        <UploadURL>
            <PlaceHolder>
                <div className="desc">Type the URL link here!</div>
                <div className="icon-container">
                    <UploadLinkIcon />
                </div>
            </PlaceHolder>
        </UploadURL>
    );
}

export default UploadURLComponent;
