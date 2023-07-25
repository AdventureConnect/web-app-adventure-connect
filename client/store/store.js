/**
 * importing configureStore to add redux store to react App
 * Chandler
 */

import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "../features/auth/authSlice";
import matchReducer from "../features/matches/matchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    matches: matchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk,
    }),
});
