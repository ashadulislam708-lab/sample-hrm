import { createSlice } from '@reduxjs/toolkit';

import type { LeaveState } from '~/types/leave';

const initialState: LeaveState = { list: [], balance: null, loading: false, error: null };

const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: { reset: () => initialState },
});

export const { reset } = leaveSlice.actions;
export default leaveSlice.reducer;
