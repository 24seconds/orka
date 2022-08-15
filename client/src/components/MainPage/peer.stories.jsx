import React from "react";
import PeerComponent from "./Peer/PeerComponent";

export default {
    title: "Orka/Main/Peer",
    component: PeerComponent,
};

const Template = (args) => <PeerComponent {...args} />;

export const Primary = Template.bind();
Primary.args = {
    orders: ["0", "1"],
    dataTypes: ["PNG", "TXT"],
};
