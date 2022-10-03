module.exports = {
    core: {
        builder: 'webpack5',
    },
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "storybook-addon-styled-component-theme/dist/preset",
    ],
    framework: "@storybook/react",
    babel: async (options) => {
        options.plugins.push("babel-plugin-inline-react-svg");
        return options;
    },
};
