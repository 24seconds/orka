import React, { useEffect, useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import ToastCheckIcon from "../../assets/ToastCheckIcon";
import CloseIcon from "../../assets/CloseIcon";
import { shallowEqual, useSelector } from "react-redux";

const ToastCheck = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.White};
`;

const ToastMessage = styled.div`
    flex-grow: 1;

    .orka-toast-title {
        color: ${(props) => props.theme.ToastMessageTitleText};
        font-weight: 600;
        font-size: 28px;
        line-height: 100%;
        /* identical to box height, or 28px */

        letter-spacing: -0.04em;

        margin-bottom: 6px;
    }

    .orka-toast-desc {
        color: ${(props) => props.theme.ToastMessageDescriptionText};

        font-weight: 400;
        font-size: 20px;
        line-height: 100%;
        /* identical to box height, or 20px */

        letter-spacing: -0.04em;
    }
`;

const ToastCloseContainer = styled.div`
    > svg > path {
        stroke: ${(props) => props.theme.White};
    }

    &:hover {
        cursor: pointer;
    }
`;

const Toast = styled.div`
    display: flex;
    align-items: center;
    width: 520px;
    height: 100px;
    border-radius: 30px;

    background-color: ${(props) => props.theme.ToastBackground};

    ${ToastCheck} {
        margin: 0 16px 0 36px;
    }

    ${ToastCloseContainer} {
        margin-right: 48px;
    }

    @keyframes show-toast {
        from {
            transform: translate(0, 110%);
        }
        to {
            transform: translate(0, -110%);
        }
    }

    @keyframes hide-toast {
        from {
            transform: ${(props) => props.transform};
        }
        to {
            transform: translate(0, 110%);
        }
    }

    animation-name: ${(props) =>
        props.shouldReverse ? "hide-toast" : "show-toast"};
    animation-duration: 0.3s;

    transform: ${(props) =>
        props.shouldReverse ? "translate(0, 110%)" : "translate(0, -110%)"};
`;

function ToastComponent(props) {
    const { className, title, description } = props;
    const [shouldReverse, setShouldReverse] = useState(false);
    const [transformStyle, setTransformStyle] = useState("translate(0, -110%)");

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setShouldReverse(true);
        }, 2300);

        return () => clearTimeout(timeoutID);;
    }, []);

    const ref = useRef(null);

    const orkaTheme = useSelector((state) => state.orkaTheme, shallowEqual);

    function onClose() {
        const styles = getComputedStyle(ref.current);
        setTransformStyle(styles.transform);

        setShouldReverse(true);
    }

    return (
        <ThemeProvider theme={orkaTheme}>
            <Toast
                className={className}
                transform={transformStyle}
                shouldReverse={shouldReverse}
                ref={ref}
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
        </ThemeProvider>
    );
}

ToastComponent.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

ToastComponent.defaultProps = {
    title: "Title",
    description: "Description",
};

export default ToastComponent;
