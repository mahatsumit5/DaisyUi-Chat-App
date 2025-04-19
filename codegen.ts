import { CodegenConfig } from "@graphql-codegen/cli"
const auth =
  "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVWbWpMSWhKNWpsYU44WUFPN2hFYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1ma3AzNGYxeWZhanVvcWo3LmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJoYW5XRlIzdnppY2Jxbk5IN2d5dDJHWmluamNVVnE3Q0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaWF0IjoxNzQ1MDYzNjE4LCJleHAiOjE3NDUxNTAwMTgsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhhbldGUjN2emljYnFuTkg3Z3l0MkdaaW5qY1VWcTdDIn0.mvpwvHDpnchpdMqRMKsjbUPDSCrw33oi5IY9pwSVB9g8pZPhF7rOjSrjA20SK9HOfJBfkuuBI5S6k0MXIsjZk1vLwFbqjtyMpFjq8hr1rMzommPm2lCXnsP9pZ6t_ykqipHwKzjVceVdIYvTLft5W2jQ3Lmlcxe9K9XnRwVfuHP5rPpxHt3M-F7BSjjv4b_KSWPonNg04oRvpzuq00x-Zq_-yOl6UGTEl8se5XWUhPH_JGIOeBhPYLpMG9s1cY54X_hXIukFF91eNEszY2QICuT2nVsbOj258D2iFNXKHQi2fT2k7pwtHkxFzHav3E8N3m1Rbywgf61BeaE5LunS5w"
const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "http://localhost:8000/graphql": {
        headers: {
          Authorization: auth,
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
