# PROJECT API — Potential HRM (sample-hrm)

Base URL: `http://localhost:3000/api`

Auth column values:
- `public` — no auth required
- `employee` — any authenticated role
- `team_leader` — team_leader or hr_admin
- `hr_admin` — hr_admin only

All list endpoints accept query params: `page`, `limit`, `search`, `sortBy`, `sortOrder`, plus module-specific filters (department, status, date range, etc.). Responses are wrapped in `ResponsePayloadDto { success, statusCode, message, data, timestamp, path }`.

---

## 1. Auth

| Method | Path                     | Summary                               | Request DTO               | Response DTO           | Auth     |
|--------|--------------------------|---------------------------------------|---------------------------|------------------------|----------|
| POST   | /auth/login              | Email + password login                | LoginDto                  | AuthUserDto            | public   |
| POST   | /auth/logout             | Clear auth cookies                    | -                         | MessageDto             | public   |
| POST   | /auth/forgot-password    | Send password reset email             | ForgotPasswordDto         | MessageDto             | public   |
| POST   | /auth/reset-password     | Reset password with token             | ResetPasswordDto          | MessageDto             | public   |
| POST   | /auth/refresh            | Rotate access + refresh tokens        | -                         | AuthUserDto            | public   |
| GET    | /auth/me                 | Current authenticated user profile    | -                         | AuthUserDto            | employee |
| POST   | /auth/change-password    | Change own password                   | ChangePasswordDto         | MessageDto             | employee |

---

## 2. Users / Employees

| Method | Path                          | Summary                                 | Request DTO         | Response DTO     | Auth       |
|--------|-------------------------------|-----------------------------------------|---------------------|------------------|------------|
| GET    | /users/me                     | Get own profile                          | -                   | UserDto          | employee   |
| PATCH  | /users/me                     | Update own profile                       | UpdateProfileDto    | UserDto          | employee   |
| POST   | /users/me/avatar              | Upload own avatar                        | multipart/form-data | UserDto          | employee   |
| GET    | /users/me/integrations        | Gather + Notion connection status        | -                   | IntegrationsDto  | employee   |
| GET    | /users                        | List all employees                       | -                   | UserListDto      | hr_admin   |
| POST   | /users                        | Create employee                          | CreateUserDto       | UserDto          | hr_admin   |
| GET    | /users/:id                    | Get employee detail                      | -                   | UserDto          | team_leader|
| PATCH  | /users/:id                    | Update employee                          | UpdateUserDto       | UserDto          | hr_admin   |
| DELETE | /users/:id                    | Soft-delete employee                     | -                   | MessageDto       | hr_admin   |
| POST   | /users/bulk-delete            | Bulk soft-delete                         | BulkIdsDto          | MessageDto       | hr_admin   |
| PATCH  | /users/:id/status             | Activate/deactivate employee             | UpdateStatusDto     | UserDto          | hr_admin   |
| GET    | /users/:id/leave-balance      | Leave balance (casual/sick remaining)    | -                   | LeaveBalanceDto  | team_leader|
| GET    | /users/:id/stats              | Quick stats for admin detail drawer      | -                   | UserStatsDto     | team_leader|

---

## 3. Attendance

