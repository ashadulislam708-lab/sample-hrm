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

