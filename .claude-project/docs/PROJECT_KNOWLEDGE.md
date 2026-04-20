# PROJECT KNOWLEDGE — Potential HRM Software (sample-hrm)

Version: 1.1 (PRD dated 2025-01-22)

---

## 1. Overview

Potential HRM is a comprehensive Human Resource Management System built for Potential AI. It manages the full employee lifecycle — attendance (auto via Gather Town + manual fallback), leave (casual / sick / half-day / emergency with Slack notifications), payroll with loan deductions and bonuses, performance tracking driven by Notion daily notes and PM project evaluations, recruitment, and fully configurable office policy settings. The system exposes self-service for employees, team-management tooling for team leaders, and full operational control for HR admins. The architecture is intentionally generic and extensible via a Module Management layer so new HR modules can be added without touching core code.

---

## 2. User Roles

| Role slug      | Description                                                                                   | Home route            | Key permissions |
|----------------|-----------------------------------------------------------------------------------------------|-----------------------|-----------------|
| `employee`     | Regular staff member. Uses self-service HR (clock-in, leave, loan, payslip, performance).     | `/employee/dashboard` | Manage own attendance, leave, loan, profile, policies, self-assessment, goals progress |
| `team_leader`  | Inherits all employee abilities. Manages a team and approves team requests.                   | `/team/dashboard`     | Approve/reject team leave, late attendance, shift requests, set goals, PM evaluate, view team reports |
| `hr_admin`     | HR personnel with full system access. Configures policies, integrations, office settings.    | `/admin/dashboard`    | Full CRUD across all modules, payroll processing, bonus distribution, loan approval, recruitment, integration settings, module management |

Relationships:
- Employee → Team Leader: N:1
- Team Leader → HR Admin: N:1
- HR Admin → All users: 1:N

---

## 3. Features (by module)

### Module 1 — Attendance (Gather + Manual)

- **Automatic (Gather Town)**: System polls Gather API; when employee joins virtual office, timestamp is captured as clock-in. If after `office_start + grace_period`, flagged as `late` and auto-creates a late-approval request.
- **Manual clock-in**: Employee clicks "Manual Clock-In" and provides a reason. Same late-threshold logic applies.
- **Grace period**: Default 10 minutes after office start time. Configurable by HR Admin.
- **Late Attendance Request**: Employees submit reason; Team Leader or HR Admin approves/rejects.
- **Attendance history**: Calendar + list view, filter by month/date range, source (Gather/Manual), status (On Time / Late / Absent).

### Module 2 — Leave Request

- Leave types: `casual`, `sick`, `half_day` (2nd half only, requires core-hours completion).
- Apply leave: select type, single date or range, reason.
- Validates leave balance before submission.
- Team Leader approval workflow; employee notified on decision.
- Cancel-request allowed while status = `pending`.

### Module 3 — Emergency Leave (with Slack)

- Employee submits: reason, **estimated return time** (required), contact availability (optional).
- Upon submit: posts to configured Slack channel with employee name, reason, ETA via webhook.
- When employee returns: marks status "Available"; system posts update to same Slack thread.
- Team Leader approves/rejects like normal leave; Emergency leave is highlighted in all approval lists.

### Module 4 — Work Day Shift

- Alternative shift (default Fri–Sun) request flow for employees needing non-standard schedule.
- Employee submits reason; Team Leader approves; HR Admin can override.
- Approved shift is applied to employee's attendance schedule.

### Module 5 — Salary Loan

- Employee applies with amount + reason. System validates against max-loan policy.
- HR Admin approves/rejects. On approval, repayment schedule created (monthly installments).
- Monthly deductions begin from next payroll run. Employee sees outstanding balance on Loans tab.

### Module 6 — Payroll Processing

- HR Admin initiates monthly payroll (month/year).
- System computes: basic salary, allowances, attendance-based deductions, loan installments, bonus additions.
- Admin reviews → approves → generates bank file and payslip PDFs.
- Employee can download payslip from Salary tab.

### Module 7 — Performance Measurement

Three integrated tools, aggregated into a unified performance score per employee:

1. **Daily Notes (Notion integration)**: Notes fetched per employee by date; tracked for task completion, blockers, learning. Streaks + frequency feed the performance score.
2. **PM Project Evaluation**: After project completion, PM rates each team member on Quality, Timeliness, Collaboration, Problem-solving, Communication (1–5 scale default).
3. **Custom Modules (extensible)**: HR Admin configures additional performance inputs — API data source, metrics, weighting. Aggregated into combined dashboard.

### Employee self-service (additional)

