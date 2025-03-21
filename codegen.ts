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
  },
};

export default config;
