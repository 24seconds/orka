import React from "react";

import UploadButtonComponent from "./UploadButtonComponent";

export default {
    title: "Orka/Main/UploadButton",
    component: UploadButtonComponent,
};

const Template = () => <UploadButtonComponent />;

export const UploadButton = Template.bind();

UploadButton.parameters = {
    backgrounds: { default: "Grayscale05" },
};