- **Dashboard**: Leave balance, month's attendance, pending-requests count, active-loan balance, quick-action buttons, recent activity, notifications.
- **Profile**: Personal info + photo, integration status (Gather, Notion), change password, notification preferences.
- **Policies**: Read + acknowledge company policies. List of 12 policies (Leave Mgmt, Client Interaction, Device Usage, Bonus, Core Hours, Dual Job, Salary Increment, Conduct, Client Meeting Attendance, Office Hours, Emergency Leave, Performance Measurement).
- **Notifications**: Policy updates, approval/rejection notifications, performance review reminders.

### Team Leader features

- **Team Dashboard**: Team member count, today's attendance with Gather status, pending approvals, team list with presence indicators.
- **Team Approvals**: Pending leave, emergency leave (highlighted), late attendance, and shift requests. Each with Approve/Reject + comment. Approval history.
- **Team Performance**: Set goals for members, review progress, view team's daily notes, conduct PM evaluations, provide feedback.
- **Team Reports**: Team attendance (including Gather breakdown), leave summary, performance overview, daily note completion.

### HR Admin features

- **Admin Dashboard**: Total employees, today's attendance (Gather + Manual), pending approvals, active loans, monthly payroll total, active emergency leaves. Charts (attendance trend, leave utilization, department headcount, attendance source breakdown). Recent activity feed.
- **Employee Management**: List + search + filter + bulk actions. Create employee (full info + Gather email + Notion user id). Detail drawer with employment details, salary, leave balance, stats, integration status.
- **Attendance Management**: List with source column (Gather/Manual), late-approval queue, summary stats, bulk export.
- **Leave Management**: All leave requests, emergency dashboard with Slack status, leave-policy config (allocations, carry-forward, half-day, emergency settings).
- **Payroll Management**: Monthly payroll generation, review, approval, bank-file export, salary config (components, allowances, grades).
- **Bonus Management**: Project-based + Festival bonus processing. Select employees → amount → immediate or add to payroll.
- **Loan Management**: Pending applications, approve/reject, set repayment terms, active loans tracking, loan policy config.
- **Performance Management**: Review cycles, goal templates, Notion daily-note tracking, PM evaluation view, combined performance reports.
- **Recruitment**: Job postings (create/active/closed), applications per job (shortlist, schedule interview), onboarding checklist (candidate → employee).
- **Policy Management**: Create/edit policies (rich text), publish/draft, acknowledgment tracking, send reminders.
- **Integration Settings**: Configure Gather Town, Notion, Slack webhook; create + configure Custom Modules.
- **Office Configuration**: Edit office start/end time, core working hours, grace period, work days, weekend, alt-shift days. Save / reset / view change history.
- **Module Management**: Enable/disable active modules, create custom modules (name, menu placement, data source, permissions).
- **Reports & Export**: Attendance, leave, payroll, employee directory, loan, performance, headcount, daily-notes, emergency-leave — all exportable to Excel or PDF.

---

## 4. Integrations

| Integration    | Purpose                                          | Type     | Key config                                   |
|----------------|--------------------------------------------------|----------|----------------------------------------------|
| Gather Town    | Automatic attendance via presence detection      | API      | `GATHER_API_KEY`, `GATHER_SPACE_ID`, sync frequency |
| Notion         | Daily-note tracking for performance              | API      | `NOTION_API_TOKEN`, `NOTION_DATABASE_ID`, per-user Notion User ID |
| Slack          | Emergency-leave notifications + thread updates   | Webhook  | `SLACK_WEBHOOK_URL`, `SLACK_EMERGENCY_CHANNEL` |
| Custom Modules | Extensible performance inputs                    | REST     | Per-module URL, auth header, metric schema, weight |

All integrations include a "Test connection" action on the Admin → Integration Settings page.

---

## 5. Backend Environment Variables

