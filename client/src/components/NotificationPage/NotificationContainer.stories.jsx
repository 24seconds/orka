import React from "react";
import NotificationContainerComponent from "./NotificationContainerComponent";

export default {
    title: "Orka/Notification/Container",
    component: NotificationContainerComponent,
};

// TODO(young): remove args if not used
const Template = (args) => <NotificationContainerComponent {...args} />;

export const Container = Template.bind();
