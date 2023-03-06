import { createSlice } from "@reduxjs/toolkit";

import { userLogin } from "../actions/userActions";

const authToken = localStorage.getItem("authToken")
  ? localStorage.getItem("authToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  authToken,
  error: null,
  success: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, { payload }) => {
      localStorage.removeItem("authToken");
      state.loading = false
      state.userInfo = null
      state.authToken = null
      state.error = null
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.authToken = payload.access;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});


export const { logout, setCredentials } = userSlice.actions
export default userSlice.reducer;