| Method | Path                                     | Summary                                         | Request DTO                 | Response DTO            | Auth       |
|--------|------------------------------------------|-------------------------------------------------|-----------------------------|-------------------------|------------|
| POST   | /attendance/clock-in                     | Manual clock-in for current user                | ManualClockInDto            | AttendanceRecordDto     | employee   |
| GET    | /attendance/today                        | Current user's today record                     | -                           | AttendanceRecordDto     | employee   |
| GET    | /attendance/me                           | Current user's attendance history               | -                           | AttendancePageDto       | employee   |
| GET    | /attendance/me/calendar                  | Current user's month-calendar view              | -                           | AttendanceCalendarDto   | employee   |
| GET    | /attendance                              | List all attendance (admin)                     | -                           | AttendancePageDto       | hr_admin   |
| GET    | /attendance/summary                      | Totals for admin dashboard                      | -                           | AttendanceSummaryDto    | hr_admin   |
| GET    | /attendance/:id                          | Detail of an attendance record                  | -                           | AttendanceRecordDto     | employee   |
| PATCH  | /attendance/:id                          | Edit a record (admin override)                  | UpdateAttendanceDto         | AttendanceRecordDto     | hr_admin   |
| POST   | /attendance/export                       | Export filtered records (Excel/PDF)             | ExportAttendanceDto         | FileDto                 | hr_admin   |
| POST   | /attendance/webhooks/gather              | Gather Town ingress webhook                     | GatherEventDto              | MessageDto              | public     |
| POST   | /attendance/gather/sync                  | Trigger manual sync                             | -                           | MessageDto              | hr_admin   |

### Late Attendance Requests

| Method | Path                                     | Summary                                         | Request DTO                 | Response DTO            | Auth       |
|--------|------------------------------------------|-------------------------------------------------|-----------------------------|-------------------------|------------|
| POST   | /attendance/late-requests                | Submit late-attendance approval request         | CreateLateRequestDto        | LateRequestDto          | employee   |
| GET    | /attendance/late-requests/me             | Own late-attendance requests                    | -                           | LateRequestListDto      | employee   |
| GET    | /attendance/late-requests                | All late-attendance requests (team/admin)       | -                           | LateRequestListDto      | team_leader|
| GET    | /attendance/late-requests/:id            | Detail                                           | -                           | LateRequestDto          | employee   |
| POST   | /attendance/late-requests/:id/approve    | Approve                                          | ApprovalDto                 | LateRequestDto          | team_leader|
| POST   | /attendance/late-requests/:id/reject     | Reject                                           | ApprovalDto                 | LateRequestDto          | team_leader|
| DELETE | /attendance/late-requests/:id            | Cancel (own, while pending)                     | -                           | MessageDto              | employee   |

---

## 4. Leave

| Method | Path                                 | Summary                                      | Request DTO             | Response DTO            | Auth       |
|--------|--------------------------------------|----------------------------------------------|-------------------------|-------------------------|------------|
| POST   | /leave                               | Apply leave (casual/sick/half-day)           | CreateLeaveDto          | LeaveRequestDto         | employee   |
| GET    | /leave/me                            | Own leave history                             | -                       | LeavePageDto            | employee   |
| GET    | /leave/me/balance                    | Own leave balance (casual/sick)               | -                       | LeaveBalanceDto         | employee   |
| GET    | /leave                               | All leave requests (team/admin)              | -                       | LeavePageDto            | team_leader|
| GET    | /leave/:id                           | Leave request detail                          | -                       | LeaveRequestDto         | employee   |
| PATCH  | /leave/:id                           | Edit own pending leave                        | UpdateLeaveDto          | LeaveRequestDto         | employee   |
| POST   | /leave/:id/approve                   | Approve                                        | ApprovalDto             | LeaveRequestDto         | team_leader|
| POST   | /leave/:id/reject                    | Reject                                         | ApprovalDto             | LeaveRequestDto         | team_leader|
| POST   | /leave/:id/cancel                    | Cancel (own, pending or future approved)      | -                       | LeaveRequestDto         | employee   |
| POST   | /leave/export                        | Export filtered leave records                 | ExportLeaveDto          | FileDto                 | hr_admin   |

### Leave Policy Config (admin)

| Method | Path                      | Summary                                       | Request DTO             | Response DTO           | Auth       |
|--------|---------------------------|-----------------------------------------------|-------------------------|------------------------|------------|
| GET    | /leave/policy             | Get leave allocation policy                   | -                       | LeavePolicyDto         | hr_admin   |
| PUT    | /leave/policy             | Update leave allocation policy                | UpdateLeavePolicyDto    | LeavePolicyDto         | hr_admin   |

---

## 5. Emergency Leave