| Variable                        | Example                                   | Purpose |
|---------------------------------|-------------------------------------------|---------|
| `NODE_ENV`                      | `development` / `production` / `test`     | Runtime mode |
| `PORT`                          | `3000`                                    | API server port |
| `CORS_ORIGIN`                   | `http://localhost:5173`                   | Allowed frontend origin(s) |
| `DATABASE_URL`                  | `postgres://user:pass@host:5432/hrm`      | PostgreSQL connection string |
| `DATABASE_HOST`                 | `localhost`                               | Optional override (host-based) |
| `DATABASE_PORT`                 | `5432`                                    | Optional override |
| `DATABASE_USER`                 | `hrm_user`                                | Optional override |
| `DATABASE_PASSWORD`             | `hrm_pass`                                | Optional override |
| `DATABASE_NAME`                 | `sample_hrm`                              | Optional override |
| `JWT_SECRET`                    | `<random 64-byte hex>`                    | JWT signing secret (no fallback allowed) |
| `JWT_EXPIRES_IN`                | `1h`                                      | Access token lifetime |
| `REFRESH_TOKEN_SECRET`          | `<random 64-byte hex>`                    | Refresh-token signing secret |
| `REFRESH_TOKEN_EXPIRES_IN`      | `7d`                                      | Refresh-token lifetime |
| `COOKIE_DOMAIN`                 | `localhost`                               | Cookie domain for httpOnly tokens |
| `COOKIE_SECURE`                 | `false` (dev) / `true` (prod)             | `Secure` flag for cookies |
| `MAIL_HOST`                     | `smtp.mailtrap.io`                        | SMTP host |
| `MAIL_PORT`                     | `587`                                     | SMTP port |
| `MAIL_USER`                     | `user`                                    | SMTP auth user |
| `MAIL_PASSWORD`                 | `pass`                                    | SMTP auth password |
| `MAIL_FROM`                     | `no-reply@sample-hrm.test`                | Default from-address |
| `SLACK_WEBHOOK_URL`             | `https://hooks.slack.com/services/...`    | Emergency leave webhook |
| `SLACK_EMERGENCY_CHANNEL`       | `#emergency-leave`                        | Channel name used in message template |
| `GATHER_API_KEY`                | `gt_xxx`                                  | Gather Town API key |
| `GATHER_SPACE_ID`               | `space_abc123`                            | Gather Space ID |
| `GATHER_SYNC_INTERVAL_SECONDS`  | `60`                                      | Polling frequency |
| `NOTION_API_TOKEN`              | `secret_xxx`                              | Notion integration token |
| `NOTION_DATABASE_ID`            | `db_xxx`                                  | Daily-notes DB ID |
| `S3_ENDPOINT`                   | `https://s3.amazonaws.com`                | S3-compatible endpoint |
| `S3_REGION`                     | `ap-south-1`                              | S3 region |
| `S3_BUCKET`                     | `sample-hrm-uploads`                      | Bucket name for avatars, payslips, attachments |
| `S3_ACCESS_KEY_ID`              | `AKIA...`                                 | S3 access key |
| `S3_SECRET_ACCESS_KEY`          | `...`                                     | S3 secret |
| `OFFICE_START_TIME`             | `08:00`                                   | Default office start (seed value; DB-editable) |
| `OFFICE_END_TIME`               | `17:00`                                   | Default office end |
| `CORE_HOURS_START`              | `08:00`                                   | Default core-hours start |
| `CORE_HOURS_END`                | `13:00`                                   | Default core-hours end |
| `GRACE_PERIOD_MINUTES`          | `10`                                      | Default grace period |
| `WORK_DAYS`                     | `Mon,Tue,Wed,Thu,Fri`                     | Default work days |
| `ALT_SHIFT_DAYS`                | `Fri,Sat,Sun`                             | Default alt-shift days |
| `LOG_LEVEL`                     | `info`                                    | Logger verbosity |

---

## 6. Frontend Environment Variables

| Variable                  | Example                              | Purpose |
|---------------------------|--------------------------------------|---------|
| `VITE_API_URL`            | `http://localhost:3000/api`          | Backend base URL |
| `VITE_APP_NAME`           | `Potential HRM`                      | Displayed app name |
| `VITE_GATHER_SPACE_URL`   | `https://app.gather.town/app/...`    | Deep-link to virtual office |
| `VITE_GATHER_ENABLED`     | `true`                               | Toggle Gather UI panels |
| `VITE_NOTION_ENABLED`     | `true`                               | Toggle Notion panels |
| `VITE_SLACK_ENABLED`      | `true`                               | Toggle Slack panels |
| `VITE_DEFAULT_LOCALE`     | `en`                                 | Locale for i18n |
| `VITE_SENTRY_DSN`         | `https://...@sentry.io/...`          | Optional error tracking |

---

## 7. Non-Functional Requirements

### Authentication & Security
- JWT delivered via **httpOnly cookie** (`httpOnly: true`, `sameSite: 'strict'`, `secure: true` in prod). No token in `localStorage`.
- Refresh-token rotation: on refresh, old token is invalidated in DB before issuing new one.
- Password hashing: bcrypt (cost >= 10). Minimum 8 characters, mixed case + digit enforced.
- RBAC: role-based guards on every endpoint (`@Roles('employee' | 'team_leader' | 'hr_admin')`).
- Input validation: class-validator on every DTO.
- CSRF: sameSite='strict' cookie + origin check on state-changing routes.

### Performance
- API P95 < 500 ms for list endpoints (pagination required).
- LCP < 2.5 s on dashboard pages.
- Frontend bundle < 500 KB gzip for initial route.
- DB: indexed lookup columns (email, employee_id, attendance_date, status).

### Accessibility
- WCAG 2.1 AA: color contrast >= 4.5:1, keyboard navigation, ARIA labels on interactive controls, focus visible.
- Responsive at 375 / 768 / 1024 / 1440 breakpoints; no horizontal scroll at 375.

