import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TInitialState = {
  isOpen: false,
  content: [],
  align: "bottom",
  position: "center",
};
const toastSlice = createSlice({
  name: "toast",
  initialState,

  reducers: {
    toggleToast: (state, { payload }: PayloadAction<TToggleToastParams>) => {
      state.isOpen = payload.isOpen;
      state.content = [...state.content, payload.content];
    },
    removeToast: (state, { payload }: PayloadAction<number>) => {
      state.content = state.content.filter((item) => item.id !== payload);
    },
    closeToast: (state) => {
      state.isOpen = false;

      state.content.pop();
    },
    setPosition: (state, { payload }: PayloadAction<position>) => {
      state.position = payload;
    },
    setAlign: (state, { payload }: PayloadAction<position>) => {
      state.align = payload;
    },
  },
});

const { reducer, actions } = toastSlice;
export default reducer;
export const { toggleToast, removeToast, closeToast, setAlign, setPosition } =
  actions;

interface IContent {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}
type position = "top" | "bottom" | "start" | "end" | "center" | "middle";
type TInitialState = {
  isOpen: boolean;
  content: IContent[];
  position: position;
  align: position;
};

type TToggleToastParams = {
  isOpen: boolean;
  content: {
    id: number;
    message: string;
    type: "info" | "success" | "warning" | "error";
  };
};
