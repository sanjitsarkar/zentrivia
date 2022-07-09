import { createAsyncThunk } from "@reduxjs/toolkit";
import { callApi, formatError } from "../../utils";
export const addReminder = createAsyncThunk(
  "reminders/addReminder",
  async (reminder, {}) => {
    try {
      const { title, message, status } = reminder;
      let { sendTime } = reminder;
      sendTime = Date.parse(sendTime);

      const response = await callApi("post", "reminders", true, {
        title,
        message,
        sendTime,
        status,
      });
      return response.data;
    } catch (err) {
      return formatError(err);
    }
  }
);
export const updateReminder = createAsyncThunk(
  "reminders/updateReminder",
  async (reminder, {}) => {
    try {
      const { title, message, status } = reminder;
      let { sendTime } = reminder;
      sendTime = Date.parse(sendTime);
      const response = await callApi("put", "reminders/" + reminder._id, true, {
        title,
        message,
        sendTime,
        status,
      });
      return response.data;
    } catch (err) {
      return formatError(err);
    }
  }
);
export const deleteReminder = createAsyncThunk(
  "reminders/deleteReminder",
  async (id, {}) => {
    try {
      const response = await callApi("delete", "reminders/" + id, true);
      return response.data;
    } catch (err) {
      return formatError(err);
    }
  }
);
export const sendReminder = createAsyncThunk(
  "reminders/sendReminder",
  async (reminder, {}) => {
    try {
      const response = await callApi(
        "post",
        "reminders/" + reminder._id + "/send",
        true,
        {
          fromEmail: reminder.email,
          phoneNo: reminder.phoneNo,
        }
      );
      return response.data;
    } catch (err) {
      return formatError(err);
    }
  }
);
export const fetchAllReminder = createAsyncThunk(
  "reminders/fetchAllReminder",
  async () => {
    try {
      const response = await callApi("get", "reminders", true);
      return response.data;
    } catch (err) {
      return formatError(err);
    }
  }
);
