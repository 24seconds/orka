import React from "react";
import ActionButtonComponent from "./ActionButtonComponent";

export default {
    title: "Orka/MyProfileAndActivity/ActionButton",
    component: ActionButtonComponent,
};

const Template = (args) => <ActionButtonComponent {...args} />;

export const ActionButton = Template.bind();

ActionButton.args = {
    type: "FILE",
};
