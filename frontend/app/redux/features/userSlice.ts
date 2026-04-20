import { createSlice } from '@reduxjs/toolkit';

import type { UserState } from '~/types/user';

const initialState: UserState = { list: [], loading: false, error: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