| Method | Path                                      | Summary                                     | Request DTO                | Response DTO              | Auth       |
|--------|-------------------------------------------|---------------------------------------------|----------------------------|---------------------------|------------|
| POST   | /emergency-leave                          | Apply emergency leave                        | CreateEmergencyLeaveDto    | EmergencyLeaveDto         | employee   |
| GET    | /emergency-leave/me                       | Own emergency leave history                  | -                          | EmergencyLeavePageDto     | employee   |
| GET    | /emergency-leave                          | All emergency leaves (team/admin)            | -                          | EmergencyLeavePageDto     | team_leader|
| GET    | /emergency-leave/active                   | Active emergency leaves (dashboard)          | -                          | EmergencyLeaveListDto     | hr_admin   |
| GET    | /emergency-leave/:id                      | Detail                                        | -                          | EmergencyLeaveDto         | employee   |
| POST   | /emergency-leave/:id/approve              | Approve                                       | ApprovalDto                | EmergencyLeaveDto         | team_leader|
| POST   | /emergency-leave/:id/reject               | Reject                                        | ApprovalDto                | EmergencyLeaveDto         | team_leader|
| POST   | /emergency-leave/:id/return               | Mark "Available" on return (posts to Slack)  | ReturnDto                  | EmergencyLeaveDto         | employee   |
| GET    | /emergency-leave/:id/slack-status         | Check Slack post delivery state              | -                          | SlackStatusDto            | team_leader|
| POST   | /emergency-leave/export                   | Export emergency-leave report                 | ExportDto                  | FileDto                   | hr_admin   |

---

## 6. Work Day Shift

| Method | Path                              | Summary                                   | Request DTO           | Response DTO         | Auth       |
|--------|-----------------------------------|-------------------------------------------|-----------------------|----------------------|------------|
| POST   | /shifts                           | Apply Work Day Shift (Fri-Sun)            | CreateShiftDto        | ShiftRequestDto      | employee   |
| GET    | /shifts/me                        | Own shift requests                         | -                     | ShiftPageDto         | employee   |
| GET    | /shifts                           | All shift requests (team/admin)           | -                     | ShiftPageDto         | team_leader|
| GET    | /shifts/:id                       | Detail                                     | -                     | ShiftRequestDto      | employee   |
| POST   | /shifts/:id/approve               | Approve                                    | ApprovalDto           | ShiftRequestDto      | team_leader|
| POST   | /shifts/:id/reject                | Reject                                     | ApprovalDto           | ShiftRequestDto      | team_leader|
| POST   | /shifts/:id/override              | HR override                                | OverrideDto           | ShiftRequestDto      | hr_admin   |
| DELETE | /shifts/:id                       | Cancel (own, pending)                      | -                     | MessageDto           | employee   |

---

## 7. Loans

| Method | Path                                       | Summary                                  | Request DTO            | Response DTO               | Auth       |
|--------|--------------------------------------------|------------------------------------------|------------------------|----------------------------|------------|
| POST   | /loans                                     | Apply for salary loan                    | CreateLoanDto          | LoanDto                    | employee   |
| GET    | /loans/me                                  | Own loan history                         | -                      | LoanPageDto                | employee   |
| GET    | /loans/me/active                           | Own active loan summary                  | -                      | ActiveLoanDto              | employee   |
| GET    | /loans                                     | All loan applications (admin)            | -                      | LoanPageDto                | hr_admin   |
| GET    | /loans/:id                                 | Loan detail                              | -                      | LoanDto                    | employee   |
| POST   | /loans/:id/approve                         | Approve + set repayment schedule         | ApproveLoanDto         | LoanDto                    | hr_admin   |
| POST   | /loans/:id/reject                          | Reject                                    | ApprovalDto            | LoanDto                    | hr_admin   |
| GET    | /loans/:id/repayments                      | Repayment schedule                        | -                      | RepaymentListDto           | employee   |
| POST   | /loans/:id/repayments/:repaymentId/mark    | Mark single installment paid             | MarkPaidDto            | RepaymentDto               | hr_admin   |
| GET    | /loans/policy                              | Loan policy (max amount, max period)     | -                      | LoanPolicyDto              | hr_admin   |
| PUT    | /loans/policy                              | Update loan policy                        | UpdateLoanPolicyDto    | LoanPolicyDto              | hr_admin   |
| POST   | /loans/export                              | Export loan report                        | ExportDto              | FileDto                    | hr_admin   |

