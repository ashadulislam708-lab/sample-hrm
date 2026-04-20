---

### 3. Team Leader

Team Leader has all Employee features plus additional team management capabilities.

#### 3.1 Additional Navigation Menu Items
- Team Dashboard, Team Approvals, Team Performance, Team Reports

#### 3.2 Additional Features

**Team Dashboard:**
- Team Overview: Member count, Today's attendance summary (with Gather status), Pending approvals
- Team Member List: List with status, Quick view of attendance, Gather Town presence indicator

**Team Approvals:**
- Pending Requests: Leave, Emergency leave (highlighted), Late attendance, Work day shift requests
- Each Request: Employee name, Type/details, Estimated return (for Emergency), Date, Approve/Reject, Comment
- Approval History: Past decisions with details

**Team Performance:**
- Set Goals for Team Members
- Review Team Member Progress
- Daily Notes Overview: Team members' Notion note submission status
- Project Evaluations: Evaluate team after project completion, Rating form, Historical evaluations
- Conduct Performance Evaluations, Provide Feedback

**Team Reports:**
- Team attendance (including Gather data), Leave summary, Performance overview, Daily notes completion

---

## Part 3: Admin Dashboard PRD

### Admin Dashboard Standard Features

All admin dashboard pages should include the following standard features unless otherwise specified.

#### List Page Standard Features

| Feature | Description | Required |
|---------|------------|---------|
| Search | Keyword search field (name, ID, email, etc.) | Yes |
| Filters | Status / Date / Department dropdown filters | Yes |
| Column Sorting | Click table header to sort ASC/DESC | Yes |
| Checkbox Selection | Row checkboxes + Select All checkbox | Yes |
| Bulk Actions | Bulk delete / Status change / Export for selected items | Yes |
| Pagination | Page navigation + Items per page selector (10/25/50/100) | Yes |

#### Table UI Standard Features

| Feature | Description | Required |
|---------|------------|---------|
| Loading State | Skeleton or spinner while data loads | Yes |
| Empty State | Message displayed when no data exists | Yes |
| Action Column | Edit / Delete / View Detail buttons per row | Yes |

#### Detail/Edit Standard Features

| Feature | Description | Required |
|---------|------------|---------|
| Detail Drawer/Modal | Click row to open detail panel | Yes |
| Edit Form | Switch to edit mode within detail view | Yes |
| Delete Confirmation | Confirmation dialog before deletion | Yes |
| Audit Log | Track who/when/what was modified | Optional |

#### Data Export Standard Features

| Feature | Description | Required |
|---------|------------|---------|
| Excel Download | Export current filtered/searched results (.xlsx) | Yes |
| PDF Download | Export current filtered/searched results (.pdf) | Yes |
| Date Range Selection | Period filter for export | Yes |

---

### Page Architecture & Feature Specification

#### Dashboard Home Page
- Statistics Cards: Total Employees, Today's Attendance (Gather + Manual), Pending Approvals, Active Loans, This Month's Payroll Total, Emergency Leaves Active (new)
- Period Filter: Today / Last 7 days / Last 30 days / Custom date range
- Charts: Attendance trend (line), Leave utilization (pie), Department headcount (bar), Attendance source breakdown
- Recent Activity: Leave requests, Emergency leave notifications, Late attendance requests, Loan applications

#### Employee Management
- Main Page: Search (name, email, ID), Filters (Department, Status, Date), Create Employee button, Bulk Actions
- Table: Checkbox, Employee ID, Name, Email, Department, Position, Team Leader, Status, Joining Date, Actions
- Creation Modal: Full Name, Email, Phone, Department, Position, Role, Team Leader, Joining Date, Salary, Bank Details, Password, Gather Town Email, Notion User ID
- Detail Drawer: Header Info, Employment Details, Salary Info, Leave Balance, Quick Stats, Integration Status, Actions

