import React from "react";
import DataUsageStatusComponent from "./DataUsageStatusComponent";

export default {
    title: "Orka/MyProfileAndActivity/DataUsageStatus",
    component: DataUsageStatusComponent,
};

const Template = (args) => <DataUsageStatusComponent {...args} />;

export const DataUsageStatus = Template.bind();
DataUsageStatus.args = {
    text: "10 downloaded",
};

DataUsageStatus.parameters = {
    backgrounds: { default: "Grayscale03" },
};
