import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../../services/auth/authService";
import { notify } from "../../utils";

const initialState = {
  status: "idle",
  user: JSON.parse(localStorage?.getItem("user")) ?? null,
  isLoggedIn: JSON.parse(localStorage?.getItem("user")) || false,
  error: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      notify(`Goodbye, ${state.user.name}`, "success");
      state.status = "loggedOut";
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      state.user = null;
      state.error = null;
      state.isLoggedIn = false;
    },
    updateUser: (state, action) => {
      state.user = action.payload?.user;
      localStorage.setItem("user", JSON.stringify(action.payload?.user));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      notify(`Welcome, ${state?.user?.name}`);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
      notify(action.payload, "error");
    });
    builder.addCase(signup.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      notify(`Welcome, ${state?.user?.name}`);
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
      notify(action.payload, "error");
    });
  },
});

export const { logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