### Data Export
- Every list/report page supports **Excel (.xlsx)** and **PDF** export of current filtered/searched results, with date-range filter.

### Observability
- Structured JSON logs with request id.
- Optional Sentry integration (error + perf).

### Data Retention
- Soft delete (`deletedAt`) on all main entities.
- Audit log for edits on employee, payroll, policy, office-config entities.

---

## 8. Office Configuration (editable defaults)

All values below are seeded in DB and editable by HR Admin via Office Configuration page (`/admin/office-configuration`). Changes take effect on next attendance calculation.

| Setting                  | Default          | Editable | Notes |
|--------------------------|------------------|----------|-------|
| Office Start Time        | `08:00`          | Yes      | 24h format |
| Office End Time          | `17:00`          | Yes      | |
| Core Hours Start         | `08:00`          | Yes      | Half-day-leave requires core-hours completion |
| Core Hours End           | `13:00`          | Yes      | |
| Grace Period             | `10 minutes`     | Yes      | Late flag applies when clock-in > start + grace |
| Work Days                | Mon - Fri        | Yes      | Multi-select |
| Weekend Days             | Sat, Sun         | Yes      | Multi-select |
| Alternative Shift Days   | Fri, Sat, Sun    | Yes      | Used for Work Day Shift requests |
| Late Threshold Mode      | `grace-based`    | Auto     | Derived from start + grace |

Page actions: **Save Changes**, **Reset to Defaults**, **View Change History** (audit log).

---

## 9. Module Management (extensibility)

Active modules are rendered dynamically in the nav based on role + enabled flag. Each module has:

- `key` (unique slug)
- `name`, `description`
- `menu_placement` (employee | team | admin | all)
- `required_role` (employee | team_leader | hr_admin)
- `data_source` (internal | api | manual)
- `enabled` boolean
- `config` JSON (for custom modules: metrics, weight, endpoint, headers)

HR Admin can create, enable/disable, or reconfigure a module without a deploy. This is the hook used to add future HR features (e.g., asset management, training, travel).

---

## 10. Policy List (seeded)

The 12 policies visible in the Employee → Policies tab, seeded on first boot:

1. Leave Management System
2. Employee Interaction with Clients
3. Company Device & Laptop Usage
4. PotentialAI Project-Based Bonus
5. Core Working Hour
6. Dual Job
7. Salary Increment & Promotion
8. Employee Conduct and Violations
9. Mandatory Attendance for Client Meeting
10. Office Hours & Attendance (NEW)
11. Emergency Leave (NEW)
12. Performance Measurement (NEW)

Each policy has `title`, `content` (rich text), `category`, `version`, `published_at`, `requires_acknowledgment` flag; acknowledgment is tracked per user.

---

## 11. Open Questions from PRD (pending client confirmation)

Seed these with sensible defaults until answered:

| # | Question                                  | Default used |
|---|-------------------------------------------|--------------|
| 1 | Max salary loan amount                    | 3x monthly basic salary, cap 500,000 |
| 2 | Max loan repayment period                 | 12 installments |
| 3 | Casual leave / year                       | 14 days |
| 4 | Sick leave / year                         | 10 days |
| 5 | Gather sync interval                      | 60s |
| 6 | Notion daily-note template                | `date`, `title`, `tasks_done`, `blockers`, `learnings` |
| 7 | Slack emergency channel                   | `#emergency-leave` |
| 8 | PM evaluation scale                       | 1-5 |
| 9 | Daily notes mandatory                     | Yes (M-F on working days) |
| 10| Probation period for loan eligibility     | 6 months from joining |
| 11| Emergency leave max duration              | 5 consecutive days |
| 12| Cancel approved leave                     | Allowed up to 24h before start |

---

## 12. Glossary (machine-usable ontology)

- `Employee` - user with `role=employee`.
- `TeamLeader` - user with `role=team_leader`.
- `HRAdmin` - user with `role=hr_admin`.
- `AttendanceRecord` - one row per employee per date, with `source in {gather, manual}` and `status in {on_time, late, absent}`.
- `LeaveRequest` - row with `type in {casual, sick, half_day, emergency}`, `status in {pending, approved, rejected, cancelled}`.
- `LateAttendanceRequest` - row linked to an `AttendanceRecord`; requires approval.
- `LoanApplication` / `LoanRepayment` - application + schedule of installments.
- `PayrollRun` - monthly batch; has `PayrollItem` per employee.
- `Bonus` - `type in {project, festival}`.
- `Goal` - assigned by TL/HR to employee.
- `DailyNote` - synced row from Notion (read-only in HRM).
- `ProjectEvaluation` - PM's per-project rating of an employee.
- `Policy` - versioned document + per-user `PolicyAcknowledgment`.
- `OfficeConfig` - singleton-like config row with office hours + days.
- `ModuleConfig` - row describing an active or custom module.

---
