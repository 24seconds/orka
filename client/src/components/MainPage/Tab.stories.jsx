import React from "react";
import TabComponent from "./TabComponent";
import { userEvent } from "@storybook/testing-library";

export default {
    title: "Orka/Main/Tabs",
    component: TabComponent,
};

const Template = (args) => <TabComponent {...args} />;

export const HomeTab = Template.bind();
HomeTab.args = {
    iconType: "Home",
};
HomeTab.parameters = {
    backgrounds: { default: "Grayscale05" },
};

export const ProfileTab = Template.bind();
ProfileTab.args = {
    iconType: "Profile",
};
ProfileTab.parameters = {
    backgrounds: { default: "Grayscale05" },
};

export const NotificationTab = Template.bind();
NotificationTab.args = {
    iconType: "Notification",
};
NotificationTab.parameters = {
    backgrounds: { default: "Grayscale05" },
};
