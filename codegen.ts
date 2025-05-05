import { CodegenConfig } from "@graphql-codegen/cli"
const auth =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVWbWpMSWhKNWpsYU44WUFPN2hFYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1ma3AzNGYxeWZhanVvcWo3LmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJoYW5XRlIzdnppY2Jxbk5IN2d5dDJHWmluamNVVnE3Q0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaWF0IjoxNzQ2MjcwNjcxLCJleHAiOjE3NDYzNTcwNzEsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhhbldGUjN2emljYnFuTkg3Z3l0MkdaaW5qY1VWcTdDIn0.Sy703Qx8rpreioT1GDEfC0I6GwhjUrQwgmwSgLeG2pmPtj5xYtToLkpIddAtZm6gWHFVmOhXHZ68eEbVKfkEsO2v8cg2DtUr9LmenBWuNm-VUxALv94Gq3AeAvjYaaNrvHYZzYIu3zCPTpDOYNfsW0HR93u0BpnrSjpjILx7oNJIA-QCsootQAU64pj8yFMTDi_7FoW1mbcJ3iyu13bYgQhe-m-2yesdSCerMr2NsU9a4cqXenbuze1G-okyz5aNhm7SkOrli0TMa4zeMNMu9E0uKUG0MpPKfgzAODdo3Pzs0mZPQ2Qjp4iJxnaTRS1V4NNR18Pr3NVBXjKRxaVo1g"
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
