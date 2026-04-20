import { createSlice } from '@reduxjs/toolkit';

import type { NotificationState } from '~/types/notification';

const initialState: NotificationState = {
  list: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: { reset: () => initialState },
});

export const { reset } = notificationSlice.actions;
export default notificationSlice.reducer;
