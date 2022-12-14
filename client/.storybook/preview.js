import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { ThemeProvider } from "styled-components";
import { ColorThemes } from "../src/constants/styleTheme";

const themes = Object.values(ColorThemes);
addDecorator(withThemesProvider(themes), ThemeProvider);

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    options: {
        storySort: {
            order: ["Orka"],
        },
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        default: "w",
        values: [
            {
                name: "white",
                value: "#ffffff",
            },
            {
                name: "black",
                value: "#000000",
            },
            {
                name: "Grayscale03",
                value: "#202326",
            },
            {
                name: "Grayscale05",
                value: "#101010",
            },
            {
                name: "twitter",
                value: "#00aced",
            },
            {
                name: "facebook",
                value: "#3b5998",
            },
        ],
    },
};
