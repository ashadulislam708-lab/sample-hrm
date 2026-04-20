import { createSlice } from '@reduxjs/toolkit';

import type { PolicyState } from '~/types/policy';

const initialState: PolicyState = { list: [], current: null, loading: false, error: null };

const policySlice = createSlice({
  name: 'policy',
  initialState,
  reducers: { reset: () => initialState },
});

export const { reset } = policySlice.actions;
export default policySlice.reducer;
