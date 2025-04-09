import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "http://localhost:8000/graphql": {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVWbWpMSWhKNWpsYU44WUFPN2hFYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1ma3AzNGYxeWZhanVvcWo3LmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJoYW5XRlIzdnppY2Jxbk5IN2d5dDJHWmluamNVVnE3Q0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaWF0IjoxNzQ0MTc5MzYxLCJleHAiOjE3NDQyNjU3NjEsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhhbldGUjN2emljYnFuTkg3Z3l0MkdaaW5qY1VWcTdDIn0.ec4q0y06y5xXTm7hKD0OIX3RGIarZSTG25BcrXraijJ2lUR3C1vnjHaB52bqP6fudJM1GKj4nv4k6c8KFGcax276T-aVEKlQwd63YeRUu6DYDzOlq3_3s_hI9cBvIjlb9a39TDH2Zm0wXp0p_9uHfYtYR09VcHUGaWp3VtWxjsCXaLNMRmZvuaiYcYo2_K4RCPft1d68LIeZ6jBPnwY9ZBk0RSS0M5VaXhKCQdLC6N7RZW1i_C2yG31dXZQQ1PY08dKaxnDtJXfn1I7VsZCaveV5QSHD0MyIh8bA5YCDkr-fF2aFRACPIHlkHWq2iLkf69_7GBpw2Mrvj939bXhGSw",
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
