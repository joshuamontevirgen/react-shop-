import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    disable: false,
  },
  reducers: {
    setDisable: (state, action) => {
      state.disable = action.payload;
    },
  },
});

export const { setDisable } = appSlice.actions;

export default appSlice.reducer;
