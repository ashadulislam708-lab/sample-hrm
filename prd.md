# Potential HRM PRD (2025-01-22) - Version 1.1

---

## Part 1: Basic Information

### Title
Potential HRM Software

---

### Terminology

| Term | Definition |
|------|-----------|
| Employee | A staff member who uses the system for self-service HR functions |
| Team Leader | A department/team head who manages and approves requests for team members |
| HR Admin | HR personnel with full system access for managing all HR operations |
| Casual Leave | Paid leave for personal matters, allocated annually |
| Sick Leave | Paid leave for illness or medical appointments |
| Half-Day Leave | Partial day leave for 2nd half only (after core hours), requires core hours completion |
| Emergency Leave | Urgent leave for unforeseen circumstances with Slack notification and estimated return time |
| Core Working Hours | Mandatory work period (configurable, default: 8 AM to 1 PM) that must be completed daily |
| Office Start Time | Configurable office opening time (default: 8:00 AM) |
| Office Days | Configurable work days (default: Monday to Friday) |
| Grace Period | Configurable time allowance for clock-in after office start (default: 10 minutes) |
| Clock-In | Recording attendance by marking arrival time in the system |
| Late Attendance | Clock-in after grace period that requires approval from Team Leader/HR Admin |
| Work Day Shift | Alternative work schedule (configurable, default: Friday to Sunday) instead of standard week |
| Salary Loan | Employee salary advance with repayment via monthly salary deduction |
| Project-Based Bonus | Bonus awarded based on successful project completion |
| Festival Bonus | Bonus awarded during festivals/holidays as per company policy |
| Gather Town | Virtual office platform integrated for automatic attendance tracking |
| Daily Note | Daily work log maintained in Notion for performance tracking |
| Performance Evaluation | Assessment conducted by PM after project completion |

---

### Office Configuration

> Note: All office configuration parameters below are editable by HR Admin through the Admin Dashboard.

#### Office Time (Configurable)

| Parameter | Default Value | Editable |
|-----------|--------------|---------|
| Office Start Time | 8:00 AM | Yes |
| Office End Time | 5:00 PM | Yes |
| Core Working Hours | 8:00 AM - 1:00 PM | Yes |
| Grace Period for Clock-In | 10 minutes | Yes |
| Late Attendance Threshold | After grace period (requires approval) | Auto-calculated |

#### Office Days (Configurable)

| Parameter | Default Value | Editable |
|-----------|--------------|---------|
| Work Days | Monday to Friday | Yes |
| Weekend | Saturday and Sunday | Yes |
| Alternative Shift Option | Friday to Sunday (upon approval) | Yes |

---

### Project Information

#### Description
Potential HRM Software is a comprehensive Human Resource Management System designed for Potential AI to streamline HR operations. The platform manages the complete employee lifecycle including attendance tracking, leave management, payroll, performance reviews, and recruitment. The system emphasizes simplicity with Gather Town integration for automatic attendance, three leave types (Casual, Sick, and Emergency with Slack integration), and a multi-dimensional performance measurement system. The architecture is designed to be generic and extensible for future module additions.

#### Goals
1. Enable employees to manage their HR needs through self-service portal
2. Streamline leave and attendance management with clear approval workflows
3. Automate payroll processing with loan deductions and bonus calculations
4. Provide Team Leaders with tools to manage their team's HR requests
5. Give HR Admins comprehensive control over all HR operations and policies
6. Integrate with Gather Town for automatic attendance tracking
7. Enable real-time emergency leave notifications via Slack
8. Implement comprehensive performance measurement using multiple data sources
9. Maintain generic, extensible architecture for future enhancements

#### User Types

- **Employee**: Can clock-in (auto/manual), request leave (Casual/Sick/Half-Day/Emergency), apply for work day shift, view payslips, apply for salary loan, view policies, track performance goals
- **Team Leader**: All Employee features plus approve/reject team leave requests, approve late attendance, conduct team performance reviews, view team reports, evaluate team after project completion
- **HR Admin**: Full system access - manage employees, process payroll, configure policies, handle recruitment, generate reports, manage all approvals, configure integrations

#### User Relationships
- Employee to Team Leader: N:1 (Many employees report to one Team Leader)
- Team Leader to HR Admin: N:1 (Team Leaders report to HR Admin for HR matters)
- HR Admin to All Users: 1:N (HR Admin manages all users in the system)

#### Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 19.2.5 |
| Backend | NestJS | Latest (11.x+) |
| Database | PostgreSQL | Latest stable |
| API Architecture | REST / Server Actions | - |
| Authentication | NestJS | Latest |
| ORM | TypeORM | Latest |

---

## System Modules (Step-by-step Flows)

### Module 1 - Employee Clock-In (Gather Integration + Manual)

