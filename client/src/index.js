import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./utils/database/database";
import ToastContainerComponent from "./components/Toast/ToastContainerComponent";
import GuideContainerComponent from "./components/Guide/GuideContainerComponent";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

const toastContainer = document.getElementById("toast-root");
const toastRoot = createRoot(toastContainer);
toastRoot.render(
    <React.StrictMode>
        <Provider store={store}>
            <ToastContainerComponent />
        </Provider>
    </React.StrictMode>
);

const guideContainer = document.getElementById("guide-root");
const guideRoot = createRoot(guideContainer);
guideRoot.render(
    <React.StrictMode>
        <Provider store={store}>
            <GuideContainerComponent />
        </Provider>
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
