import { CodegenConfig } from "@graphql-codegen/cli"
const auth =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVWbWpMSWhKNWpsYU44WUFPN2hFYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1ma3AzNGYxeWZhanVvcWo3LmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJoYW5XRlIzdnppY2Jxbk5IN2d5dDJHWmluamNVVnE3Q0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaWF0IjoxNzQ3MjkyMTk4LCJleHAiOjE3NDczNzg1OTgsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhhbldGUjN2emljYnFuTkg3Z3l0MkdaaW5qY1VWcTdDIn0.Hg3D8Qz87LKNwvloWLg2k0pD9aDBqcofkuXQswrNSmEXd4z9I5u9xt7d0QF9C_R3PMfHgkqKNwCSAQM2Ib76u3kjB8XBElJFRPq6Ajwnq30ngIAV3DA_653e0OkEcpJDByahJ8d2d1YkPbiMvx3Nb_MA9XBl4FUrwXqY3epGpNXeNjEVkeVkxfgO5D1PBuuKzso0OSZIufh9RB6ePECwdWMSaJT8Ga3j43KOYAQVXwvcP6iLU0sidKRPS_24Is3aF-9DUxH7KClPzGglYuCjLSmH7rl1my8dRF0PHQ_FIMnZGZOIp2JsYqkGDZ3xpDC2pxnyeXk2V8X7W0mi42W8Aw"
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