#### Automatic Attendance (Gather Town Integration)
1. Employee joins Gather Town virtual office
2. System automatically detects employee presence via Gather Town API
3. System records timestamp when employee joins as clock-in time
4. If clock-in is after 8:10 AM, system flags as 'Late'
5. Late attendance automatically triggers approval request

#### Manual Attendance Submission
1. Employee logs into the system
2. Employee navigates to Attendance section
3. Employee clicks 'Manual Clock-In' button
4. Employee provides reason for manual submission
5. System records current timestamp as clock-in time
6. If clock-in is after 8:10 AM, system flags as 'Late'
7. Employee must submit late attendance approval request with reason
8. Team Leader/HR Admin approves or rejects late attendance

---

### Module 2 - Leave Request
1. Employee navigates to Leave Management
2. Employee clicks 'Apply Leave' button
3. Employee selects leave type (Casual Leave / Sick Leave / Emergency Leave)
4. Employee selects date(s) and provides reason
5. For Half-Day Leave: Only 2nd half option available (after 1 PM)
6. For Emergency Leave: Employee provides estimated return time
7. System validates leave balance and submits request
8. Team Leader receives notification and approves/rejects
9. Employee receives notification of decision
10. For Emergency Leave: Slack notification sent to internal channel

---

### Module 3 - Emergency Leave (with Slack Integration)
1. Employee navigates to Emergency Leave section
2. Employee clicks 'Apply Emergency Leave'
3. Employee provides: Reason for emergency, Estimated time to return (required), Contact availability
4. System immediately submits request
5. System sends notification to internal Slack channel with leave details
6. Team Leader receives notification for approval
7. When employee returns: Employee updates status to 'Available' in the system
8. System posts update to the same Slack thread
9. Leave record is finalized

---

### Module 4 - Work Day Shift Application
1. Employee navigates to Work Day Shift section
2. Employee clicks 'Apply for Friday-Sunday Shift'
3. Employee provides reason/justification
4. System submits request to Team Leader
5. Team Leader approves/rejects request
6. HR Admin can override if needed
7. Approved shift is applied to employee's schedule

---

### Module 5 - Salary Loan Application
1. Employee navigates to Loan section
2. Employee clicks 'Apply for Salary Loan'
3. Employee enters loan amount and reason
4. System validates against eligibility and maximum limit
5. Request is submitted to HR Admin
6. HR Admin reviews and approves/rejects
7. Approved loan is disbursed and repayment schedule is set
8. Monthly deductions begin from next salary

---

### Module 6 - Payroll Processing
1. HR Admin initiates monthly payroll
2. System calculates base salary for all employees
3. System applies attendance-based deductions (if any)
4. System deducts loan installments
5. System adds applicable bonuses (Project-Based/Festival)
6. HR Admin reviews and approves payroll
7. System generates bank file for salary disbursement
8. Payslips are generated and available to employees

---

### Module 7 - Performance Measurement

Performance measurement is conducted through three integrated tools:

#### 7.1 Daily Note Check (Notion Integration)
1. System connects to Notion workspace
2. Daily notes are fetched for each employee
3. Notes are categorized by date and employee
4. System tracks: Daily tasks completed, Blockers reported, Learning/achievements
5. Team Leaders can view team's daily notes
6. Performance metrics calculated from note frequency and content

#### 7.2 Project-Based Evaluation (PM Evaluation)
1. PM marks project as complete
2. System triggers evaluation workflow for team members
3. PM evaluates each team member on: Quality, Timeliness, Collaboration, Problem-solving, Communication
4. Rating scale: 1-5 or customizable
5. Evaluation is stored and linked to employee profile
6. Historical evaluations visible in performance history

#### 7.3 Custom Module Integration (Extensible)
1. HR Admin can configure additional performance modules
2. Module configuration includes: Data source (API endpoint / manual input), Metrics to track, Weighting
3. System aggregates data from all modules
4. Unified performance dashboard displays combined metrics

---

### 3rd Party Integrations

| Integration | Purpose | Type |
|-------------|---------|------|
| Gather Town | Automatic attendance tracking | API |
| Notion | Daily note tracking for performance | API |
| Slack | Emergency leave notifications | Webhook |
| Custom Modules | Extensible performance tracking | Configurable API |

---

## Part 2: User Application PRD

User Types: Employee, Team Leader

---

### 1. Common

#### Splash Page
- Design: Potential AI logo with brand colors
- Auto-redirect to Login page after loading

#### Login Page
Input:
- Email (required)
- Password (required)

Next Action:
- Validate email format
- Authenticate credentials
- Error: Display 'Invalid email or password'
- Success: Redirect to Dashboard based on user role

#### Forgot Password Page
- Input: Email address
- Action: Send password reset link to email

