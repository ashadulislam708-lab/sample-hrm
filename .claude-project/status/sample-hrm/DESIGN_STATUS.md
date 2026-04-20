# Design Status - sample-hrm

## Mode
MODE A — HTML prototypes provided at /HTML/

## Approval
approved: true
auto_approved: true
approved_by: developer (--skip-spec greenfield with pre-existing HTML)
approved_at: 2026-04-20

## HTML Inventory
- Total HTML files: 58
- Auth pages: 4 (including auth/index.html splash)
- Employee pages: 25
- Team pages: 7
- Admin pages: 22

## Design System
See .claude-project/design/DESIGN_SYSTEM.md

## HTML Structure Inventory
See .claude-project/docs/HTML_STRUCTURE_INVENTORY.md

## Page Coverage

| HTML File | Target React Route | Priority |
|-----------|-------------------|----------|
| HTML/index.html | (not ported — internal screens index) | skip |
| HTML/auth/index.html | / | P2 |
| HTML/auth/02-login.html | /login | P0 |
| HTML/auth/03-forgot-password.html | /forgot-password | P0 |
| HTML/auth/04-reset-password.html | /reset-password | P0 |
| HTML/employee/05-employee-dashboard.html | /employee/dashboard | P0 |
| HTML/employee/06-attendance-main.html | /employee/attendance | P0 |
| HTML/employee/07-attendance-history.html | /employee/attendance/history | P2 |
| HTML/employee/08-late-attendance-request.html | /employee/attendance/late-request | P1 |
| HTML/employee/09-leave-main.html | /employee/leave | P0 |
| HTML/employee/10-apply-leave.html | /employee/leave/apply | P0 |
| HTML/employee/11-apply-emergency-leave.html | /employee/leave/emergency | P1 |
| HTML/employee/12-salary-main.html | /employee/salary | P0 |
| HTML/employee/13-payslip-detail.html | /employee/salary/payslip/:id | P1 |
| HTML/employee/14-loans-main.html | /employee/loans | P0 |
| HTML/employee/15-apply-loan.html | /employee/loans/apply | P1 |
| HTML/employee/16-performance.html | /employee/performance | P0 |
| HTML/employee/17-policies.html | /employee/policies | P1 |
| HTML/employee/18-profile.html | /employee/profile | P0 |
| HTML/employee/39-leave-request-detail.html | /employee/leave/:id | P1 |
| HTML/employee/40-loan-detail.html | /employee/loans/:id | P1 |
| HTML/employee/41-attendance-detail.html | /employee/attendance/:date | P2 |
| HTML/employee/50-policy-detail.html | /employee/policies/:id | P1 |
| HTML/employee/51-goal-create-edit.html | /employee/performance/goals/new | P2 |
| HTML/employee/52-review-detail.html | /employee/performance/reviews/:id | P2 |
| HTML/employee/53-feedback-detail.html | /employee/performance/feedback/:id | P2 |
| HTML/employee/54-edit-profile.html | /employee/profile/edit | P1 |
| HTML/employee/55-change-password.html | /employee/profile/password | P1 |
| HTML/employee/56-notifications.html | /employee/notifications | P1 |
| HTML/employee/57-shift-change.html | /employee/shift-change | P2 |
| HTML/employee/58-salary-breakdown.html | /employee/salary/breakdown/:month | P2 |
| HTML/team/19-team-dashboard.html | /team/dashboard | P0 |
| HTML/team/20-team-approvals.html | /team/approvals | P0 |
| HTML/team/21-team-performance.html | /team/performance | P1 |
| HTML/team/22-team-reports.html | /team/reports | P1 |
| HTML/team/42-team-member-detail.html | /team/members/:id | P1 |
| HTML/team/43-approval-detail.html | /team/approvals/:id | P1 |
| HTML/team/44-add-member.html | /team/members/add | P2 |
| HTML/admin/23-admin-dashboard.html | /admin/dashboard | P0 |
| HTML/admin/24-employee-management-list.html | /admin/employees | P0 |
| HTML/admin/25-employee-create-edit.html | /admin/employees/new | P0 |
| HTML/admin/26-attendance-management.html | /admin/attendance | P0 |
| HTML/admin/27-leave-management-admin.html | /admin/leave | P0 |
| HTML/admin/28-emergency-leave-dashboard.html | /admin/leave/emergency | P1 |
| HTML/admin/29-payroll-management.html | /admin/payroll | P0 |
| HTML/admin/30-salary-configuration.html | /admin/salary-config | P1 |
| HTML/admin/31-bonus-management.html | /admin/bonuses | P1 |
| HTML/admin/32-loan-management.html | /admin/loans | P0 |
| HTML/admin/33-performance-admin.html | /admin/performance | P1 |
| HTML/admin/34-recruitment-management.html | /admin/recruitment | P1 |
| HTML/admin/35-policy-management.html | /admin/policies | P1 |
| HTML/admin/36-integration-settings.html | /admin/integrations | P2 |
| HTML/admin/37-office-configuration.html | /admin/office-config | P2 |
| HTML/admin/38-reports-export.html | /admin/reports | P1 |
| HTML/admin/44-employee-detail.html | /admin/employees/:id | P0 |
| HTML/admin/45-leave-request-detail.html | /admin/leave/:id | P1 |
| HTML/admin/46-loan-detail.html | /admin/loans/:id | P1 |
| HTML/admin/47-candidate-detail.html | /admin/recruitment/candidates/:id | P2 |
| HTML/admin/48-job-posting-detail.html | /admin/recruitment/postings/:id | P2 |
| HTML/admin/49-create-leave-request.html | /admin/leave/new | P2 |

