const schemaFile = "../../api/api/swagger.json";

const config = {
  schemaFile,
  apiFile: "../src/services/eventsApiBase.tsx",
  apiImport: "eventsApiBase",
  outputFile: "../src/services/generated/eventsApi.ts",
  exportName: "eventsApi",
  hooks: true,
  tag: true,
};

module.exports = config;
