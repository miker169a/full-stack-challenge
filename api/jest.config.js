module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts"], // Adjust this pattern to match your test files
  transformIgnorePatterns: [
    "node_modules/(?!(lowdb)/)", // Example: Transforms `lowdb`, but ignores the rest of `node_modules`
  ],
  transform: {
    "^.+\\.(ts)$": "ts-jest", // Only transform TypeScript files
  },
};
