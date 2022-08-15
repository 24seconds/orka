import React, { Fragment } from "react";
import ActivityRowComponent from "./ActivityRowComponent";

export default {
    title: "Orka/MyProfileAndActivity/ActivityRow",
    component: ActivityRowComponent,
};

const Template = (args) => <ActivityRowComponent {...args} />;

export const ActivityRow = Template.bind();
ActivityRow.args = {
    hasNewComment: true,
    isActive: true,
    dataType: "PNG",
};
ActivityRow.parameters = {
    backgrounds: { default: "Grayscale03" },
};
