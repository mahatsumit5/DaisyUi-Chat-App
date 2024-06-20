// // custom-typings.d.ts

// import { Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";

// // Define the type for your middleware function
// type CustomMiddleware = <S, D extends Dispatch>(
//   api: MiddlewareAPI<D, S>
// ) => (
//   next: (action) => unknown
// ) => (action: { payload: { data: { message: string } } }) => unknown;

// // Extend the Middleware type with your custom type
// declare module "@reduxjs/toolkit" {
//   export interface Middleware {
//     rtkQueryErrorLogger: CustomMiddleware;
//   }
// }
