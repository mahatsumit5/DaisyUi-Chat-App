import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8000/graphql",
  documents: "./src/graphql/queries/**.graphql",
  generates: {
    "./src/graphql/generated.ts": {
      preset: "import-types",
      plugins: [
        "typescript-operations",
        {
          "typescript-rtk-query": {
            importBaseApiFrom: "./baseApi",
            importBaseApiAlternateName: "baseApiWithGraphql",
            exportHooks: true,
          },
        },
      ],

      presetConfig: {
        typesPath: "../types/types.ts",
      },
    },

    "./src/types/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },

    "src/graphql/file.ts": {
      preset: "near-operation-file",
      plugins: ["typescript-operations", "typescript-rtk-query"],
      presetConfig: {
        baseTypesPath: "../../types/types.ts",
        extension: ".generated.ts",
      },
      config: {
        importBaseApiFrom: "../baseApi",
        importBaseApiAlternateName: "baseApiWithGraphql",
        exportHooks: true,
      },
    },
  },
}

export default config
