import { configureStore } from "@reduxjs/toolkit";
import authRedcuer from "../features/auth/authSlice";
import personReducer from "../features/person/personSlice";

export const store = configureStore({
  reducer: {
    auth: authRedcuer,
    person: personReducer,
  },
});