---

## 8. Payroll

| Method | Path                                  | Summary                                       | Request DTO             | Response DTO           | Auth       |
|--------|---------------------------------------|-----------------------------------------------|-------------------------|------------------------|------------|
| POST   | /payroll/runs                         | Initiate payroll run for month/year            | CreatePayrollRunDto     | PayrollRunDto          | hr_admin   |
| GET    | /payroll/runs                         | List payroll runs                              | -                       | PayrollRunListDto      | hr_admin   |
| GET    | /payroll/runs/:id                     | Payroll run detail + items                     | -                       | PayrollRunDetailDto    | hr_admin   |
| POST   | /payroll/runs/:id/approve             | Approve and finalize                           | -                       | PayrollRunDto          | hr_admin   |
| POST   | /payroll/runs/:id/regenerate          | Recalculate items                              | -                       | PayrollRunDto          | hr_admin   |
| GET    | /payroll/runs/:id/bank-file           | Download bank-file (.xlsx/.csv)                | -                       | FileDto                | hr_admin   |
| POST   | /payroll/runs/:id/export              | Export full payroll report                     | ExportDto               | FileDto                | hr_admin   |
| GET    | /payroll/items                        | List payroll items (admin view)                | -                       | PayrollItemListDto     | hr_admin   |
| GET    | /payroll/items/:id                    | Payslip detail                                 | -                       | PayrollItemDto         | employee   |
| GET    | /payroll/items/:id/pdf                | Payslip PDF                                    | -                       | FileDto                | employee   |
| GET    | /payroll/me                           | Own payslip history                            | -                       | PayrollItemListDto     | employee   |
| GET    | /payroll/me/current                   | Current-month summary                          | -                       | PayslipSummaryDto      | employee   |
| GET    | /payroll/salary-config                | Salary components + grades                     | -                       | SalaryConfigDto        | hr_admin   |
| PUT    | /payroll/salary-config                | Update salary components                       | UpdateSalaryConfigDto   | SalaryConfigDto        | hr_admin   |

---

## 9. Bonuses

| Method | Path                     | Summary                                         | Request DTO           | Response DTO        | Auth       |
|--------|--------------------------|-------------------------------------------------|-----------------------|---------------------|------------|
| GET    | /bonuses                 | Bonus history (admin)                            | -                     | BonusPageDto        | hr_admin   |
| POST   | /bonuses                 | Create bonus (project or festival)               | CreateBonusDto        | BonusDto            | hr_admin   |
| POST   | /bonuses/distribute      | Distribute bonus to selected employees           | DistributeBonusDto    | BonusListDto        | hr_admin   |
| GET    | /bonuses/:id             | Detail                                            | -                     | BonusDto            | hr_admin   |
| DELETE | /bonuses/:id             | Delete unissued bonus                            | -                     | MessageDto          | hr_admin   |
| GET    | /bonuses/me              | Employee's own bonus history                     | -                     | BonusListDto        | employee   |

---

## 10. Performance

### Goals

| Method | Path                       | Summary                           | Request DTO       | Response DTO         | Auth       |
|--------|----------------------------|-----------------------------------|-------------------|----------------------|------------|
| GET    | /goals/me                  | Own goals                          | -                 | GoalListDto          | employee   |
| PATCH  | /goals/:id/progress        | Update own progress                | UpdateProgressDto | GoalDto              | employee   |
| POST   | /goals                     | Assign goal to member              | CreateGoalDto     | GoalDto              | team_leader|
| GET    | /goals                     | List goals (team/admin)            | -                 | GoalPageDto          | team_leader|
| GET    | /goals/:id                 | Detail                             | -                 | GoalDto              | employee   |
| PATCH  | /goals/:id                 | Edit                                | UpdateGoalDto     | GoalDto              | team_leader|
| DELETE | /goals/:id                 | Delete                              | -                 | MessageDto           | team_leader|

