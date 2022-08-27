import React, { Fragment } from "react";
import ActivityRowComponent from "./ActivityRowComponent";

export default {
    title: "Orka/MyProfileAndActivity/ActivityRow",
    component: ActivityRowComponent,
    argTypes: {
        dataType: {
            options: ["TXT", "PNG", "JPEG"],
            control: { type: "radio" },
        },
    },
};

const Template = (args) => {
    return (
        <Fragment>
            <ActivityRowComponent key="1" {...args} />
            <ActivityRowComponent
                key="2"
                dataType="TXT"
                displayName="www.orka.com"
            />
        </Fragment>
    );
};

export const ActivityRow = Template.bind();
ActivityRow.args = {
    dataType: "JPEG",
    displayName: "filename.png",
};
ActivityRow.parameters = {
    backgrounds: { default: "Grayscale03" },
};
