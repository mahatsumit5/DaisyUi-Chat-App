import { CodegenConfig } from "@graphql-codegen/cli"
const auth =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVWbWpMSWhKNWpsYU44WUFPN2hFYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1ma3AzNGYxeWZhanVvcWo3LmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJoYW5XRlIzdnppY2Jxbk5IN2d5dDJHWmluamNVVnE3Q0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaWF0IjoxNzQ0OTc5ODUyLCJleHAiOjE3NDUwNjYyNTIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhhbldGUjN2emljYnFuTkg3Z3l0MkdaaW5qY1VWcTdDIn0.aorqcJDx70L-OAIpbaMeCqHDb1wU2JZ0BRjHW40blyTRtLTCHkxTdqh_Z-q3OzoGPDlkjt2ERDrFdCEpQySXXdb73dsjyfops2Bqmv9LNtvsPTLjjVDXWUOP4-t4mO__30zIIlV79MBeMkIUUAVjX88s2CrS1bVo6G51GlzZQ6RSyN30QxVPaOrquA7fn3AyBpLumlCByuElnIx4nv0obtTF5-F6wl4r9DXZU1HfT6wO4dyBszTnZxqxBnIYupXXPjyRknnKDVg6PqV52W0__cz5t1TZWusPAoHb-6mEUYYlm8mdbazYj8OE4YqrIWTI4lEjh7trIl91O7jRMU75qw"
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
