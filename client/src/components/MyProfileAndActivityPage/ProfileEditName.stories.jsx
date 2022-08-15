import React from "react";
import ProfileEditNameComponent from "./ProfileEditNameComponent";

export default {
    title: "Orka/MyProfileAndActivity/ProfileEditName",
    component: ProfileEditNameComponent,
};

const Template = () => <ProfileEditNameComponent />;
export const ProfileEditName = Template.bind();
ProfileEditName.parameters = {
    backgrounds: { default: "Grayscale03" },
};
