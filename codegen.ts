import { CodegenConfig } from "@graphql-codegen/cli"
const auth =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVWbWpMSWhKNWpsYU44WUFPN2hFYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1ma3AzNGYxeWZhanVvcWo3LmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJoYW5XRlIzdnppY2Jxbk5IN2d5dDJHWmluamNVVnE3Q0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaWF0IjoxNzQ4MjY0MzM1LCJleHAiOjE3NDgzNTA3MzUsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhhbldGUjN2emljYnFuTkg3Z3l0MkdaaW5qY1VWcTdDIn0.azjI9UPGyevbwkfEQFH9T7nDABz2vkgVGVyCB2US8hWGzClah66v_vgyos4iOWCdEpslhEKfJk3LAf4ndnpP2ag-cpS6VIT0faElWIFlIhzv_rXXF6oAn_0u_t5Lff8nHH38PbHc-FbCCEU0BOaks6-2k2MRErO9BcXFSp8SkGK3_rbeyftFO2As5EeUPwhP0Amo8RrrZby90Je-OAHX7a9yZOyMkNBKQJLEbTfuon4TXTm3uERociocfvmXBq7XD74MrMhDyQ_PrFOHeQtSX3bXSnteOD0qJllRfc3EiRqTRiJPKjmYqMfIAG4drit0L9eaFZfiM4Q14WJP347pqg"
const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "http://localhost:8000/graphql": {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      },
    },
  ],

  documents: "./src/graphql/queries/**.graphql",
  generates: {
    // Use the following line to generate types for the GraphQL schema and operations
    // and save them in the specified path.
    // This is create all the queries in the same file

    // "./src/graphql/generated.ts": {
    //   preset: "import-types",
    //   plugins: [
    //     "typescript-operations",
    //     {
    //       "typescript-rtk-query": {
    //         importBaseApiFrom: "./baseApi",
    //         importBaseApiAlternateName: "baseApiWithGraphql",
    //         exportHooks: true,
    //       },
    //     },
    //   ],

    //   presetConfig: {
    //     typesPath: "../types/types.ts",
    //   },
    // },

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
