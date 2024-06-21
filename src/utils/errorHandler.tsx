import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { toggleToast } from "../redux/reducer/toast.slice";

/**
 * Log a warning and show a toast!
 */
// Define the type for your middleware function
// type CustomMiddleware = <S, D extends Dispatch>(
//   api: MiddlewareAPI<D, S>
// ) => (
//   next: (action: unknown) => unknown
// ) => (action: { payload: { data: { message: string } } }) => unknown;

// export const rtkQueryErrorLogger: CustomMiddleware =
//   (api: MiddlewareAPI) => (next) => (action) => {
//     // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
//     if (isRejectedWithValue(action)) {
//       if (action.payload.data.message === "jwt malformed") {
//         action.payload.data.message = "Session expired.Please log in";
//       }
//       action.payload;

//       api.dispatch(
//         toggleToast({
//           isOpen: true,
//           content: {
//             id: Math.ceil(Math.random() * 10000000),
//             message: action.payload.data.message,

//             type: "warning",
//           },
//         })
//       );
//     }

//     return next(action);
//   };

// export const rtkQueryErrorLogger: Middleware =
//   (api: MiddlewareAPI) => (next) => (action) => {
//     // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
//     if (isRejectedWithValue(action)) {
//       //   if (action.payload.data.message === "jwt malformed") {
//       //     action.payload.data.message = "Session expired.Please log in";
//       //   }

//       api.dispatch(
//         toggleToast({
//           isOpen: true,
//           content: {
//             id: Math.ceil(Math.random() * 10000000),
//             message: action.payload.data.message,

//             type: "warning",
//           },
//         })
//       );
//     }

//     return next(action);
//   };

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      api.dispatch(
        toggleToast({
          isOpen: true,
          content: {
            id: Math.ceil(Math.random() * 10000000),
            message: "Unexpected error occured.",
            type: "error",
          },
        })
      );
    }

    return next(action);
  };