### Daily Notes (Notion)

| Method | Path                           | Summary                              | Request DTO       | Response DTO         | Auth       |
|--------|--------------------------------|--------------------------------------|-------------------|----------------------|------------|
| GET    | /daily-notes/me                | Own daily-note stream                 | -                 | DailyNoteListDto     | employee   |
| GET    | /daily-notes/me/summary        | Own submission summary + streak       | -                 | NoteSummaryDto       | employee   |
| GET    | /daily-notes                   | Team/org daily notes                  | -                 | DailyNotePageDto     | team_leader|
| POST   | /daily-notes/sync              | Trigger Notion sync                   | -                 | MessageDto           | hr_admin   |
| POST   | /daily-notes/export            | Submission frequency report           | ExportDto         | FileDto              | hr_admin   |

### PM Evaluation

| Method | Path                               | Summary                                 | Request DTO             | Response DTO           | Auth       |
|--------|------------------------------------|-----------------------------------------|-------------------------|------------------------|------------|
| POST   | /evaluations                       | Create PM evaluation (per member)       | CreateEvaluationDto     | EvaluationDto          | team_leader|
| GET    | /evaluations/me                    | Own evaluations                          | -                       | EvaluationListDto      | employee   |
| GET    | /evaluations                       | List (team/admin)                        | -                       | EvaluationPageDto      | team_leader|
| GET    | /evaluations/:id                   | Detail                                    | -                       | EvaluationDto          | employee   |
| PATCH  | /evaluations/:id                   | Edit                                      | UpdateEvaluationDto     | EvaluationDto          | team_leader|

### Reviews & Self-Assessment

| Method | Path                                     | Summary                                 | Request DTO               | Response DTO       | Auth       |
|--------|------------------------------------------|-----------------------------------------|---------------------------|--------------------|------------|
| GET    | /reviews/me                              | Own review records                       | -                         | ReviewListDto      | employee   |
| GET    | /reviews                                 | Review cycles (admin)                    | -                         | ReviewCycleListDto | hr_admin   |
| POST   | /reviews/cycles                          | Create review cycle                      | CreateCycleDto            | ReviewCycleDto     | hr_admin   |
| PATCH  | /reviews/cycles/:id                      | Edit cycle                                | UpdateCycleDto            | ReviewCycleDto     | hr_admin   |
| POST   | /reviews/:id/self-assessment             | Submit self-assessment                    | SelfAssessmentDto         | ReviewDto          | employee   |
| GET    | /reviews/:id                             | Review detail                             | -                         | ReviewDto          | employee   |
| POST   | /reviews/:id/finalize                    | Finalize review                           | FinalizeReviewDto         | ReviewDto          | team_leader|
| POST   | /reviews/export                          | Performance report                        | ExportDto                 | FileDto            | hr_admin   |

---

## 11. Policies

