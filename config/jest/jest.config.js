module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ["(tests/.*.mock).(jsx?|tsx?)$"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "test-utils": "<rootDir>/src/test-utils.js"
  },
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ['../../config/jest/jest.setup.js'],
  testRegex: "(/__tests__/.*.(test|spec)).(jsx?|tsx?)$",
  transformIgnorePatterns: ["/node_modules/(?!@babel/runtime)"],
  verbose: true,
};
