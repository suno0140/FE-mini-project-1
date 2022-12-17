import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
  msg: "",
}

const axiosDB = axios.create({
  baseURL: "http://localhost:3001",
  headers: {}
})

export const __getComments = createAsyncThunk(
  "comments/getAll",
  async (payload, thunkAPI) => {
    try {
      const data = await axiosDB.get(`/comments?contentId=${payload}`)
      return thunkAPI.fulfillWithValue(data.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const __addComment = createAsyncThunk(
  "comment/add",
  async (payload, thunkAPI) => {
    try {
      await axiosDB.post(`/comment`, payload)
      return thunkAPI.fulfillWithValue("success")
    } catch (error) {
      return thunkAPI.rejectWithValue("error")
    }
  }
)
export const __delContent = createAsyncThunk(
  "comment/delete",
  async (payload, thunkAPI) => {
    try {
      await axiosDB.delete(`/comments/${payload.id}`)
      return thunkAPI.fulfillWithValue("success")

    } catch (error) {
      return thunkAPI.rejectWithValue("error")

    }
  }
)
export const __patchContent = createAsyncThunk(
  "comment/patch",
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload)
      await axiosDB.patch(`/comments/${payload.id}`, payload.newContent)
      return thunkAPI.fulfillWithValue("success")
    } catch (error) {
      return thunkAPI.rejectWithValue("error")
    }
  }
)


export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setInitialError: (state, action) => {
      state.error = null
      console.log("setError", state.error)
    }
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(__getComments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(__getComments.fulfilled, (state, action) => {
        state.isLoading = false
        state.comments = action.payload
      })
      .addCase(__getComments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { setInitialError } = commentsSlice.actions;
export default commentsSlice.reducer;