| Method | Path                             | Summary                                    | Request DTO           | Response DTO       | Auth      |
|--------|----------------------------------|--------------------------------------------|-----------------------|--------------------|-----------|
| GET    | /policies                        | List (employee-visible, published)          | -                     | PolicyListDto      | employee  |
| GET    | /policies/:id                    | Policy detail                               | -                     | PolicyDto          | employee  |
| POST   | /policies/:id/acknowledge        | Acknowledge policy                          | -                     | MessageDto         | employee  |
| GET    | /policies/me/acknowledgments     | Own acknowledgments                         | -                     | AckListDto         | employee  |
| GET    | /admin/policies                  | All policies (admin view)                   | -                     | PolicyPageDto      | hr_admin  |
| POST   | /admin/policies                  | Create policy                               | CreatePolicyDto       | PolicyDto          | hr_admin  |
| PATCH  | /admin/policies/:id              | Edit policy                                 | UpdatePolicyDto       | PolicyDto          | hr_admin  |
| POST   | /admin/policies/:id/publish      | Publish draft                               | -                     | PolicyDto          | hr_admin  |
| POST   | /admin/policies/:id/archive      | Archive policy                              | -                     | PolicyDto          | hr_admin  |
| DELETE | /admin/policies/:id              | Soft-delete                                  | -                     | MessageDto         | hr_admin  |
| GET    | /admin/policies/:id/acknowledgments | Acknowledgment status per user           | -                     | AckPageDto         | hr_admin  |
| POST   | /admin/policies/:id/reminders    | Send reminder email to pending users         | -                     | MessageDto         | hr_admin  |

---

## 12. Recruitment

### Job Postings

| Method | Path                                 | Summary                            | Request DTO              | Response DTO        | Auth      |
|--------|--------------------------------------|------------------------------------|--------------------------|---------------------|-----------|
| GET    | /jobs                                | List job postings                   | -                        | JobPageDto          | hr_admin  |
| POST   | /jobs                                | Create job posting                  | CreateJobDto             | JobDto              | hr_admin  |
| GET    | /jobs/:id                            | Detail                               | -                        | JobDto              | hr_admin  |
| PATCH  | /jobs/:id                            | Edit                                 | UpdateJobDto             | JobDto              | hr_admin  |
| POST   | /jobs/:id/close                      | Close posting                        | -                        | JobDto              | hr_admin  |
| DELETE | /jobs/:id                            | Delete                               | -                        | MessageDto          | hr_admin  |

### Applications

| Method | Path                                  | Summary                              | Request DTO           | Response DTO            | Auth      |
|--------|---------------------------------------|--------------------------------------|-----------------------|-------------------------|-----------|
| GET    | /jobs/:id/applications                | Applications for job                  | -                     | ApplicationPageDto      | hr_admin  |
| GET    | /applications/:id                     | Application detail                     | -                     | ApplicationDto          | hr_admin  |
| POST   | /applications/:id/shortlist           | Shortlist candidate                    | -                     | ApplicationDto          | hr_admin  |
| POST   | /applications/:id/schedule-interview  | Schedule interview                     | ScheduleInterviewDto  | ApplicationDto          | hr_admin  |
| POST   | /applications/:id/reject              | Reject candidate                        | RejectDto             | ApplicationDto          | hr_admin  |
| POST   | /applications/:id/onboard             | Convert candidate to employee          | OnboardCandidateDto   | UserDto                 | hr_admin  |

---

## 13. Office Configuration

| Method | Path                         | Summary                              | Request DTO          | Response DTO       | Auth      |
|--------|------------------------------|--------------------------------------|----------------------|--------------------|-----------|
| GET    | /office-config               | Current office configuration          | -                    | OfficeConfigDto    | employee  |
| PUT    | /office-config               | Update office configuration           | UpdateOfficeConfigDto| OfficeConfigDto    | hr_admin  |
| POST   | /office-config/reset         | Reset to defaults                     | -                    | OfficeConfigDto    | hr_admin  |
| GET    | /office-config/history       | Change history (audit)                | -                    | OfficeHistoryDto   | hr_admin  |

---

## 14. Module Management

| Method | Path                           | Summary                              | Request DTO           | Response DTO        | Auth      |
|--------|--------------------------------|--------------------------------------|-----------------------|---------------------|-----------|
| GET    | /modules                       | List active modules for current user  | -                     | ModuleListDto       | employee  |
| GET    | /admin/modules                 | All modules (admin)                    | -                     | ModulePageDto       | hr_admin  |
| POST   | /admin/modules                 | Create custom module                   | CreateModuleDto       | ModuleDto           | hr_admin  |
| GET    | /admin/modules/:id             | Detail                                  | -                     | ModuleDto           | hr_admin  |
| PATCH  | /admin/modules/:id             | Edit                                    | UpdateModuleDto       | ModuleDto           | hr_admin  |
| POST   | /admin/modules/:id/toggle      | Enable/disable                          | ToggleModuleDto       | ModuleDto           | hr_admin  |
| DELETE | /admin/modules/:id             | Delete (custom only)                   | -                     | MessageDto          | hr_admin  |

