module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts"],
  transformIgnorePatterns: ["node_modules/(?!(lowdb)/)"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
}
