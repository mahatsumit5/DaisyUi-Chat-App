import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8000/graphql",
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/graphql/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./src/graphql/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
    "./src/graphql/generated.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-rtk-query"],

      config: {
        importBaseApiFrom: "./baseApi",
        importBaseApiAlternateName: "baseApiWithGraphql",
        exportHooks: true,
      },
    },
  },
};

export default config;