#### Reset Password Page
- Input: New password, Confirm password
- Validation: Passwords must match, minimum 8 characters
- Success: Redirect to Login page with success message

---

### 2. Employee

#### 2.1 Navigation Menu
1. Dashboard
2. Attendance
3. Leave
4. Salary
5. Loans
6. Performance
7. Policies
8. Profile

#### 2.2 Page Architecture & Feature Specification

##### 1. Dashboard Tab

Main Page:
1. Quick Stats Cards:
   - Leave Balance (Casual / Sick)
   - Attendance This Month (Present / Late / Absent)
   - Pending Requests count
   - Active Loan Balance (if any)
2. Quick Actions:
   - Clock-In button (prominent) - shows status if auto-clocked via Gather
   - Apply Leave button
   - Apply Emergency Leave button (highlighted)
   - View Payslip button
3. Recent Activity:
   - Recent leave requests with status
   - Recent attendance records
   - Gather Town attendance log
4. Notifications:
   - Policy updates
   - Request approvals/rejections
   - Performance review reminders

##### 2. Attendance Tab

Main Page:
1. Clock-In Section:
   - Current date and time display
   - Gather Town Status indicator (Connected/Disconnected)
   - Auto Clock-In status (if clocked via Gather)
   - Manual Clock-In button (available if not auto-clocked)
   - Today's clock-in time (if clocked in)
   - Status indicator (On Time / Late / Within Grace Period)
   - Grace Period Note: Clock-in within 10 minutes (until 8:10 AM) is considered on time
2. Attendance History:
   - Calendar view with attendance status
   - List view with date, clock-in time, status, source (Gather/Manual)
   - Filter by month/date range
3. Late Attendance Requests:
   - List of pending/approved/rejected requests
   - Apply Late Attendance button

##### 3. Leave Tab

Main Page:
1. Leave Balance Cards:
   - Casual Leave: Available / Total
   - Sick Leave: Available / Total
2. Apply Leave Button
3. Apply Emergency Leave Button (Prominent/Highlighted)
4. Leave History:
   - List of all leave requests
   - Status: Pending / Approved / Rejected
   - Filter by type (Casual/Sick/Emergency), status, date range

Apply Leave Page:
- Leave Type dropdown: Casual Leave / Sick Leave
- Duration: Full Day / Half Day (2nd Half Only)
- Date selection (single or range for full day)
- Reason textarea (required)
- Submit button
- Note: Half-Day Leave requires core hours (8 AM - 1 PM) completion

Apply Emergency Leave Page:
- Date(s) of leave
- Reason for emergency (required)
- Estimated Return Time (required) - Date/Time picker
- Contact availability (optional)
- Submit button
- Note: 'Submitting will notify the team via Slack'

##### 4. Salary Tab

Main Page:
1. Current Month Summary:
   - Basic Salary, Allowances, Deductions (Loan installment if any), Bonus (if any), Net Salary
2. Payslip History:
   - List of monthly payslips with Download PDF button
3. Bonus History:
   - Project-Based Bonus records, Festival Bonus records

##### 5. Loans Tab

Main Page:
1. Active Loan Section (if any): Loan amount, Outstanding balance, Monthly installment, Remaining installments
2. Apply for Loan Button
3. Loan History: Past loan records with Status (Active/Completed/Rejected)

##### 6. Performance Tab

Main Page:
1. Current Goals: List of assigned goals with progress indicator and update button
2. Daily Notes Summary (Notion Integration):
   - This week's note submission status
   - Link to Notion for detailed view
   - Streak indicator (consecutive days with notes)
3. Project Evaluations:
   - List of project-based evaluations with PM ratings, feedback, project name, completion date
4. Performance Reviews: Past review records with rating and feedback
5. Self-Assessment (during review period): Complete self-assessment form

##### 7. Policies Tab

Main Page: List of company policies with search/filter, click to view, acknowledge button for new policies

Policy List:
- Leave Management System
- Policy on Employee Interaction with Clients
- Company Device & Laptop Usage Policy
- PotentialAI Project-Based Bonus Policy
- Core Working Hour Policy
- Dual Job Policy
- Salary Increment & Promotion Policy
- Potential AI - Employee Conduct and Violations Policy
- Mandatory Attendance for Client Meeting
- Office Hours & Attendance Policy (NEW)
- Emergency Leave Policy (NEW)
- Performance Measurement Policy (NEW)

##### 8. Profile Tab

Main Page:
1. Profile Info: Photo, Full name, Email, Phone, Department, Position, Joining date, Edit button
2. Work Day Shift: Current shift status, Apply for Friday-Sunday Shift button
3. Integrations: Gather Town connection status, Notion connection status
4. Settings: Change password, Notification preferences, Logout

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
