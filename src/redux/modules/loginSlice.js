import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const DB = process.env.React_APP_DBSERVER;

const initialState = {
  login: [],
  isLoading: false,
  error: null,
};

const axiosDB = axios.create({
  baseURL: DB,
  headers: {},
});

export const __loginRequest = createAsyncThunk(
  "member/login",
  async (payload, thunkAPI) => {
    try {
      await axiosDB.post(`member/login`, payload);
      return thunkAPI.fulfillWithValue("success");
    } catch (error) {
      return thunkAPI.rejectWithValue("error");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  [__loginRequest.pending]: (state) => {
    state.isLoading = true;
  },
  [__loginRequest.fulfilled]: (state, action) => {
    // 로그인성공메세지 띄우고 메인페이지로 이동시키기
    state.isLoading = false;
  },
  [__loginRequest.rejected]: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});
export const {} = loginSlice.actions;
export default loginSlice.reducer;
