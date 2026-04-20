import { createSlice } from '@reduxjs/toolkit';

import type { AttendanceState } from '~/types/attendance';

const initialState: AttendanceState = {
  today: null,
  history: [],
  summary: null,
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    reset: () => initialState,
  },
});

export const { reset } = attendanceSlice.actions;
export default attendanceSlice.reducer;
