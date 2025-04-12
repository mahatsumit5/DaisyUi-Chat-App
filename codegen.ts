import { CodegenConfig } from "@graphql-codegen/cli"
const auth =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVWbWpMSWhKNWpsYU44WUFPN2hFYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1ma3AzNGYxeWZhanVvcWo3LmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJoYW5XRlIzdnppY2Jxbk5IN2d5dDJHWmluamNVVnE3Q0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaWF0IjoxNzQ0NDI2NDgwLCJleHAiOjE3NDQ1MTI4ODAsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhhbldGUjN2emljYnFuTkg3Z3l0MkdaaW5qY1VWcTdDIn0.PXMqE7fWFWCU6Pb7NbC9MMGV4Nb2KCZNfPGlj7kH6juD7ePt9YSwJyTvYUb1g2PuglDdnciON67DJ8wKik0FLlTCexEc6N0i1XQn8j2HYlawF10nyEXU6s2ZaoO2qm4R5K7JV0YY0AjriRDKE7X1wyyhPfhAYZpFzHKGQ00R_vsDOrNBzOQtpPBHF5nFwEwIgKNk3J23K2f2XZAecfM3XY6Nwt57mRbzUnULBx9iTWnpFxDY2H84I_YGJw3WF5pQqGbe8xC0b37Uu_pjeNPUCIylSw2MwAMW2GC5Ij3Ue9aQhh0X4gcjRSw86Rso8bpi7TRyXeOSEO8_YqO1VQYtfA"
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
