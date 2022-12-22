import { configureStore } from "@reduxjs/toolkit"

import contents from "../modules/contentsSlice"
import comments from "../modules/commentsSlice"

const store = configureStore({
  reducer: { contents: contents, comments: comments },
  devTools: process.env.NODE_ENV !== "production",
})

export default store
