import { createSlice } from "@reduxjs/toolkit";

const toolkitSliceNotification = createSlice({
  name: "Notifications",
  initialState: {
    notifications: true,
  },
  reducers: {
    setNotifications(state) {
      state.notifications = !state.notifications;
    },
  },
});

export default toolkitSliceNotification.reducer;
export const { setNotifications } = toolkitSliceNotification.actions;
