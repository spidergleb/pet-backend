import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
  verbose: true,
};

export default config;
