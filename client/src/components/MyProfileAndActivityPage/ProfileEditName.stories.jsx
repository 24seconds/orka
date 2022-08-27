import React from "react";
import ProfileEditNameComponent from "./ProfileEditNameComponent";

export default {
    title: "Orka/MyProfileAndActivity/ProfileEditName",
    component: ProfileEditNameComponent,
};

const Template = (args) => <ProfileEditNameComponent {...args} />;
export const ProfileEditName = Template.bind();
ProfileEditName.args = {
    name: "Young",
};
ProfileEditName.parameters = {
    backgrounds: { default: "Grayscale03" },
};
