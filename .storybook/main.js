const path = require("path");

module.exports = {
  stories: ["../stories/**/*.stories.js"],
  logLevel: "debug",
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links"
  ]
};
