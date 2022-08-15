import React from "react";
import TabComponent from "./TabComponent";
import { userEvent } from '@storybook/testing-library';


export default {
    title: "Orka/Main/Tabs",
    component: TabComponent,
};

const Template = (args) => <TabComponent {...args} />;

export const HomeTab = Template.bind();
HomeTab.args = {
    Icon: "Home",
};

export const ProfileTab = Template.bind();
ProfileTab.args = {
    Icon: "Profile",
};

export const NotificationTab = Template.bind();
NotificationTab.args = {
    Icon: "Notification",
};
