import { layout, prefix, route, type RouteConfigEntry } from '@react-router/dev/routes';

const adminRoutes: RouteConfigEntry[] = [
  ...prefix('admin', [
    layout('components/layouts/AdminLayout.tsx', [
      route('dashboard', 'pages/admin/Dashboard.tsx'),
      route('employees', 'pages/admin/EmployeeList.tsx'),
      route('employees/new', 'pages/admin/EmployeeCreate.tsx'),
      route('employees/:id', 'pages/admin/EmployeeDetail.tsx'),
      route('employees/:id/edit', 'pages/admin/EmployeeEdit.tsx'),
      route('attendance', 'pages/admin/AttendanceManagement.tsx'),
      route('leave', 'pages/admin/LeaveManagement.tsx'),
      route('leave/:id', 'pages/admin/LeaveRequestDetail.tsx'),
      route('leave/new', 'pages/admin/CreateLeaveRequest.tsx'),
      route('leave/emergency', 'pages/admin/EmergencyLeaveDashboard.tsx'),
      route('payroll', 'pages/admin/PayrollManagement.tsx'),
      route('payroll/salary-config', 'pages/admin/SalaryConfiguration.tsx'),
      route('bonuses', 'pages/admin/BonusManagement.tsx'),
      route('loans', 'pages/admin/LoanManagement.tsx'),
      route('loans/:id', 'pages/admin/LoanDetail.tsx'),
      route('performance', 'pages/admin/PerformanceAdmin.tsx'),
      route('recruitment', 'pages/admin/RecruitmentManagement.tsx'),
      route('recruitment/jobs/:id', 'pages/admin/JobPostingDetail.tsx'),
      route('recruitment/candidates/:id', 'pages/admin/CandidateDetail.tsx'),
      route('policies', 'pages/admin/PolicyManagement.tsx'),
      route('integrations', 'pages/admin/IntegrationSettings.tsx'),
      route('office-config', 'pages/admin/OfficeConfiguration.tsx'),
      route('reports', 'pages/admin/ReportsExport.tsx'),
    ]),
  ]),
];

export default adminRoutes;
