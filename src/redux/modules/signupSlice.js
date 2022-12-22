import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encrypt } from "../../components/LoginFrame/Encrypt";

const Server = process.env.REACT_APP_SERVER;

const initialState = {
  signup: [],
  isLoading: false,
  error: null,
};

const axiosDB = axios.create({
  baseURL: Server,
  headers: {},
});

export const __addSignup = createAsyncThunk(
  "signup",
  async (payload, thunkAPI) => {
    try {
      // const password = encrypt(`post.password`);
      const password = encrypt(payload.password);
      console.log(password);
      const userid = payload.userid;
      const nickname = payload.nickname;
      const userInfo = { userid, nickname, password };
      await axiosDB.post(`api/members/signup`, userInfo);
      // await axios.post(`http://3.35.9.50:8080/api/members/signup`, payload);
      return thunkAPI.fulfillWithValue("success");
    } catch (error) {
      return thunkAPI.rejectWithValue("error");
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: {
    [__addSignup.pending]: (state) => {
      state.isLoading = true;
    },
    [__addSignup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.content = action.payload;
    },
    [__addSignup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const {} = signupSlice.actions;
export default signupSlice.reducer;
