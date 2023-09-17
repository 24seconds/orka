import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import ToastComponent from "./ToastComponent";

const ToastContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;

    height: 100%;
`;

function ToastContainerComponent() {
    const toastMessages = useSelector(
        (state) => state.toastMessages,
        shallowEqual
    );

    const orkaTheme = useSelector((state) => state.orkaTheme, shallowEqual);

    console.log("toastMessages length:", toastMessages.length);

    return (
        <ThemeProvider theme={orkaTheme}>
            <ToastContainer>
                {toastMessages.map((message) => {
                    return (
                        <ToastComponent
                            key={message.id}
                            messageID={message.id}
                            title={message.title}
                            description={message.description}
                            hideStrategy={message.hideStrategy}
                        />
                    );
                })}
            </ToastContainer>
        </ThemeProvider>
    );
}

export default ToastContainerComponent;
