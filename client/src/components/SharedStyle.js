import { css } from "styled-components";
import { mobileWidth, TabDefaultWidth } from "../constants/styleConstants";

export const messageCell = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px ${(props) => props.theme.Border};
    border-top: none;
    padding: ${(props) => props.padding || "0 10px"};
    height: 30px;
    font-size: 16px;
    width: ${(props) => props.width || TabDefaultWidth}px;
    min-width: ${(props) => props.width || TabDefaultWidth}px;
    max-width: ${(props) => props.width || TabDefaultWidth}px;
`;
export const rippleEffect = css`
    background-position: center;
    transition: background 0.3s;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
        background: ${(props) => props.theme.Buttons}
            radial-gradient(
                circle,
                transparent 1%,
                ${(props) => props.theme.Active} 1%
            )
            center/15000%;
    }

    &:active {
        background-color: ${(props) => props.theme.Contrast};
        background-size: 100%;
        transition: background 0s;
    }

    @media (max-width: ${mobileWidth}) {
        &:focus {
            -webkit-tap-highlight-color: transparent;
            outline: none;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
        }
    }
`;

export const hoverRow = css`
    &:hover {
        background: ${(props) => props.theme.Grayscale02};
    }
`;

export const hoverFilterTab = css`
    &:hover {
        border-color: ${(props) => props.theme.White};
    }
`;

export const hoverOpacity = css`
    &:hover {
        opacity: 0.6;
    }
`;

export const hoverCloseButton = css`
    &:hover {
        background: ${(props) => props.theme.Grayscale04};
        border-radius: 50%;

        transform: scale(1.5);
    }
`;

export const PeerStyle = css`
    display: flex;
    flex-direction: column;
    width: 164px;
    height: 244px;

    border-radius: 30px;
    cursor: pointer;
    box-sizing: border-box;
    border: 2px solid transparent;

    @media (max-width: ${mobileWidth}) {
        width: 100%;
        flex-grow: 1;
        height: 220px;
    }
`;

export const HideScroll = css`
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    ::-webkit-scrollbar {
        display: none;
    }
`;
