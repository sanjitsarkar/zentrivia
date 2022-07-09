import { configureStore } from "@reduxjs/toolkit";
import { authReducer, reminderReducer } from "../features";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    reminders: reminderReducer,
  },
});
