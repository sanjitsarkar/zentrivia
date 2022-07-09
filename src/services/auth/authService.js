import { createAsyncThunk } from "@reduxjs/toolkit";
import { callApi, formatError } from "../../utils";
export const login = createAsyncThunk(
  "auth/login",
  async (loginCred, { rejectWithValue }) => {
    try {
      const { email, password } = loginCred;
      const response = await callApi("post", "auth/login", false, {
        email,
        password,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(formatError(err));
    }
  }
);
export const signup = createAsyncThunk(
  "auth/signup",
  async (signupCred, { rejectWithValue }) => {
    try {
      const { name, email, password, phoneNo } = signupCred;
      const response = await callApi("post", "auth/signup", false, {
        name,
        email,
        password,
        phoneNo,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(formatError(err));
    }
  }
);

export const getProfileInfo = createAsyncThunk(
  "auth/getProfileInfo",
  async (id) => {
    const response = await callApi("get", `user/profile/${id}`, true);
    return response.data;
  }
);
export const updateProfileInfo = createAsyncThunk(
  "auth/updateProfileInfo",
  async (profileInfo) => {
    const response = await callApi(
      "put",
      `user/profile/${profileInfo.id}`,
      true,
      profileInfo
    );
    return response.data;
  }
);
