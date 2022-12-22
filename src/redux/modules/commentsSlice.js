import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import { axiosDB } from "../../api/axiosAPI";

import Swal from "sweetalert2";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
  msg: "",
};

export const __getComments = createAsyncThunk(
  "comments/getAll",
  async (payload, thunkAPI) => {
    try {
      const data = await axiosDB.get(`/comments?contentId=${payload}`);
      return thunkAPI.fulfillWithValue(data.header);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addComment = createAsyncThunk(
  "comment/add",
  async (payload, thunkAPI) => {
    try {
      await axiosDB.post(`/api/posts/${payload.contentId}/comments`, {content : payload.content});
      return thunkAPI.fulfillWithValue("success");
    } catch (error) {
      Swal.fire(
        '로그인 정보를 확인해주세요',
        '',
        'error'
      )
      return thunkAPI.rejectWithValue("error");
    }
  }
);
export const __delComment = createAsyncThunk(
  "comment/delete",
  async (payload, thunkAPI) => {
    try {
      const data = await axiosDB.delete(`/api/posts/comments/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      Swal.fire(
        '로그인 정보를 확인해주세요',
        '',
        'error'
      )      
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __patchComment = createAsyncThunk(
  "comment/patch",
  async (payload, thunkAPI) => {
    try {
      await axiosDB.put(
        `/api/posts/comments/${payload.commentId}`,
        payload.content
      );
      return thunkAPI.fulfillWithValue("success");
    } catch (error) {
      return thunkAPI.rejectWithValue("error");
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setInitialError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(__getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(__getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // delContent
      .addCase(__delComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__delComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = state.comments.filter((v) => v.id !== action.payload);
      })
      .addCase(__delComment.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setInitialError } = commentsSlice.actions;
export default commentsSlice.reducer;
