import { combineReducers } from '@reduxjs/toolkit';

import attendanceReducer from '../features/attendanceSlice';
import authReducer from '../features/authSlice';
import leaveReducer from '../features/leaveSlice';
import loanReducer from '../features/loanSlice';
import notificationReducer from '../features/notificationSlice';
import payrollReducer from '../features/payrollSlice';
import performanceReducer from '../features/performanceSlice';
import policyReducer from '../features/policySlice';
import userReducer from '../features/userSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  attendance: attendanceReducer,
  leave: leaveReducer,
  loan: loanReducer,
  payroll: payrollReducer,
  performance: performanceReducer,
  policy: policyReducer,
  notification: notificationReducer,
});
