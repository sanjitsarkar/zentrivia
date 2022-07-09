import { createSlice } from "@reduxjs/toolkit";
import {
  addReminder,
  deleteReminder,
  fetchAllReminder,
  sendReminder,
  updateReminder,
} from "../../services/reminder/reminderService";
import { initialState, notify } from "../../utils";

export const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    clearReminders: (state) => {
      state.data = [];
    },
    updateReminders: (state, action) => {
      state.data = state?.data?.filter(
        (reminder) => reminder._id !== action.payload?._id
      );
    },
    setReminderCreateStatusLoading: (state) => {
      state.reminderCreateStatus = "loading";
    },
    setReminderUpdateStatusLoading: (state) => {
      state.reminderUpdateStatus = "loading";
    },
  },
  extraReducers: {
    [fetchAllReminder.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllReminder.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.data = [...state?.data, ...action.payload?.reminders];
    },
    [fetchAllReminder.rejected]: (state, action) => {
      state.status = "failed";
      console.log(action.error);
      state.error = action.error;
    },

    [addReminder.pending]: (state) => {
      state.reminderCreateStatus = "loading";
    },
    [addReminder.fulfilled]: (state, action) => {
      state.reminderCreateStatus = "succeeded";

      state.data.unshift(action.payload?.reminder);

      notify("Reminder added successfully", "success");
    },
    [sendReminder.rejected]: (state, action) => {
      state.sendStatus = "failed";
      state.error = action.error;
    },
    [sendReminder.pending]: (state) => {
      state.sendStatus = "loading";
    },
    [sendReminder.fulfilled]: (state, action) => {
      state.sendStatus = "succeeded";
      notify("Reminder sent successfully", "success");
    },
    [addReminder.rejected]: (state, action) => {
      state.reminderCreateStatus = "failed";
      state.error = action.error;
    },
    [deleteReminder.pending]: (state) => {
      state.reminderDeleteStatus = "loading";
    },
    [deleteReminder.fulfilled]: (state, action) => {
      state.reminderDeleteStatus = "succeeded";
      state.data = state.data.filter(
        (reminder) => reminder?._id !== action.payload?.reminderId
      );

      notify("Reminder deleted successfully", "success");
    },
    [deleteReminder.rejected]: (state, action) => {
      state.reminderDeleteStatus = "failed";
      state.error = action.error;
    },
    [updateReminder.pending]: (state) => {
      state.reminderUpdateStatus = "loading";
    },
    [updateReminder.fulfilled]: (state, action) => {
      state.reminderUpdateStatus = "succeeded";
      state.data = state.data.map((reminder) => {
        if (reminder?._id === action.payload?.reminder._id) {
          return action.payload?.reminder;
        }
        return reminder;
      });
      notify("Reminder updated successfully", "success");
    },
    [updateReminder.rejected]: (state, action) => {
      state.reminderUpdateStatus = "failed";
      state.error = action.error;
    },
  },
});

export const {
  clearReminders,
  setReminderCreateStatusLoading,
  setReminderUpdateStatusLoading,
  updateReminders,
} = remindersSlice.actions;

export default remindersSlice.reducer;
