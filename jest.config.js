/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  verbose: true,
  json: true,
  testLocationInResults: true,
  rootDir: "src/tests",
  setupFilesAfterEnv: ["<rootDir>/utils/setupTests.js"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
