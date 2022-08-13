import React from "react";
import { within, userEvent } from "@storybook/testing-library";

import FooterComponent from "./FooterComponent";

export default {
    title: "Example/Footer",
    component: FooterComponent,
};

const Template = () => <FooterComponent />;

export const Primary = Template.bind({});
