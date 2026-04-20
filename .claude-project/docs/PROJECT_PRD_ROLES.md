# PRD Role & Layout Requirements (Auto-generated)

> Auto-extracted from .claude-project/docs/PROJECT_KNOWLEDGE.md
> Frontend MUST implement all roles, layouts, and route guards listed below.

## User Roles
Potential HRM is a comprehensive Human Resource Management System built for Potential AI. It manages the full employee lifecycle — attendance (auto via Gather Town + manual fallback), leave (casual / sick / half-day / emergency with Slack notifications), payroll with loan deductions and bonuses, performance tracking driven by Notion daily notes and PM project evaluations, recruitment, and fully configurable office policy settings. The system exposes self-service for employees, team-management tooling for team leaders, and full operational control for HR admins. The architecture is intentionally generic and extensible via a Module Management layer so new HR modules can be added without touching core code.
## 2. User Roles
| Role slug      | Description                                                                                   | Home route            | Key permissions |
| `employee`     | Regular staff member. Uses self-service HR (clock-in, leave, loan, payslip, performance).     | `/employee/dashboard` | Manage own attendance, leave, loan, profile, policies, self-assessment, goals progress |
| `hr_admin`     | HR personnel with full system access. Configures policies, integrations, office settings.    | `/admin/dashboard`    | Full CRUD across all modules, payroll processing, bonus distribution, loan approval, recruitment, integration settings, module management |
- Team Leader → HR Admin: N:1
- HR Admin → All users: 1:N
- **Grace period**: Default 10 minutes after office start time. Configurable by HR Admin.
- **Late Attendance Request**: Employees submit reason; Team Leader or HR Admin approves/rejects.
- Employee submits reason; Team Leader approves; HR Admin can override.
- HR Admin approves/rejects. On approval, repayment schedule created (monthly installments).
- HR Admin initiates monthly payroll (month/year).
- Admin reviews → approves → generates bank file and payslip PDFs.
3. **Custom Modules (extensible)**: HR Admin configures additional performance inputs — API data source, metrics, weighting. Aggregated into combined dashboard.
- **Policies**: Read + acknowledge company policies. List of 12 policies (Leave Mgmt, Client Interaction, Device Usage, Bonus, Core Hours, Dual Job, Salary Increment, Conduct, Client Meeting Attendance, Office Hours, Emergency Leave, Performance Measurement).
### HR Admin features
- **Admin Dashboard**: Total employees, today's attendance (Gather + Manual), pending approvals, active loans, monthly payroll total, active emergency leaves. Charts (attendance trend, leave utilization, department headcount, attendance source breakdown). Recent activity feed.
- **Employee Management**: List + search + filter + bulk actions. Create employee (full info + Gather email + Notion user id). Detail drawer with employment details, salary, leave balance, stats, integration status.
All integrations include a "Test connection" action on the Admin → Integration Settings page.
| `MAIL_USER`                     | `user`                                    | SMTP auth user |
- RBAC: role-based guards on every endpoint (`@Roles('employee' | 'team_leader' | 'hr_admin')`).
All values below are seeded in DB and editable by HR Admin via Office Configuration page (`/admin/office-configuration`). Changes take effect on next attendance calculation.
Active modules are rendered dynamically in the nav based on role + enabled flag. Each module has:
- `menu_placement` (employee | team | admin | all)
- `required_role` (employee | team_leader | hr_admin)
HR Admin can create, enable/disable, or reconfigure a module without a deploy. This is the hook used to add future HR features (e.g., asset management, training, travel).
2. Employee Interaction with Clients
9. Mandatory Attendance for Client Meeting
Each policy has `title`, `content` (rich text), `category`, `version`, `published_at`, `requires_acknowledgment` flag; acknowledgment is tracked per user.
## 11. Open Questions from PRD (pending client confirmation)

## Layout Requirements
| Custom Modules | Extensible performance inputs                    | REST     | Per-module URL, auth header, metric schema, weight |
- WCAG 2.1 AA: color contrast >= 4.5:1, keyboard navigation, ARIA labels on interactive controls, focus visible.
- `config` JSON (for custom modules: metrics, weight, endpoint, headers)

## Route Guards / Access Control
| Role slug      | Description                                                                                   | Home route            | Key permissions |
- **Module Management**: Enable/disable active modules, create custom modules (name, menu placement, data source, permissions).
- RBAC: role-based guards on every endpoint (`@Roles('employee' | 'team_leader' | 'hr_admin')`).

## Page-Role Mapping
| `hr_admin`     | HR personnel with full system access. Configures policies, integrations, office settings.    | `/admin/dashboard`    | Full CRUD across all modules, payroll processing, bonus distribution, loan approval, recruitment, integration settings, module management |
3. **Custom Modules (extensible)**: HR Admin configures additional performance inputs — API data source, metrics, weighting. Aggregated into combined dashboard.
- **Admin Dashboard**: Total employees, today's attendance (Gather + Manual), pending approvals, active loans, monthly payroll total, active emergency leaves. Charts (attendance trend, leave utilization, department headcount, attendance source breakdown). Recent activity feed.
All integrations include a "Test connection" action on the Admin → Integration Settings page.
All values below are seeded in DB and editable by HR Admin via Office Configuration page (`/admin/office-configuration`). Changes take effect on next attendance calculation.
