// import axios from "axios";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { axiosDB } from "../../api/axiosAPI";

// const initialState = {
//   login: [],
//   isLoading: false,
//   error: null,
// };

// export const __loginRequest = createAsyncThunk(
//   "member/login",
//   async (payload, thunkAPI) => {
//     try {
//       const { data } = await axiosDB.post(`/api/members/login`, payload);
//       return thunkAPI.fulfillWithValue("success");
//     } catch (error) {
//       return thunkAPI.rejectWithValue("error");
//     }
//   }
// );

// const loginSlice = createSlice({
//   name: "login",
//   initialState,
//   reducers: {},
//   [__loginRequest.pending]: (state) => {
//     state.isLoading = true;
//   },
//   [__loginRequest.fulfilled]: (state, action) => {
//     state.isLoading = false;
//   },
//   [__loginRequest.rejected]: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
// });
// export const {} = loginSlice.actions;
// export default loginSlice.reducer;
