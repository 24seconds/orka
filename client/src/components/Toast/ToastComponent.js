import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ToastCheckIcon from "../../assets/ToastCheckIcon";
import CloseIcon from "../../assets/CloseIcon";
import { shallowEqual, useSelector } from "react-redux";
import { deleteToast } from "../../utils/localApi";
import { TOAST_HIDE_STRATEGY_SRHINK } from "../../constants/constant";
import { mobileWidth } from "../../constants/styleConstants";

const ANIMATION_STATE_SHOW = "ANIMATION_STATE_SHOW";
const ANIMATION_STATE_FADE_OUT = "ANIMATION_STATE_FADE_OUT";
const ANIMATION_STATE_SHRINK = "ANIMATION_STATE_SHRINK";

const ToastCheck = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.White};

    @media (max-width: ${mobileWidth}) {
        width: 32px;
        height: 32px;
    }
`;

const ToastMessage = styled.div`
    flex-grow: 1;

    .orka-toast-title {
        color: ${(props) => props.theme.ToastMessageTitleText};
        font-weight: 600;
        font-size: 28px;
        line-height: 100%;
        /* identical to box height, or 28px */

        letter-spacing: -0.02em;

        margin-bottom: 6px;

        @media (max-width: ${mobileWidth}) {
            font-size: 20px;
            font-weight: 500;
            letter-spacing: -0.8px;

            margin-bottom: 0px;
        }
    }

    .orka-toast-desc {
        color: ${(props) => props.theme.ToastMessageDescriptionText};

        font-weight: 400;
        font-size: 20px;
        line-height: 100%;
        /* identical to box height, or 20px */

        letter-spacing: -0.02em;
    }
`;

const ToastCloseContainer = styled.div`
    > svg > path {
        stroke: ${(props) => props.theme.White};
    }

    &:hover {
        cursor: pointer;
    }

    @media (max-width: ${mobileWidth}) {
        width: 32px;
        height: 32px;
    }
`;

const Toast = styled.div`
    display: flex;
    align-items: center;
    width: 520px;
    height: 100px;
    border-radius: 30px;

    grid-column-start: 2;
    grid-row-start: 1;

    align-self: center;
    justify-self: center;

    background-color: ${(props) => props.theme.ToastBackground};

    ${ToastCheck} {
        margin: 0 16px 0 36px;
    }

    ${ToastCloseContainer} {
        margin-right: 48px;
    }

    @media (max-width: ${mobileWidth}) {
        width: 90vw;
        height: 56px;
        border-radius: 12px;

        ${ToastCheck} {
            margin: 0 12px 0 16px;
        }

        ${ToastCloseContainer} {
            margin-right: 16px;
        }
    }

    @media only screen and (max-width: ${mobileWidth}) {
        @keyframes hide-toast-shrink-mobile {
            from {
                opacity: 1;
                transform: translate(0, -110%);
                width: 90vw;
                height: 56px;
            }
            to {
                opacity: 0;
                transform: translate(0, -100%);
                width: 72vw;
                height: 45px;
            }
        }

        animation-name: ${(props) => {
            if (props.animationState === ANIMATION_STATE_SHOW) {
                return "show-toast";
            } else if (props.animationState === ANIMATION_STATE_FADE_OUT) {
                return "hide-toast";
            } else if (props.animationState === ANIMATION_STATE_SHRINK) {
                return "hide-toast-shrink-mobile";
            }
        }};
    }

    @keyframes show-toast {
        from {
            transform: translate(0, 110%);
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        to {
            transform: translate(0, -110%);
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
    }

    @keyframes hide-toast {
        from {
            opacity: 1;
            transform: translate(0, -110%);
        }
        to {
            opacity: 0;
            transform: translate(0, -110%);
        }
    }

    @keyframes hide-toast-shrink {
        from {
            opacity: 1;
            transform: translate(0, -110%);
            width: 520px;
            height: 100px;
        }
        to {
            opacity: 0;
            transform: translate(0, -100%);
            width: 416px;
            height: 80px;
        }
    }

    animation-duration: ${(props) => {
        if (props.animationState === ANIMATION_STATE_SHRINK) {
            return "1.3s";
        }

        return "0.3s";
    }};
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    animation-name: ${(props) => {
        if (props.animationState === ANIMATION_STATE_SHOW) {
            return "show-toast";
        } else if (props.animationState === ANIMATION_STATE_FADE_OUT) {
            return "hide-toast";
        } else if (props.animationState === ANIMATION_STATE_SHRINK) {
            return "hide-toast-shrink";
        }
    }};

    transform: ${(props) => {
        if (props.animationState === ANIMATION_STATE_SHOW) {
            return "translate(0, -110%)";
        } else if (props.animationState === ANIMATION_STATE_FADE_OUT) {
            return "translate(0, 110%)";
        } else if (props.animationState === ANIMATION_STATE_SHRINK) {
            return "translate(0, 110%)";
        }
    }};
`;

function ToastComponent(props) {
    const { className, messageID, title, description, hideStrategy } = props;
    const [transformStyle, setTransformStyle] = useState("translate(0, -110%)");
    const [animationState, setAnimationState] = useState(ANIMATION_STATE_SHOW);

    const ref = useRef(null);

    useEffect(() => {
        const time = 2300;

        const timeoutID = setTimeout(() => {
            setAnimationState(ANIMATION_STATE_FADE_OUT);
        }, time);

        return () => clearTimeout(timeoutID);
    }, [messageID]);

    const onClose = useCallback(() => {
        const styles = getComputedStyle(ref.current);
        setTransformStyle(styles.transform);

        setAnimationState(ANIMATION_STATE_FADE_OUT);
    }, [ref]);

    const onAnimationEnd = useCallback(
        (e) => {
            if (e.animationName === "hide-toast") {
                deleteToast(messageID);
            }
        },
        [messageID]
    );

    const computedAnimationStyle = (() => {
        if (hideStrategy === TOAST_HIDE_STRATEGY_SRHINK) {
            return ANIMATION_STATE_SHRINK;
        }

        return animationState;
    })();

    return (
        <Toast
            className={className}
            transform={transformStyle}
            animationState={computedAnimationStyle}
            ref={ref}
            onAnimationEnd={onAnimationEnd}
        >
            <ToastCheck>
                <ToastCheckIcon />
            </ToastCheck>
            <ToastMessage>
                <div className="orka-toast-title">{title}</div>
                <div className="orka-toast-desc">{description}</div>
            </ToastMessage>
            <ToastCloseContainer onClick={onClose}>
                <CloseIcon />
            </ToastCloseContainer>
        </Toast>
    );
}

ToastComponent.propTypes = {
    messageID: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
};

ToastComponent.defaultProps = {
    messageID: "",
    title: "Title",
    description: "Description",
};

export default ToastComponent;
