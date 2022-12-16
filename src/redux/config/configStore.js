import { configureStore } from "@reduxjs/toolkit"

import contents from "../modules/contentsSlice"

const store = configureStore({
  reducer: { contents: contents },
  devTools: process.env.NODE_ENV !== "production",
})

export default store