#### Attendance Management
- Main Page: Search, Filters (Department, Date, Status, Source: Gather/Manual), Export
- Table: Checkbox, Date, Employee Name, Department, Clock-In Time, Source (Gather/Manual), Status, Late Approval Status
- Summary Stats: Total Present, Total Late, Total Absent, Gather Clock-ins, Manual Clock-ins
- Late Attendance Approvals: Pending requests with Approve/Reject buttons

#### Leave Management
- Main Page: Search, Filters (Type: Casual/Sick/Emergency, Status, Date, Department), Export
- Table: Employee Name, Leave Type, Duration, Date(s), Estimated Return (Emergency), Reason, Status, Approved By
- Emergency Leave Dashboard: Active emergency leaves, Slack notification status, Quick approve, Return status updates
- Leave Policy Configuration: Annual allocations, Carry-forward rules, Half-day settings, Emergency leave settings, Slack channel config

#### Payroll Management
- Payroll Processing: Select month/year, Generate, Review, Approve and process
- Payroll List: Employee, Basic Salary, Allowances, Deductions, Bonus, Net Salary, Status
- Export: Bank file, Payroll report (Excel/PDF)
- Salary Configuration: Salary components, Allowance types, Salary grades

#### Bonus Management
- Bonus Types: Project-Based Bonus, Festival Bonus
- Process Bonus: Select type, Select employees, Enter amount, Add to payroll or immediate
- Bonus History: All payments, Filter by type/date/employee

#### Loan Management
- Pending Applications: Employee, Amount, Reason, Approve/Reject, Set repayment terms
- Active Loans: Employee, Amount, Balance, Installment, Remaining
- Loan Policy: Max amount, Max repayment period, Eligibility criteria

#### Performance Management
- Review Cycles: Create cycle, Set period, Assign reviewers
- Goals Management: View all goals, Create templates
- Daily Notes Tracking (Notion): View submissions, Frequency reports, Content summary
- Project Evaluations: View PM evaluations, Filter by project/date/employee, Rating trends
- Performance Reports: Department-wise, Individual history, Combined scores

#### Recruitment Management
- Job Postings: Create, Manage active/closed
- Applications: View per job, Shortlist, Schedule interviews
- Onboarding: Convert candidate to employee, Onboarding checklist

#### Policy Management
- Policy List: All policies, Status (Active/Draft/Archived), Last updated
- Create/Edit: Title, Content (rich text), Category, Publish/Draft
- Acknowledgment Tracking: Status per policy, Send reminders

#### Integration Settings (NEW)
- **Gather Town**: API Key, Space ID, Sync frequency, Connection test, User mapping
- **Notion**: API Token, Workspace, Database ID, Sync settings, Connection test
- **Slack**: Webhook URL, Channel selection, Message template, Test notification
- **Custom Module**: Add new module, Configure API, Define metrics, Set weighting

#### Office Configuration Management (NEW)
Purpose: Allow HR Admin to configure and modify office settings without code changes

Office Time Settings:
- Office Start Time - Time picker (default: 8:00 AM)
- Office End Time - Time picker (default: 5:00 PM)
- Core Working Hours Start - Time picker (default: 8:00 AM)
- Core Working Hours End - Time picker (default: 1:00 PM)
- Grace Period (minutes) - Number input (default: 10 minutes)

Office Days Settings:
- Work Days - Multi-select (default: Monday to Friday)
- Weekend Days - Multi-select (default: Saturday, Sunday)
- Alternative Shift Days - Multi-select (default: Friday to Sunday)

Actions: Save Changes, Reset to Defaults, View Change History

#### Module Management (NEW - Extensibility)
- Purpose: Allow adding custom sections/modules to the HRM system for future requirements
- Active Modules: List of enabled modules, Enable/Disable toggle, Configuration link
- Available Modules: Pre-built templates, Custom module creation
- Create Custom Module: Name, Description, Menu placement, Data source, Permissions

---

