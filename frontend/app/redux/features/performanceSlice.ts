import { createSlice } from '@reduxjs/toolkit';

import type { PerformanceState } from '~/types/performance';

const initialState: PerformanceState = {
  goals: [],
  dailyNotes: [],
  evaluations: [],
  reviews: [],
  loading: false,
  error: null,
};

const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: { reset: () => initialState },
});

export const { reset } = performanceSlice.actions;
export default performanceSlice.reducer;
