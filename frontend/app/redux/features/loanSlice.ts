import { createSlice } from '@reduxjs/toolkit';

import type { LoanState } from '~/types/loan';

const initialState: LoanState = { list: [], active: null, loading: false, error: null };

const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: { reset: () => initialState },
});

export const { reset } = loanSlice.actions;
export default loanSlice.reducer;