### Reports & Data Export
- Attendance Report (Excel/PDF) - with source breakdown
- Leave Report (Excel/PDF) - by type including Emergency
- Payroll Report (Excel/PDF) - monthly summary
- Employee Directory (Excel) - full list
- Loan Report (Excel) - active loans, disbursements
- Performance Report (Excel/PDF) - ratings, goals, daily notes, project evaluations
- Headcount Report (Excel) - by department
- Daily Notes Report (Excel) - submission frequency (NEW)
- Emergency Leave Report (Excel) - with Slack status (NEW)

---

## Part 4: Additional Questions (Client Confirmation Required)

### Required Clarifications

| # | Question | Context |
|---|---------|---------|
| 1 | Grace period for clock-in? RESOLVED: 10 minutes | Defined as until 8:10 AM |
| 2 | Maximum salary loan amount? | Need % of salary or fixed amount |
| 3 | Loan repayment period? | Maximum installments allowed |
| 4 | Casual/Sick Leave days per year? | Annual allocation |
| 5 | Gather Town API rate limit? | Determine sync frequency |
| 6 | Notion database structure for daily notes? | Need template for integration |
| 7 | Which Slack channel for emergency leave? | Channel configuration |

### Recommended Clarifications

| # | Question | Context |
|---|---------|---------|
| 1 | Email notifications for approvals? | Communication workflow |
| 2 | Can employees cancel approved leave? | Leave modification rules |
| 3 | Salary adjustment approval workflow? | Multi-level approval |
| 4 | Probation period for loan eligibility? | New employee criteria |
| 5 | Emergency leave maximum duration? | Emergency leave limits |
| 6 | Daily notes mandatory or optional? | Performance tracking enforcement |
| 7 | PM evaluation rating scale? | 1-5, 1-10, or custom |

---

## Feature Change Log

### Version 1.1 (2025-01-22)

| Change Type | Before | After | Source |
|------------|--------|-------|--------|
| Office Configuration | Not defined | Added configurable Office Time & Days | Client Request |
| Office Settings | Fixed values | All settings editable by HR Admin | Client Request |
| Attendance | Clock-in only | Gather Town integration + Manual | Client Request |
| Grace Period | Fixed at 8:00 AM | Configurable (default: 10 minutes) | Client Request |
| Work Day Shift | Fixed Fri-Sun | Configurable shift days | Client Request |
| Leave Types | Casual, Sick, Half-Day | Added Emergency Leave with Slack | Client Request |
| Performance | Basic goals | Multi-tool measurement system | Client Request |
| Architecture | Specific to Potential AI | Generic, extensible design | Client Request |
| Tech Stack | Not defined | PostgreSQL, NestJS, React 19.2.5 | Client Request |

#### Change Details - Version 1.1

**Office Configuration Added (All Editable by HR Admin)**
- Office Start Time: Configurable (default: 8 AM)
- Office End Time: Configurable (default: 5 PM)
- Work Days: Configurable (default: Monday to Friday)
- Weekend: Configurable (default: Saturday-Sunday)
- Grace Period: Configurable (default: 10 minutes)
- Work Day Shift: Configurable (default: Friday to Sunday)

**Gather Town Integration**
- Automatic attendance tracking via Gather Town API with manual submission as fallback

**Emergency Leave with Slack Integration**
- New leave type requiring estimated return time, Slack notification on application, thread update on return

**Performance Measurement System**
- Tool 1: Daily note tracking from Notion | Tool 2: PM evaluation after project | Tool 3: Extensible module system

**Generic/Extensible Architecture**
- Module management for adding custom sections, configurable integrations, permission-based module access

**Tech Stack Defined**
- Database: PostgreSQL | Backend: NestJS (Latest) | Frontend: React 19.2.5

---

### Version 1.0 (2025-01-22)

| Change Type | Before | After | Source |
|------------|--------|-------|--------|
| Initial Creation | - | Full PRD | PotentialHRM_250122 |

#### Initial PRD Creation
- Source: Potential HRM Software Requirements
- Key Features: Clock-in only attendance, 2 leave types (Casual/Sick), Half-day for 2nd half only, Friday-Sunday shift option, 2 bonus types (Project-Based/Festival), Employee Salary Loan only, 3 user roles (Employee/Team Leader/HR Admin)
