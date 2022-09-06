import React from "react";

import UploadButtonComponent from "./UploadButtonComponent";

export default {
    title: "Orka/Main/UploadButton",
    component: UploadButtonComponent,
};

const Template = (args) => <UploadButtonComponent {...args} />;

export const UploadButton = Template.bind();

UploadButton.parameters = {
    backgrounds: { default: "Grayscale05" },
};
