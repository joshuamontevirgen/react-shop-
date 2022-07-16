import { createSlice } from "@reduxjs/toolkit";

export const loaderOverlaySlice = createSlice({
  name: "loader",
  initialState: {
    show: false,
  },
  reducers: {
    showLoaderOverlay: (state) => {
      state.show = true;
    },
    hideLoaderOverlay: (state) => {
      state.show = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showLoaderOverlay, hideLoaderOverlay } =
  loaderOverlaySlice.actions;

export default loaderOverlaySlice.reducer;
