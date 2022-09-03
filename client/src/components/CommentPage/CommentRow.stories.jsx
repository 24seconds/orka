import React from "react";
import CommentRowComponent from "./CommentRowComponent";

export default {
    title: "Orka/Comment/Row",
    comment: CommentRowComponent,
};

const Template = () => <CommentRowComponent />;

export const Row = Template.bind();
Row.parameters = {
    backgrounds: { default: "Grayscale03" },
};