## Routing Plan

### Auth routes (/)
- /login → HTML/auth/02-login.html
- /forgot-password → HTML/auth/03-forgot-password.html
- /reset-password → HTML/auth/04-reset-password.html
- / → HTML/auth/index.html (splash — redirect to /login if unauthenticated, role-home if authenticated)

### Employee routes (/employee/*)
- /employee/dashboard → HTML/employee/05-employee-dashboard.html
- /employee/attendance → HTML/employee/06-attendance-main.html
- /employee/attendance/history → HTML/employee/07-attendance-history.html
- /employee/attendance/late-request → HTML/employee/08-late-attendance-request.html
- /employee/attendance/:date → HTML/employee/41-attendance-detail.html
- /employee/leave → HTML/employee/09-leave-main.html
- /employee/leave/apply → HTML/employee/10-apply-leave.html
- /employee/leave/emergency → HTML/employee/11-apply-emergency-leave.html
- /employee/leave/:id → HTML/employee/39-leave-request-detail.html
- /employee/salary → HTML/employee/12-salary-main.html
- /employee/salary/payslip/:id → HTML/employee/13-payslip-detail.html
- /employee/salary/breakdown/:month → HTML/employee/58-salary-breakdown.html
- /employee/loans → HTML/employee/14-loans-main.html
- /employee/loans/apply → HTML/employee/15-apply-loan.html
- /employee/loans/:id → HTML/employee/40-loan-detail.html
- /employee/performance → HTML/employee/16-performance.html
- /employee/performance/goals/new → HTML/employee/51-goal-create-edit.html
- /employee/performance/reviews/:id → HTML/employee/52-review-detail.html
- /employee/performance/feedback/:id → HTML/employee/53-feedback-detail.html
- /employee/policies → HTML/employee/17-policies.html
- /employee/policies/:id → HTML/employee/50-policy-detail.html
- /employee/profile → HTML/employee/18-profile.html
- /employee/profile/edit → HTML/employee/54-edit-profile.html
- /employee/profile/password → HTML/employee/55-change-password.html
- /employee/notifications → HTML/employee/56-notifications.html
- /employee/shift-change → HTML/employee/57-shift-change.html

### Team Leader routes (/team/*)
- /team/dashboard → HTML/team/19-team-dashboard.html
- /team/approvals → HTML/team/20-team-approvals.html
- /team/approvals/:id → HTML/team/43-approval-detail.html
- /team/performance → HTML/team/21-team-performance.html
- /team/reports → HTML/team/22-team-reports.html
- /team/members/:id → HTML/team/42-team-member-detail.html
- /team/members/add → HTML/team/44-add-member.html

### Admin routes (/admin/*)
- /admin/dashboard → HTML/admin/23-admin-dashboard.html
- /admin/employees → HTML/admin/24-employee-management-list.html
- /admin/employees/new → HTML/admin/25-employee-create-edit.html
- /admin/employees/:id → HTML/admin/44-employee-detail.html
- /admin/attendance → HTML/admin/26-attendance-management.html
- /admin/leave → HTML/admin/27-leave-management-admin.html
- /admin/leave/new → HTML/admin/49-create-leave-request.html
- /admin/leave/emergency → HTML/admin/28-emergency-leave-dashboard.html
- /admin/leave/:id → HTML/admin/45-leave-request-detail.html
- /admin/payroll → HTML/admin/29-payroll-management.html
- /admin/salary-config → HTML/admin/30-salary-configuration.html
- /admin/bonuses → HTML/admin/31-bonus-management.html
- /admin/loans → HTML/admin/32-loan-management.html
- /admin/loans/:id → HTML/admin/46-loan-detail.html
- /admin/performance → HTML/admin/33-performance-admin.html
- /admin/recruitment → HTML/admin/34-recruitment-management.html
- /admin/recruitment/candidates/:id → HTML/admin/47-candidate-detail.html
- /admin/recruitment/postings/:id → HTML/admin/48-job-posting-detail.html
- /admin/policies → HTML/admin/35-policy-management.html
- /admin/integrations → HTML/admin/36-integration-settings.html
- /admin/office-config → HTML/admin/37-office-configuration.html
- /admin/reports → HTML/admin/38-reports-export.html

phase_complete: true
