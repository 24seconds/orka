import React, { Fragment } from "react";
import NotificationRowComponent from "./NotificationRowComponent";

export default {
    title: "Orka/Notification/Row",
};

const Template = (args) => (
    <Fragment>
        <NotificationRowComponent key="1" {...args} />
        <NotificationRowComponent key="2" isActive={true} />
    </Fragment>
);

export const Row = Template.bind();
Row.parameters = {
    backgrounds: { default: "Grayscale03" },
};
