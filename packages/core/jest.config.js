const base = require("../../config/jest/jest.config.js");

module.exports = {
  ...base,
  moduleNameMapper: {
    "test-utils": "<rootDir>/src/test-utils.js"
  },
  name: "@use-date-input/core",
  displayName: "@use-date-input/core"
};
