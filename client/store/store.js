/**
 * importing configureStore to add reduc store to react App
 * Chandler
 */

import { configureStore } from "@reduxjs/toolkit";
import matchReducer from "../features/matches/matches";

export const store = configureStore({
  reducer: {
    matches: matchReducer,
  },
});
