import React from "react";
import FileCommentExpandComponent from "./FileCommentExpandComponent";

export default {
    title: "Orka/MyProfileAndActivity/FileCommentExpand",
    component: FileCommentExpandComponent,
};

const Template = (args) => <FileCommentExpandComponent {...args} />;

export const FileCommentExpand = Template.bind();

FileCommentExpand.args = {
    count: 10,
};
