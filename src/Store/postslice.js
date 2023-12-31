import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  UserInfo: null,
  token: null,
};
export const AsyncUserRegisterThunk = createAsyncThunk(
  "user/Register",
  async (params) => {
    const { data } = await axios.post(
      "https://back-bwzi.vercel.app/auth/register",
      params,
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
    return data;
  }
);
export const AsyncSignInThunk = createAsyncThunk(
  "user/SignIn",
  async (params) => {
    const { data } = await axios.post(
      "https://back-bwzi.vercel.app/auth/login",
      params,
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
    return data;
  }
);
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignOutReducer: (state, action) => {
      state.token = action.payload;
    },
    ReloadPageReducer: (state, action) => {
      state.UserInfo = action.payload.user;
      state.token = action.payload.token;
    },
    ChangeUserInfo: (state, action) => {
      state.UserInfo = action.payload;
    },
  },
  extraReducers: {
    [AsyncUserRegisterThunk.fulfilled]: (state, action) => {
      state.UserInfo = action.payload._doc;
      state.token = action.payload.token;
    },
    [AsyncSignInThunk.fulfilled]: (state, action) => {
      state.UserInfo = action.payload.user;
      state.token = action.payload.token;
    },
  },
});
export const { SignOutReducer, ReloadPageReducer, ChangeUserInfo } =
  UserSlice.actions;
export const UserReducer = UserSlice.reducer;
