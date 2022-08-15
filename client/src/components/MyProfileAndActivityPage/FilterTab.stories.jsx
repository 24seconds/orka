import React, { Fragment } from "react";
import FilterTabComponent from "./FilterTabComponent";

export default {
    title: "Orka/MyProfileAndActivity/FilterTab",
    component: FilterTabComponent,
};

const Template = (args) => {
    const { names } = args;
    return (
        <Fragment>
            {names.map((name) => {
                return (
                    <Fragment>
                        <FilterTabComponent key={name} name={name} />
                        <div
                            style={{
                                width: "10px",
                                height: "3px",
                                content: " ",
                                display: "block",
                                margin: "3px",
                            }}
                        />
                    </Fragment>
                );
            })}
        </Fragment>
    );
};

export const FilterTab = Template.bind({});
FilterTab.args = {
    names: ["ALL", "Files", "URL"],
};

FilterTab.parameters = {
    backgrounds: { default: "black" },
};
