import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { toggleToast } from "../redux/reducer/toast.slice";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    console.log(action);
    if (isRejectedWithValue(action)) {
      api.dispatch(
        toggleToast({
          isOpen: true,
          content: {
            id: Math.ceil(Math.random() * 10000000),
            message: "UnExpected error occured.",

            type: "error",
          },
        })
      );
    }

    return next(action);
  };
