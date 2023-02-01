import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ToastCheckIcon from "../../assets/ToastCheckIcon";
import CloseIcon from "../../assets/CloseIcon";

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
        stroke: ${props => props.theme.White};
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
`;

function ToastComponent(props) {
    const { className } = props;

    return (
        <Toast className={className}>
            <ToastCheck>
                <ToastCheckIcon />
            </ToastCheck>
            <ToastMessage>
                <div className="orka-toast-title">TItle</div>
                <div className="orka-toast-desc">Description</div>
            </ToastMessage>
            <ToastCloseContainer>
                <CloseIcon/>
            </ToastCloseContainer>
        </Toast>
    );
}

export default ToastComponent;
