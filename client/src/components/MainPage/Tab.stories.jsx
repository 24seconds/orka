import React from "react";
import TabComponent from "./TabComponent";
import { Tabs } from "../../constants/constant";

export default {
    title: "Orka/Main/Tabs",
    component: TabComponent,
    argTypes: {
        iconType: {
            options: [Tabs.Home, Tabs.Profile, Tabs.Notification],
            control: { type: "radio" },
        },
    },
};

const Template = (args) => <TabComponent {...args} />;

export const HomeTab = Template.bind();
HomeTab.args = {
    iconType: Tabs.Home,
    isSelected: true,
};
HomeTab.parameters = {
    backgrounds: { default: "Grayscale05" },
};

export const ProfileTab = Template.bind();
ProfileTab.args = {
    iconType: Tabs.Profile,
    isSelected: false,
};
ProfileTab.parameters = {
    backgrounds: { default: "Grayscale05" },
};

export const NotificationTab = Template.bind();
NotificationTab.args = {
    iconType: Tabs.Notification,
    isSelected: false,
};
NotificationTab.parameters = {
    backgrounds: { default: "Grayscale05" },
};
