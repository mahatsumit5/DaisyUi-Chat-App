import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "http://localhost:8000/graphql": {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVWbWpMSWhKNWpsYU44WUFPN2hFYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1ma3AzNGYxeWZhanVvcWo3LmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJoYW5XRlIzdnppY2Jxbk5IN2d5dDJHWmluamNVVnE3Q0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaWF0IjoxNzQzOTIwMjgxLCJleHAiOjE3NDQwMDY2ODEsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhhbldGUjN2emljYnFuTkg3Z3l0MkdaaW5qY1VWcTdDIn0.MmZXYksuG935Z339hOoLtf9vwYP1EW7gOmAk5-zMlctdNCgp_N16BNq4ciRTO81ysXOIuXrroWogA2ts0D9cuLO1b3mvFyZ5KWj_mTa5jICCojvI3sMuIQaB8kE3tjCEW34zW6M3hEds3GmbDxR_z2EUvc9UQivcBaJJkkGjTB1zSMdDxvjn8ZCS5gWSfrhSRLWzmd46kJqszKdaCrEu-oTqmDa7s5wJP6q6HCcPlDRezLh8TEbMfPgZYMm9Nm4tfWTaw_KKVkD-OpIVv8jkitw-y24pJWEQraeWD9AbDwdx9dfwuAolSQ6uS6tlbdseqlGpwXsJ6MxD8pYgbp1R-w",
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
