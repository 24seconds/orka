import React from "react";
import TextCopyComponent from "./TextCopyComponent";

export default {
    title: "Orka/MyProfileAndActivity/TextCopy",
    component: TextCopyComponent,
};

const Template = (args) => <TextCopyComponent {...args} />;

export const TextCopy = Template.bind();

TextCopy.args = {
    text: "https://github.com/24seconds/orka",
};
