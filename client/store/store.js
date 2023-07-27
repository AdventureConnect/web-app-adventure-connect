/**
 * importing configureStore to add redux store to react App
 * Chandler
 */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import matchReducer from "../features/matches/matchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    matches: matchReducer,
  },
});