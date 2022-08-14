import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import { useArgs } from "@storybook/client-api";

export default {
    title: "Orka/ToggleSwitch",
    component: ToggleSwitch,
    argTypes: {
        onClick: { action: 'clicked' },
        backgroundColor: { control: "color" },
        "props.theme.Disabled": { control: "color" },
        "props.theme.SecondText": { control: "color" },
    },
};

const Template = (args) => {
    const [_, updateArgs] = useArgs();

    const handle = () => {
        args.isSwitchOn = !args.isSwitchOn;
        args.isRead = !args.isRead;

        updateArgs({ ...args });
    };
    return <ToggleSwitch {...args} onClick={handle} />;
};

export const Primary = Template.bind({
    isSwitchOn: false,
    isRead: false,
});
