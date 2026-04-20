import { layout, prefix, route, type RouteConfigEntry } from '@react-router/dev/routes';

const employeeRoutes: RouteConfigEntry[] = [
  ...prefix('employee', [
    layout('components/layouts/EmployeeLayout.tsx', [
      route('dashboard', 'pages/employee/Dashboard.tsx'),
      route('attendance', 'pages/employee/AttendanceMain.tsx'),
      route('attendance/history', 'pages/employee/AttendanceHistory.tsx'),
      route('attendance/:id', 'pages/employee/AttendanceDetail.tsx'),
      route('attendance/late-request', 'pages/employee/LateAttendanceRequest.tsx'),
      route('leave', 'pages/employee/LeaveMain.tsx'),
      route('leave/apply', 'pages/employee/ApplyLeave.tsx'),
      route('leave/apply-emergency', 'pages/employee/ApplyEmergencyLeave.tsx'),
      route('leave/:id', 'pages/employee/LeaveRequestDetail.tsx'),
      route('salary', 'pages/employee/SalaryMain.tsx'),
      route('salary/breakdown', 'pages/employee/SalaryBreakdown.tsx'),
      route('salary/:id', 'pages/employee/PayslipDetail.tsx'),
      route('loans', 'pages/employee/LoansMain.tsx'),
      route('loans/apply', 'pages/employee/ApplyLoan.tsx'),
      route('loans/:id', 'pages/employee/LoanDetail.tsx'),
      route('performance', 'pages/employee/Performance.tsx'),
      route('performance/goal', 'pages/employee/GoalCreateEdit.tsx'),
      route('performance/review/:id', 'pages/employee/ReviewDetail.tsx'),
      route('performance/feedback/:id', 'pages/employee/FeedbackDetail.tsx'),
      route('policies', 'pages/employee/Policies.tsx'),
      route('policies/:slug', 'pages/employee/PolicyDetail.tsx'),
      route('profile', 'pages/employee/Profile.tsx'),
      route('profile/edit', 'pages/employee/EditProfile.tsx'),
      route('profile/change-password', 'pages/employee/ChangePassword.tsx'),
      route('profile/shift-change', 'pages/employee/ShiftChange.tsx'),
      route('notifications', 'pages/employee/Notifications.tsx'),
    ]),
  ]),
];

export default employeeRoutes;
