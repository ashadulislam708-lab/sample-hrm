import { createSlice } from '@reduxjs/toolkit';

import type { PayrollState } from '~/types/payroll';

const initialState: PayrollState = { payslips: [], runs: [], loading: false, error: null };

const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: { reset: () => initialState },
});

export const { reset } = payrollSlice.actions;
export default payrollSlice.reducer;
