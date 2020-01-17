module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    "<rootDir>/tests"
  ],
  verbose: true,
  testMatch: [ "**/tests/**/*.integrationtest.ts" ],
  coveragePathIgnorePatterns: [ "/node_modules/", "tests/utils" ],
  globalSetup: "<rootDir>/tests/integration/testSetup.js",
  globalTeardown: "<rootDir>/tests/integration/testTeardown.js"
};