---

## 15. Integration Settings

| Method | Path                                   | Summary                           | Request DTO           | Response DTO         | Auth      |
|--------|----------------------------------------|-----------------------------------|-----------------------|----------------------|-----------|
| GET    | /integrations                          | All integration settings          | -                     | IntegrationListDto   | hr_admin  |
| GET    | /integrations/gather                   | Gather settings                    | -                     | GatherConfigDto      | hr_admin  |
| PUT    | /integrations/gather                   | Update Gather settings             | UpdateGatherDto       | GatherConfigDto      | hr_admin  |
| POST   | /integrations/gather/test              | Test Gather connection             | -                     | ConnectionTestDto    | hr_admin  |
| GET    | /integrations/notion                   | Notion settings                     | -                     | NotionConfigDto      | hr_admin  |
| PUT    | /integrations/notion                   | Update Notion settings              | UpdateNotionDto       | NotionConfigDto      | hr_admin  |
| POST   | /integrations/notion/test              | Test Notion connection              | -                     | ConnectionTestDto    | hr_admin  |
| GET    | /integrations/slack                    | Slack settings                       | -                     | SlackConfigDto       | hr_admin  |
| PUT    | /integrations/slack                    | Update Slack settings                | UpdateSlackDto        | SlackConfigDto       | hr_admin  |
| POST   | /integrations/slack/test               | Send test message                    | -                     | ConnectionTestDto    | hr_admin  |

---

## 16. Reports & Export

| Method | Path                           | Summary                                   | Request DTO     | Response DTO    | Auth      |
|--------|--------------------------------|-------------------------------------------|-----------------|-----------------|-----------|
| POST   | /reports/attendance            | Attendance report (Excel/PDF)             | ReportDto       | FileDto         | hr_admin  |
| POST   | /reports/leave                 | Leave report                               | ReportDto       | FileDto         | hr_admin  |
| POST   | /reports/emergency-leave       | Emergency-leave report (Slack status)      | ReportDto       | FileDto         | hr_admin  |
| POST   | /reports/payroll               | Payroll report                              | ReportDto       | FileDto         | hr_admin  |
| POST   | /reports/loan                  | Loan report                                 | ReportDto       | FileDto         | hr_admin  |
| POST   | /reports/performance           | Performance report                          | ReportDto       | FileDto         | hr_admin  |
| POST   | /reports/daily-notes           | Daily notes submission report               | ReportDto       | FileDto         | hr_admin  |
| POST   | /reports/headcount             | Headcount by department                     | ReportDto       | FileDto         | hr_admin  |
| POST   | /reports/employee-directory    | Employee directory                           | ReportDto       | FileDto         | hr_admin  |

---

## 17. Team Leader endpoints

| Method | Path                                | Summary                                       | Request DTO      | Response DTO          | Auth        |
|--------|-------------------------------------|-----------------------------------------------|------------------|-----------------------|-------------|
| GET    | /team/dashboard                     | Team dashboard aggregate                       | -                | TeamDashboardDto      | team_leader |
| GET    | /team/members                       | Team member list (with presence)               | -                | TeamMemberListDto     | team_leader |
| GET    | /team/members/:id                   | Team member detail                             | -                | TeamMemberDto         | team_leader |
| POST   | /team/members                       | Add member to team (HR action)                 | AddMemberDto     | TeamMemberDto         | hr_admin    |
| DELETE | /team/members/:id                   | Remove from team                                | -                | MessageDto            | hr_admin    |
| GET    | /team/approvals                     | Pending approvals aggregate                     | -                | ApprovalQueueDto      | team_leader |
| GET    | /team/approvals/history             | Historical approvals                            | -                | ApprovalHistoryDto    | team_leader |
| GET    | /team/performance                   | Team performance overview                       | -                | TeamPerformanceDto    | team_leader |
| GET    | /team/reports/attendance            | Team attendance report                          | -                | FileDto               | team_leader |
| GET    | /team/reports/leave                 | Team leave summary                              | -                | FileDto               | team_leader |
| GET    | /team/reports/performance           | Team performance report                         | -                | FileDto               | team_leader |
| GET    | /team/reports/daily-notes           | Team daily-note completion                      | -                | FileDto               | team_leader |

