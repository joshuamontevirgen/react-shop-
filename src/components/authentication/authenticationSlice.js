import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    authenticated: false,
    username: "",
    jwtToken: "",
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setJwtToken: (state, action) => {
      state.jwtToken = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthenticated, setUsername, setJwtToken } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
