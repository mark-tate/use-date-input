module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ["(tests/.*.mock).(jsx?|tsx?)$"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ['../../config/jest/jest.setup.js'],
  testRegex: "(/__tests__/.*.(test|spec)).(jsx?|tsx?)$",
  transformIgnorePatterns: ["/node_modules/(?!@babel/runtime)"],
  verbose: true,
};
