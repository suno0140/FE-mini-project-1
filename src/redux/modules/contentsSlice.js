import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const DB = process.env.React_APP_DBSERVER;

const initialState = {
  contents: [],
  isLoading: false,
  error: null,
  msg: "",

  content: {}
}

const axiosDB = axios.create({
  baseURL: "http://localhost:3001",
  headers: {}
})


export const __getContentsAll = createAsyncThunk(
  "contents/getAll",
  async (payload, thunkAPI) => {
    try {
      const data = await axiosDB.get("/contents");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getContent = createAsyncThunk(
  "content/get",
  async (payload, thunkAPI) => {
    try {
      const data = await axiosDB.get(`/contents/${payload.id}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }

)

export const __addContent = createAsyncThunk(
  "content/add",
  async (payload, thunkAPI) => {
    try {
      await axiosDB.post(`/contents`, payload);
      return thunkAPI.fulfillWithValue("success");
    } catch (error) {
      return thunkAPI.rejectWithValue("error");
    }
  }
);
export const __delContent = createAsyncThunk(
  "content/delete",
  async (payload, thunkAPI) => {
    try {

      await axiosDB.delete(`/contents/${payload.id}`)
      return thunkAPI.fulfillWithValue("success")

    } catch (error) {
      return thunkAPI.rejectWithValue("error")

    }
  }
)
export const __patchContent = createAsyncThunk(
  "content/patch",
  async (payload, thunkAPI) => {
    try {
      await axiosDB.patch(`/contents/${payload.id}`, payload.newContent)
      return thunkAPI.fulfillWithValue("success")
    } catch (error) {
      return thunkAPI.rejectWithValue("error")
    }
  }
)


export const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {
    setInitialError: (state, action) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // getcontents reducer
      .addCase(__getContentsAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getContentsAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contents = action.payload;
      })
      .addCase(__getContentsAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // getContent for DetailPage
      .addCase(__getContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.content = action.payload;
      })
      .addCase(__getContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // delContent
      .addCase(__delContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__delContent.fulfilled, (state, action) => {

        state.isLoading = false
        state.contents = state.contents.filter((v) => v.id !== action.payload)
        state.msg = "success"
      })
      .addCase(__delContent.rejected, (state, action) => {
        state.isLoading = false
        state.msg = "error"

      })

      // addContent
      .addCase(__addContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__addContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.msg = action.payload;
      })
      .addCase(__addContent.rejected, (state, action) => {

        state.isLoading = false
        state.msg = action.payload
      })

      // patchContent 
      .addCase(__patchContent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(__patchContent.fulfilled, (state, action) => {
        state.isLoading = false
        state.msg = action.payload
      })
      .addCase(__patchContent.rejected, (state, action) => {
        state.isLoading = false
        state.msg = action.payload
      })

  },
});

export const { setInitialError } = contentsSlice.actions;
export default contentsSlice.reducer;
