import React from "react";
import CreatorBadgeComponent from "./CreatorBadgeComponent";

export default {
    title: "Orka/CreatorBadge/Badge",
    component: CreatorBadgeComponent,
};

const Template = () => <CreatorBadgeComponent />;

export const Badge = Template.bind();
Badge.parameters = {
    backgrounds: { default: "Grayscale03" },
};