---

## 18. Admin Dashboard (aggregate)

| Method | Path                                  | Summary                                      | Request DTO   | Response DTO          | Auth     |
|--------|---------------------------------------|----------------------------------------------|---------------|-----------------------|----------|
| GET    | /admin/dashboard                       | Dashboard KPIs + charts                       | -             | AdminDashboardDto     | hr_admin |
| GET    | /admin/dashboard/activity              | Recent activity feed                           | -             | ActivityFeedDto       | hr_admin |
| GET    | /admin/dashboard/attendance-trend      | Chart data — attendance trend                  | -             | ChartDto              | hr_admin |
| GET    | /admin/dashboard/leave-utilization     | Chart data — leave utilization                  | -             | ChartDto              | hr_admin |
| GET    | /admin/dashboard/headcount-by-dept     | Chart data — department headcount               | -             | ChartDto              | hr_admin |
| GET    | /admin/dashboard/attendance-sources    | Chart data — Gather vs Manual                   | -             | ChartDto              | hr_admin |

---

## 19. Notifications

| Method | Path                              | Summary                           | Request DTO        | Response DTO          | Auth      |
|--------|-----------------------------------|-----------------------------------|--------------------|-----------------------|-----------|
| GET    | /notifications/me                 | Current user's notifications       | -                  | NotificationPageDto   | employee  |
| PATCH  | /notifications/:id/read           | Mark one as read                   | -                  | NotificationDto       | employee  |
| POST   | /notifications/read-all           | Mark all as read                   | -                  | MessageDto            | employee  |
| DELETE | /notifications/:id                | Delete notification                 | -                  | MessageDto            | employee  |
| GET    | /notifications/preferences        | Get preferences                    | -                  | NotifPrefsDto         | employee  |
| PUT    | /notifications/preferences        | Update preferences                  | UpdateNotifPrefsDto| NotifPrefsDto         | employee  |

---

## 20. Departments (lookup)

| Method | Path                       | Summary                     | Request DTO       | Response DTO        | Auth      |
|--------|----------------------------|-----------------------------|-------------------|---------------------|-----------|
| GET    | /departments               | List departments             | -                 | DepartmentListDto   | employee  |
| POST   | /departments               | Create                       | CreateDeptDto     | DepartmentDto       | hr_admin  |
| PATCH  | /departments/:id           | Edit                         | UpdateDeptDto     | DepartmentDto       | hr_admin  |
| DELETE | /departments/:id           | Delete                       | -                 | MessageDto          | hr_admin  |

---

## 21. Common conventions

- IDs: all path `:id` values are UUIDs.
- Pagination: `?page=1&limit=25`; response: `{ data: [...], total, page, limit, totalPages }`.
- Date format: ISO-8601 (`2026-04-20T08:05:00Z`).
- Errors: `{ success: false, statusCode: 400 | 401 | 403 | 404 | 409 | 422 | 500, message, errors?: [] }`.
- File responses: `{ url, filename, mimeType, expiresAt }` (presigned S3 URL) or binary stream on download endpoints.
- Export endpoints: body `{ format: 'xlsx' | 'pdf', from, to, filters }`.

---

## Endpoint count

Approx. 165 endpoints across 20 modules.
