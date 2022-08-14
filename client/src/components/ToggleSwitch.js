import React from "react";
import styled, { withTheme } from "styled-components";

const Switch = styled.div`
    display: flex;
    align-items: center;

    .localdrop-animation-switch {
        display: inline-block;
        box-sizing: border-box;
        width: 60px;
        height: 30px;
        background-color: ${(props) => props.theme.Disabled};
        padding: 3px;
        cursor: pointer;
        border: solid 2px ${(props) => props.theme.Border};
        border-radius: 4px;

        &.on {
            background-color: ${(props) => props.theme.Active};
        }

        .slider-container {
            width: 100%;
            height: 100%;
            position: relative;

            .slider {
                display: flex;
                align-items: center;
                font-size: 20px;
                justify-content: center;
                background-color: ${(props) => props.theme.SecondText};
                color: ${(props) => props.theme.Notifications};
                width: 50%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                transition: 0.3s;
                border-radius: 4px;

                user-select: none;

                &.on {
                    transform: translate3d(100%, 0, 0);
                }
            }
        }
    }
`;

function ToggleSwitch(props) {
    const { isSwitchOn, isRead } = props;

    function onAnimationToggle() {
        const { onClick } = props;

        onClick();
    }

    return (
        <Switch>
            <div
                className={`localdrop-animation-switch ${
                    isSwitchOn ? "on" : "off"
                }`}
                onClick={onAnimationToggle}
            >
                <div className="slider-container">
                    <div className={`slider ${isSwitchOn ? "on" : "off"}`}>
                        {isRead ? "" : "!"}
                    </div>
                </div>
            </div>
        </Switch>
    );
}

export default ToggleSwitch;
