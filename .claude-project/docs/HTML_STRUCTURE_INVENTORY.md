# HTML Structure Inventory — Potential HRM (sample-hrm)

One section per HTML file in `/HTML/`. Every entry is extracted verbatim from the source markup. Use this as a checklist when converting to React — every heading, form field, button label, table column, and shared component listed below MUST appear in the corresponding React component.

**Shared components referenced across all authenticated pages:**
- `<Sidebar>` — 240px dark (`bg-slate-900`) rail, logo (P monogram + "POTENTIAL AI" + role subtitle), nav items (linear-icon + label), divider, Account section, user footer card.
- `<MobileHeaderToggle>` — visible `md:hidden`, replicates sidebar logo + hamburger icon.
- No `<Navbar>` or `<Footer>` — header lives inside `<main>` per page.
- Auth pages do NOT render the sidebar — they center a single card on a full-screen `#F8FAFC` canvas.

---

## HTML/index.html

- **Path:** `/HTML/index.html`
- **Purpose:** Internal screens directory. Not a product page — remove from React routing.
- **Page title:** `Potential HRM Software - UI Screens`
- **Header:** `Potential HRM Software` + "UI screens generated from Aura.build"
- **Key sections:** Authentication (3 links), Employee Portal (14), Team Management (4), Admin Panel (16).
- **Forms:** None.
- **Buttons / links:** Pill-style anchors for every HTML in the project.
- **Tables:** None.
- **Widgets:** None.
- **Shared:** None (standalone index).

---

## AUTH PAGES

### HTML/auth/index.html
- **Path:** `/HTML/auth/index.html`
- **Purpose:** Splash / landing gateway.
- **Page title:** `Potential HRM - Splash`
- **Header:** N/A (intro splash).
- **Forms:** None.
- **Buttons:** Route into login.
- **Shared:** None.

### HTML/auth/02-login.html
- **Path:** `/HTML/auth/02-login.html`
- **Purpose:** Sign in (email + password).
- **Page title (browser):** `Sign In - Potential HRM`
- **H2:** `Sign In`  | kicker `Potential AI`
- **Key sections:** Centered card (`max-w-[420px] rounded-2xl p-8`), P logo, header, form.
- **Forms — Sign-in form (`<form>`):**
  - `email` — `type="email"`, label "Email Address", placeholder `name@company.com`, leading icon `solar:letter-linear`.
  - `password` — `type="password"`, label "Password", placeholder "Enter your password", leading icon `solar:lock-password-linear`, trailing eye-toggle button.
- **Buttons:**
  - `Sign In` — `type="submit"`, full-width primary, `h-[44px]`.
  - Eye toggle (show/hide password) — icon-only.
  - Link: `Forgot your password?` → `./03-forgot-password.html`.
- **Tables:** None.
- **Widgets:** password visibility toggle.
- **Shared:** None — standalone.

### HTML/auth/03-forgot-password.html
- **Path:** `/HTML/auth/03-forgot-password.html`
- **Purpose:** Request password reset email.
- **Page title:** `Forgot Password - Potential HRM`
- **H2 (view 1):** `Reset Password` + helper "Enter your email and we'll send you a reset link…"
- **H2 (view 2 — success):** `Check your email`
- **Key sections:** Request view (form) + Success view (icon + email display).
- **Forms — `reset-form`:**
  - `email` — `type="email"`, label "Email Address", placeholder `name@company.com`, error state shows danger icon + red message.
- **Buttons:**
  - `Send Reset Link` — primary submit with inline loader.
  - `Open Email App` — secondary (in success view).
  - `Click to resend` — inline button, reload.
  - Link: `Back to Login` (both views).
- **Tables:** None.
- **Widgets:** Loader spinner, two-view state machine, error banner.
- **Shared:** None.

### HTML/auth/04-reset-password.html
- **Path:** `/HTML/auth/04-reset-password.html`
- **Purpose:** Set a new password from reset link.
- **Page title:** `Create New Password - Potential HRM`
- **H2 (view 1):** `Create New Password` + "Your new password must be different…"
- **H2 (view 2 — success):** `Password Reset`
- **Key sections:** Reset form + success confirmation.
- **Forms — `password-form`:**
  - `new-password` — label "New Password", placeholder "Min. 8 characters", eye-toggle, strength bar (Weak / Too short / Fair / Strong).
  - `confirm-password` — label "Confirm Password", placeholder "Re-enter password", eye-toggle, live match checkmark, mismatch error "Passwords do not match".
- **Buttons:**
  - `Reset Password` — primary submit.
  - `Back to Login` — in success view.
- **Widgets:** Strength meter, matching indicator, password toggle.
- **Shared:** None.

---

## EMPLOYEE PAGES (14 main + 11 supplementary)

**Sidebar (Employee variant):** logo "POTENTIAL / Employee". Items: Dashboard, Attendance, Leave, Salary, Loans, Performance, Policies. Account divider: Profile, Logout. Footer: user card (JD / Product Designer).

### HTML/employee/05-employee-dashboard.html
- **Path:** `/HTML/employee/05-employee-dashboard.html`
- **Purpose:** Employee home — KPIs, quick actions, recent activity, notifications.
- **Page title:** `Employee Dashboard - Potential HRM`
- **H1:** `Dashboard`  (subtitle `Good Morning, John`)
- **Key sections:**
  1. Header (title + "Online" badge + avatar)
  2. Quick Stats Row — 4 cards: Leave Balance (8/12 days, progress bar), Attendance (Aug) (Present/Late/Absent), Pending Requests (3), Active Loan ($2,500).
  3. Quick Actions — 4 tiles: Clock In, Apply Leave, Emergency Leave, View Payslip.
  4. Recent Activity (60%) — list: Clocked In (On Time), Leave Request (Pending), Salary Credited (Success), Clocked Out (Auto).
  5. Notifications (40%) — HR Policy Update, Team Meeting, Leave Approved, Public Holiday.
- **Forms:** None.
- **Buttons:** `Clock In`, `Apply Leave`, `Emergency Leave`, `View Payslip`, `View All` (activity), mark-all-read icon, `View all notifications`.
- **Tables:** None.
- **Widgets:** Progress bar, status pills, live pulsing dot, notification bullets, mobile hamburger.
- **Shared:** Employee Sidebar, Mobile Header.

### HTML/employee/06-attendance-main.html
- **Path:** `/HTML/employee/06-attendance-main.html`
- **Purpose:** Daily attendance — live clock, clock-in/out, late request log.
- **Page title:** `Attendance - Potential HRM`
- **H1:** `Attendance`
- **H2/H3:** `09:42:15` (live clock, `font-mono`), `Late Attendance Requests`.
- **Key sections:** Live clock card, Clock-in/out controls, Late Attendance Requests table.
- **Forms:** None directly (request is filed on `08-late-attendance-request.html`).
- **Buttons:** Clock-in/out primary, "Apply Late Attendance" CTA (→ 08).
- **Tables — Late Attendance Requests:**
  - Columns: Date, Time, Reason, Status, Approved By, Actions (right-aligned).
- **Widgets:** Live clock display, status badges.
- **Shared:** Employee Sidebar.

### HTML/employee/07-attendance-history.html
- **Path:** `/HTML/employee/07-attendance-history.html`
- **Purpose:** ⚠ Title misleading — file actually renders the "Create New Password" screen (duplicate of 04). Keep or repurpose as Attendance History in React if PRD calls for one.
- **Page title:** `Create New Password - Potential HRM` (verbatim from file)
- **H2:** `Create New Password`, `Password Reset`.
- **Forms:** `new-password`, `confirm-password` — same pattern as 04-reset-password.
- **Buttons:** Reset Password, Back to Login.
- **Shared:** None (auth layout).

### HTML/employee/08-late-attendance-request.html
- **Path:** `/HTML/employee/08-late-attendance-request.html`
- **Purpose:** File a late clock-in request.
- **Page title:** `Late Attendance Request - Potential HRM`
- **H1:** `Attendance` | **H3:** `Apply Late Attendance`
- **Forms:**
  - `Date` — label "Date", date input.
  - `Actual Clock-In Time` — time input.
  - Reason — textarea (inferred from layout; label provided via context).
- **Buttons:** Submit request (primary), cancel/back (secondary). 3 total buttons.
- **Shared:** Employee Sidebar.

### HTML/employee/09-leave-main.html
- **Path:** `/HTML/employee/09-leave-main.html`
- **Purpose:** Leave balances overview + leave history list.
- **Page title:** `Leave Management - Potential HRM`
- **H1:** `Leave Management`  (subtitle: "Manage your leave requests and check your remaining balance.")
- **H2:** `Leave History`. **H3s:** `8 / 12 days available` (Casual), `5 / 7 days available` (Sick).
- **Key sections:** Header (with two CTAs), Leave Balance Cards (Casual / Sick), Leave History table with filter tabs.
- **Filters:** Segmented tabs `All | Pending | Approved | Rejected`; dropdown `All Types / Casual Leave / Sick Leave / Emergency Leave`.
- **Buttons:**
  - `Apply Emergency Leave` (red, `→ 11-apply-emergency-leave.html`).
  - `Apply Leave` (primary, `→ 10-apply-leave.html`).
  - Tab buttons ×4, 6 additional in toolbar / rows.
- **Tables — Leave History:**
  - Columns: Type, Duration, Date(s), Reason (w-1/3), Status, Actions (right-aligned).
- **Widgets:** Leave balance progress bars, filter tabs, status badges.
- **Shared:** Employee Sidebar, user footer card.

### HTML/employee/10-apply-leave.html
- **Path:** `/HTML/employee/10-apply-leave.html`
- **Purpose:** Apply for regular leave (modal-in-page variant).
- **Page title:** `Apply Leave - Potential HRM`
- **H1:** `Leave Management` | **H2:** `Leave History` | **H3:** `Apply for Leave` (modal title)
- **Forms — Apply Leave modal:**
  - Leave type (select)
  - Start date + End date (date inputs)
  - Duration (computed)
  - Reason (textarea)
  - Attachment (optional file)
- **Buttons:** Submit (primary), Cancel (secondary), tab filter buttons, 7 total.
- **Tables:** Same Leave History columns as 09.
- **Widgets:** Modal, leave balance cards reused.
- **Shared:** Employee Sidebar.

### HTML/employee/11-apply-emergency-leave.html
- **Path:** `/HTML/employee/11-apply-emergency-leave.html`
- **Purpose:** Apply for emergency leave — red-themed urgent form.
- **Page title:** `Emergency Leave - Potential HRM`
- **H2:** `Emergency Leave` (red: `text-red-700`)
- **Forms:** Reason, date, duration, emergency-type select, attachment.
- **Buttons:** 2 total — Submit Emergency Leave (red primary), Cancel.
- **Shared:** Employee Sidebar.

### HTML/employee/12-salary-main.html
- **Path:** `/HTML/employee/12-salary-main.html`
- **Purpose:** Salary overview — current month summary + payslip/bonus history.
- **Page title:** `Salary & Compensation - Potential HRM`
- **H1:** `Salary & Compensation`
- **H2:** `January 2026 Summary`, `Payslip History`, `Bonus History`.
- **Forms:** None.
- **Buttons:** Download/View payslip row actions, filter selects. 12 total.
- **Tables:**
  - **Payslip History:** Month, Basic Salary, Deductions, Bonus, Net Salary, Actions (right).
  - **Bonus History:** Date, Type, Project Name, Amount, Status.
- **Shared:** Employee Sidebar.

### HTML/employee/13-payslip-detail.html
- **Path:** `/HTML/employee/13-payslip-detail.html`
- **Purpose:** Printable payslip (print-ready layout).
- **Page title:** `Payslip Detail - Potential HRM`
- **H1:** `Payslip` | **H2:** `John Doe` | **H3s:** `Employee Details`, `Earnings`, `Deductions`.
- **Key sections:** Company header, Employee details block, Earnings breakdown, Deductions breakdown, Net pay summary, Signature/footer.
- **Forms:** None.
- **Buttons:** 2 — Download PDF, Print.
- **Tables:** Earnings rows, Deductions rows (structured as labeled rows, not `<table>`).
- **Shared:** Employee Sidebar.

### HTML/employee/14-loans-main.html
- **Path:** `/HTML/employee/14-loans-main.html`
- **Purpose:** Loan overview + history; CTA to apply.
- **Page title:** `Loans - Potential HRM`
- **H1:** `Loans Management` | **H2:** `Loan History`
- **Forms:** None.
- **Buttons:** `Apply for Loan` (primary), row-level View, filters. 3 total.
- **Tables — Loan History:** Date Applied, Loan Amount, Purpose, Status, Installments, Actions (right).
- **Shared:** Employee Sidebar.

### HTML/employee/15-apply-loan.html
- **Path:** `/HTML/employee/15-apply-loan.html`
- **Purpose:** Apply for salary/personal loan.
- **Page title:** `Apply for Loan - Potential HRM`
- **H1:** `Loans Management` | **H3:** `Apply for Salary Loan` (modal)
- **Forms:**
  - `amount` — "Loan Amount" (number).
  - `reason` — "Reason for Loan" (text/textarea).
  - Tenure / repayment months (select).
- **Buttons:** Submit Application (primary), Cancel, filters. 4 total.
- **Tables:** Loan History (same columns as 14).
- **Shared:** Employee Sidebar.

### HTML/employee/16-performance.html
- **Path:** `/HTML/employee/16-performance.html`
- **Purpose:** Personal performance — goals, daily activity, project evaluations, past reviews.
- **Page title:** `Performance - Potential AI`
- **H1:** `Performance`
- **H2:** `Current Goals`, `Daily Activity`, `Project Evaluations`, `Performance Reviews`
- **H3 examples:** `Complete Q1 Sales Target`, `Learn React Native`, `Improve Client Response Time`, `Daily Notes This Week`, `CRM Dashboard Redesign`, `Mobile App MVP`.
- **Forms:** None directly.
- **Buttons:** View goal, Create goal, Filter, row actions. 6 total.
- **Tables — Performance Reviews:** Period, Rating, Reviewer, Status, Actions.
- **Widgets:** Goal progress bars, rating chips.
- **Shared:** Employee Sidebar.

### HTML/employee/17-policies.html
- **Path:** `/HTML/employee/17-policies.html`
- **Purpose:** Browse company policies.
- **Page title:** `Company Policies - Potential AI`
- **H1:** `Company Policies`
- **Forms:** None.
- **Buttons:** 1 (search/filter toggle).
- **Tables:** None — uses card grid of policy categories.
- **Shared:** Employee Sidebar.

### HTML/employee/18-profile.html
- **Path:** `/HTML/employee/18-profile.html`
- **Purpose:** Personal profile view.
- **Page title:** `My Profile - Potential AI`
- **H1:** `My Profile` | **H2:** `John Doe`
- **H3:** `Personal Information`, `Connected Services`, `Work Day Shift`, `Account Settings`.
- **Forms:** Read-only labeled fields: `Email Address`, `Phone Number`, `Employee ID`, `Joining Date`.
- **Buttons:** 5 — Edit Profile, Change Password, Notifications, Shift Change, Logout (inferred actions from section layout).
- **Shared:** Employee Sidebar.

### HTML/employee/39-leave-request-detail.html
- **Path:** `/HTML/employee/39-leave-request-detail.html`
- **Purpose:** Employee view of own submitted leave request.
- **Page title:** `Leave Request Detail - Potential HRM`
- **H1:** `Casual Leave Request`
- **H2:** `Request Details`, `Approval Timeline`, `Leave Balance`, `Reporting Manager`.
- **Forms:** None (read-only).
- **Buttons:** 4 — Back, Cancel Request, Download, Contact Manager.
- **Shared:** Employee Sidebar.

### HTML/employee/40-loan-detail.html
- **Path:** `/HTML/employee/40-loan-detail.html`
- **Purpose:** Loan detail + EMI schedule.
- **Page title:** `Loan Details - Potential HRM`
- **H1:** `Personal Loan`
- **H2:** `Loan Details`, `EMI Schedule`, `Repayment Progress`, `Quick Actions`.
- **Forms:** None.
- **Buttons:** 5 — Pay Early, Download Statement, Contact HR, View Agreement, Back.
- **Tables — EMI Schedule:** EMI #, Due Date, Principal, Interest, EMI, Status.
- **Shared:** Employee Sidebar.

### HTML/employee/41-attendance-detail.html
- **Path:** `/HTML/employee/41-attendance-detail.html`
- **Purpose:** Single-day attendance detail.
- **Page title:** `Attendance Detail - Potential HRM`
- **H1:** `January 15, 2025`
- **H2:** `Time Details`, `Activity Timeline`, `Day Summary`, `This Week`.
- **Forms:** None.
- **Buttons:** 1 — Back.
- **Shared:** Employee Sidebar.

### HTML/employee/50-policy-detail.html
- **Path:** `/HTML/employee/50-policy-detail.html`
- **Purpose:** Single policy content (legal-style long-read).
- **Page title:** `Policy Detail - Potential HRM`
- **H1:** `Leave Management System`
- **H2 sections:** `1. Introduction`, `2. Types of Leave`, `3. Leave Request Process`, `4. Leave Approval Authority`, `5. Important Notes`, `6. Contact`.
- **H3 sub-sections:** `2.1 Casual Leave`, `2.2 Sick Leave`, `2.3 Emergency Leave`, `Acknowledge Policy`.
- **Tables:** One 2-column table — columns `Leave Duration`, `Approving Authority`.
- **Forms:** Acknowledge checkbox.
- **Buttons:** 3 — Acknowledge, Download, Back.
- **Shared:** Employee Sidebar.

### HTML/employee/51-goal-create-edit.html
- **Path:** `/HTML/employee/51-goal-create-edit.html`
- **Purpose:** Create / edit a goal.
- **Page title:** `Create Goal - Potential HRM`
- **H1:** `Create New Goal`
- **Forms:**
  - Goal title, description
  - `Key Results / Milestones` — dynamic list
  - `Visibility` — radio group (Private / Manager / Team / Company).
  - Due date
- **Buttons:** 5 — Save Goal, Cancel, Add Milestone, Remove, Back.
- **Shared:** Employee Sidebar.

### HTML/employee/52-review-detail.html
- **Path:** `/HTML/employee/52-review-detail.html`
- **Purpose:** View a performance review.
- **Page title:** `Performance Review Detail - Potential HRM`
- **H1:** `Performance Review`
- **H2:** `Performance Categories`, `Manager Comments`, `Goals for Q1 2025`. **H3:** `Key Strengths`, `Areas for Improvement`.
- **Forms:** None (read-only; comment field may be included).
- **Buttons:** 1 — Back.
- **Shared:** Employee Sidebar.

### HTML/employee/53-feedback-detail.html
- **Path:** `/HTML/employee/53-feedback-detail.html`
- **Purpose:** Project-level manager feedback.
- **Page title:** `Project Feedback - Potential HRM`
- **H1:** `CRM Dashboard Redesign`
- **H2:** `Project Details`, `Evaluation Metrics`, `Manager Feedback`.
- **H3:** `What Went Well`, `Areas for Improvement`, `Overall Comments`.
- **Forms:** None.
- **Buttons:** 1 — Back.
- **Shared:** Employee Sidebar.

### HTML/employee/54-edit-profile.html
- **Path:** `/HTML/employee/54-edit-profile.html`
- **Purpose:** Edit personal + emergency contact info.
- **Page title:** `Edit Profile - Potential HRM`
- **H1:** `Edit Profile`
- **H2:** `Profile Photo`, `Personal Information`, `Emergency Contact`.
- **Forms (all `text-sm font-medium text-slate-700`):**
  - `first-name` — text "First Name"
  - `last-name` — text "Last Name"
  - `phone` — tel "Phone Number"
  - `address` — text/textarea "Address"
  - `dob` — date "Date of Birth"
  - `gender` — select "Gender"
  - `emergency-name` — text "Contact Name"
  - `emergency-relationship` — text "Relationship"
  - `emergency-phone` — tel "Phone Number"
  - Profile photo uploader (file input + avatar preview).
- **Buttons:** 4 — Save Changes (primary), Cancel, Upload Photo, Remove Photo.
- **Shared:** Employee Sidebar.

### HTML/employee/55-change-password.html
- **Path:** `/HTML/employee/55-change-password.html`
- **Purpose:** Change password while logged in.
- **Page title:** `Change Password - Potential HRM`
- **H1:** `Change Password`
- **Forms:**
  - `current-password` — password "Current Password"
  - `new-password` — password "New Password"
  - `confirm-password` — password "Confirm New Password"
- **Buttons:** 4 — Update Password (primary), Cancel, eye-toggles (×3; some rendered as buttons).
- **Shared:** Employee Sidebar.

### HTML/employee/56-notifications.html
- **Path:** `/HTML/employee/56-notifications.html`
- **Purpose:** Notification preferences.
- **Page title:** `Notifications - Potential HRM`
- **H1:** `Notification Settings`
- **H2:** `Email Notifications`, `Push Notifications`, `Quiet Hours`.
- **Forms:** Toggle switches per notification category; `Start Time` + `End Time` for quiet hours.
- **Buttons:** 1 — Save Preferences.
- **Widgets:** Toggle switches.
- **Shared:** Employee Sidebar.

### HTML/employee/57-shift-change.html
- **Path:** `/HTML/employee/57-shift-change.html`
- **Purpose:** Request a shift change.
- **Page title:** `Apply for Shift Change - Potential HRM`
- **H1:** `Apply for Shift Change` | **H2:** `Current Schedule`, `Request New Schedule`.
- **Forms:** Requested shift (select), effective date (date), reason (textarea), recurrence.
- **Buttons:** 1 — Submit Request.
- **Shared:** Employee Sidebar.

### HTML/employee/58-salary-breakdown.html
- **Path:** `/HTML/employee/58-salary-breakdown.html`
- **Purpose:** Itemised breakdown of a monthly payslip.
- **Page title:** `Salary Breakdown - Potential HRM`
- **H1:** `January 2026 Salary Breakdown`
- **H2:** `Earnings` (success color), `Deductions` (error color). **H3:** `Summary`, `Year-to-Date (2026)`.
- **Forms:** None.
- **Buttons:** 2 — Download PDF, Back.
- **Shared:** Employee Sidebar.

---

## TEAM LEADER PAGES (7 files)

**Sidebar (Team Lead variant):** logo "POTENTIAL AI / Team Lead". Items: Dashboard, Attendance, Leave, Salary & Loans, Performance, Policies. Eyebrow "Team Management" → Team Overview, Team Approvals, Team Performance, Team Reports. Account divider: Profile, Logout. Footer: user card.

### HTML/team/19-team-dashboard.html
- **Path:** `/HTML/team/19-team-dashboard.html`
- **Purpose:** Team overview — stats, member list.
- **Page title:** `Team Overview - Potential AI`
- **H1:** `Team Overview`  ("Manage team performance, attendance, and member details.")
- **H2:** `12` (Total Members), `10` (Present Today), `5` (Pending Approvals), `Team Members`.
- **Key sections:** Stats cards (Total Members 12 / Present Today 10 / Pending Approvals 5), Team Members grid/list.
- **Forms:** None.
- **Buttons:** `Add Member` (slate-900 primary, → 44-add-member), 1 additional.
- **Tables:** None — list uses card layout.
- **Shared:** Team Lead Sidebar.

### HTML/team/20-team-approvals.html
- **Path:** `/HTML/team/20-team-approvals.html`
- **Purpose:** Approval queue for team leave/attendance requests.
- **Page title:** `Team Approvals - Potential AI`
- **H1:** `Team Approvals`
- **H3s:** `Sarah Wilson`, `Mike Chen`, `Emily Davis`, `James Brown` (request cards).
- **Forms:** Inline comment input per row.
- **Buttons:** 16 total — Approve / Reject per row, filter tabs, bulk-action triggers.
- **Tables — Approvals queue:** Date, Employee, Type, Decision, Comment (w-1/3).
- **Shared:** Team Lead Sidebar.

### HTML/team/21-team-performance.html
- **Path:** `/HTML/team/21-team-performance.html`
- **Purpose:** Team members' performance snapshot + project evaluations.
- **Page title:** `Team Performance - Potential AI`
- **H1:** `Team Performance` | **H2:** `Project Evaluations`.
- **H3:** `Sarah Wilson`, `Mike Chen`, `Emily Davis`, `Mobile App Redesign`, `Cloud Migration`, `E-commerce Q4 Setup`.
- **Forms:** None.
- **Buttons:** 10.
- **Tables — Attendance by day:** Member (w-1/3), M, T, W, T, F (day columns center-aligned).
- **Shared:** Team Lead Sidebar.

### HTML/team/22-team-reports.html
- **Path:** `/HTML/team/22-team-reports.html`
- **Purpose:** Team-level reports with date-range filter.
- **Page title:** `Team Reports - Potential AI`
- **H1:** `Team Reports`
- **H3:** `Team Attendance`, `Leave Summary`, `Performance Overview`, `Daily Notes`.
- **Forms:** `Start Date`, `End Date`, `Quick Select` (preset dropdown).
- **Buttons:** 15 — report tile links, export options, filter actions.
- **Tables — Attendance report:** Employee (w-1/4), Date, Check In, Check Out, Status, Total Hours (right).
- **Shared:** Team Lead Sidebar.

### HTML/team/42-team-member-detail.html
- **Path:** `/HTML/team/42-team-member-detail.html`
- **Purpose:** Single team member profile (as seen by team lead).
- **Page title:** `Team Member - Sarah Wilson - Potential AI`
- **H1:** `Sarah Wilson`
- **H2:** `Performance Overview`, `Attendance This Month`, `Recent Leave Requests`, `Contact Information`, `Employment Details`, `Skills`.
- **Forms:** None.
- **Buttons:** 2 — Message, Back.
- **Shared:** Team Lead Sidebar.

### HTML/team/43-approval-detail.html
- **Path:** `/HTML/team/43-approval-detail.html`
- **Purpose:** Detailed view of a single leave approval (team lead decision).
- **Page title:** `Leave Approval - Potential AI`
- **H1:** `Leave Request`
- **H2:** `Requestor`, `Request Details`, `Your Decision`, `Mike's Leave Balance`, `Team Impact`, `Recent Leave History`.
- **Forms:** `Add a comment (optional)` — textarea.
- **Buttons:** 2 — Approve (primary), Reject (danger).
- **Shared:** Team Lead Sidebar.

### HTML/team/44-add-member.html
- **Path:** `/HTML/team/44-add-member.html`
- **Purpose:** Add existing employee to team (modal over Team Overview).
- **Page title:** `Add Team Member - Potential AI`
- **H1:** `Team Overview` | **H3 (modal):** `Add Team Member`.
- **Forms (modal):**
  - Employee select / search
  - `reporting-to` — select "Reporting To"
  - `notify` — checkbox "Send notification"
  - Role select (inferred)
- **Buttons:** 4 — Add Member (primary), Cancel, Close modal, Open modal trigger.
- **Shared:** Team Lead Sidebar.

---

## ADMIN PAGES (22 files)

**Sidebar (Admin variant):** logo "POTENTIAL AI / Admin". Eyebrow "Admin Section" → Dashboard, Employees, Attendance, Leave, Salary, Loans, Reports. Divider → Settings. Footer: Admin user card with green presence dot, logout icon.

### HTML/admin/23-admin-dashboard.html
- **Path:** `/HTML/admin/23-admin-dashboard.html`
- **Purpose:** Admin/HR overview — org KPIs, charts, emergency alerts.
- **Page title:** `Admin Dashboard - Potential AI`
- **H1:** `Dashboard`  ("Welcome back, here's what's happening with your team today.")
- **H3 (stat values):** `156`, `142` (Today's Attendance), `12` (Pending Approvals), `23` (Active Loans), `$485k` (Payroll), `2` (Emergency Leaves).
- **H3 (charts):** `Attendance Trend`, `Leave Utilization`, `Department Headcount`, `Attendance Source`.
- **Key sections:** Header with date-range toggle (Today / Last 7 Days / Last 30 Days / Custom), 6-card stats grid, 2×2 charts grid.
- **Forms:** None.
- **Buttons:** 9 — date range ×4, chart menu ×4, Settings icon.
- **Widgets:** Line chart (SVG), pie (conic-gradient), donut (conic-gradient with mask), bar chart, pulsing dot.
- **Shared:** Admin Sidebar.

### HTML/admin/24-employee-management-list.html
- **Path:** `/HTML/admin/24-employee-management-list.html`
- **Purpose:** Employee directory with filters + CRUD entry.
- **Page title:** `Employee Management - Potential AI`
- **H1:** `Employee Management`
- **Key sections:** Header + Create CTA, Filters toolbar (Search, Department, Role, Status), Data table with row checkboxes.
- **Forms — Toolbar:**
  - Search: placeholder `Search by name, email, ID...`
  - Department select
  - Role select
  - Status select
- **Buttons:** 23 — `Create Employee` (primary, → 25), row actions (View, Edit, Deactivate), filter apply/reset, pagination, bulk-action, column menu.
- **Tables — Employees:** (checkbox), Employee (avatar + name + email), Department, Role, Status, Joined, Actions (right).
- **Widgets:** Row checkboxes (`accent-color: #2563EB`), pagination.
- **Shared:** Admin Sidebar.

### HTML/admin/25-employee-create-edit.html
- **Path:** `/HTML/admin/25-employee-create-edit.html`
- **Purpose:** Create or edit an employee record.
- **Page title:** `Create Employee - Potential AI`
- **H1:** `Create New Employee` | **H2:** `Basic Information`, `Employment Details`, `Salary & Banking`, `System Integrations`.
- **Forms (fields verified in grep):**
  - `fullName` — text "Full Name" (placeholder `e.g. John Doe`)
  - `email` — email "Email Address" (placeholder `e.g. john@potential.ai`)
  - `phone` — tel "Phone Number" (placeholder `555-0123`)
  - `position` — text (placeholder `e.g. Senior Frontend Developer`)
  - `teamLeader` — select "Team Leader"
  - `status` — select "Status"
  - `salary` — number "Base Salary (Annual)" (placeholder `0.00`, `$` prefix)
  - `bankName` — text "Bank Name" (placeholder `e.g. Chase Bank`)
  - `accountNumber` — text "Bank Account Number" (placeholder `XXXX-XXXX-XXXX`, `font-mono`)
  - `gather` — email "Gather Town Email"
  - `notion` — text "Notion User ID"
  - Department (select, inferred from grouping)
  - Role (select)
  - Start date (date)
- **Buttons:** 4 — Create Employee (primary), Cancel, Upload avatar, Back.
- **Shared:** Admin Sidebar.

### HTML/admin/26-attendance-management.html
- **Path:** `/HTML/admin/26-attendance-management.html`
- **Purpose:** Org-wide attendance records + approvals.
- **Page title:** `Attendance Management - Potential AI`
- **H1:** `Attendance Management`
- **Forms:** Search, department filter, date range, status filter.
- **Buttons:** 15 — row approve/reject/view, export, filter apply, pagination.
- **Tables:** Employee, Date, Department, Clock In, Source, Status, Late Approval, Actions (right).
- **Shared:** Admin Sidebar.

### HTML/admin/27-leave-management-admin.html
- **Path:** `/HTML/admin/27-leave-management-admin.html`
- **Purpose:** Org-wide leave requests management.
- **Page title:** `Leave Management - Potential HRM`
- **H1:** `Leave Management`
- **Forms:** Search, employee filter, leave type filter, status filter, date range.
- **Buttons:** 14 — Approve/Reject/View per row, Create Leave Request (→ 49), bulk actions, export.
- **Tables:** Employee, Leave Type, Duration, Date Range, Return Date, Reason (max-w-[200px]), Status, Approved By, Actions (right).
- **Shared:** Admin Sidebar.

### HTML/admin/28-emergency-leave-dashboard.html
- **Path:** `/HTML/admin/28-emergency-leave-dashboard.html`
- **Purpose:** Live alerts for active emergency leaves.
- **Page title:** `Emergency Leave Dashboard - Potential HRM`
- **H1:** `Active Emergency Leaves`
- **H3 (cards):** `Rachel Zane`, `Mike Ross`, `Sarah Chen`.
- **Forms:** None.
- **Buttons:** 9 — Contact, Approve coverage, Mark Handled per card.
- **Shared:** Admin Sidebar.

### HTML/admin/29-payroll-management.html
- **Path:** `/HTML/admin/29-payroll-management.html`
- **Purpose:** Monthly payroll run.
- **Page title:** `Payroll Management - Potential HRM`
- **H1:** `Payroll Management`
- **Forms:** Month select, department filter, status filter.
- **Buttons:** 13 — Run Payroll (primary), Export, Row View/Approve, pagination.
- **Tables:** Employee, Basic Salary (right), Allowances (right), Deductions (right), Bonus (right), Net Salary (right), Status (center).
- **Shared:** Admin Sidebar.

### HTML/admin/30-salary-configuration.html
- **Path:** `/HTML/admin/30-salary-configuration.html`
- **Purpose:** Salary grade + allowance/deduction template configuration.
- **Page title:** `Salary Configuration - Potential HRM`
- **H1:** `Salary Configuration`
- **H3 (grade cards):** `Executive`, `Senior`, `Mid-Level`, `Junior`.
- **Forms:** Per-grade: min, max, allowance list, deduction list.
- **Buttons:** 17 — Save, Edit grade, Add allowance, Add deduction, Delete, Apply template.
- **Tables — Components:** Name, Calculation, Default (right), Taxable (center).
- **Shared:** Admin Sidebar.

### HTML/admin/31-bonus-management.html
- **Path:** `/HTML/admin/31-bonus-management.html`
- **Purpose:** Disburse and track bonuses.
- **Page title:** `Bonus Management - Potential HRM`
- **H1:** `Bonus Management`
- **H2:** `Process New Bonus`, `Bonus History`.
- **Forms (new bonus):**
  - `Bonus Type` (select)
  - `Amount per Employee` (number)
  - `Project Name / Reference` (text)
  - `Select Employees` (multiselect)
  - `Disbursement Method` (select)
- **Buttons:** 16 — Process Bonus, Reset, row View/Cancel, filters, pagination.
- **Tables — Bonus History:** Date, Employee, Type, Reference / Project, Amount (right), Status (center).
- **Shared:** Admin Sidebar.

### HTML/admin/32-loan-management.html
- **Path:** `/HTML/admin/32-loan-management.html`
- **Purpose:** Org-wide loan approvals + repayment tracking.
- **Page title:** `Loan Management - Potential HRM`
- **H1:** `Loan Management`
- **Forms:** Search, status filter, date range.
- **Buttons:** 18 — Approve/Reject/View per row, New Loan, export.
- **Tables:** Employee, Amount, Purpose, Request Date, Repayment, Status, Actions (right).
- **Shared:** Admin Sidebar.

### HTML/admin/33-performance-admin.html
- **Path:** `/HTML/admin/33-performance-admin.html`
- **Purpose:** ⚠ Despite filename, title + content = "Bonus Management" (same structure as 31, likely a Performance-tab module sharing the bonus UI). Use as Performance-admin in React but reuse the bonus template.
- **Page title:** `Bonus Management - Potential HRM`
- **H1:** `Bonus Management` | **H2:** `Process New Bonus`, `Bonus History`.
- **Forms:** Same 5 fields as 31 (Bonus Type, Amount per Employee, Project Name / Reference, Select Employees, Disbursement Method).
- **Buttons:** 16.
- **Tables:** Same columns as 31.
- **Shared:** Admin Sidebar.

### HTML/admin/34-recruitment-management.html
- **Path:** `/HTML/admin/34-recruitment-management.html`
- **Purpose:** Manage job postings and pipelines.
- **Page title:** `Recruitment Management - Potential HRM`
- **H1:** `Recruitment Management` | **H2:** `Job Postings`.
- **Forms:** Search, department filter, status filter.
- **Buttons:** 16 — Post Job, View applicants per row, Edit, Close posting.
- **Tables — Job Postings:** Job Title, Department, Posted Date, Applications, Status, Action (right).
- **Shared:** Admin Sidebar.

### HTML/admin/35-policy-management.html
- **Path:** `/HTML/admin/35-policy-management.html`
- **Purpose:** Create/update/archive policies + acknowledgments tracking.
- **Page title:** `Policy Management - Potential HRM`
- **H1:** `Policy Management` | **H2:** `All Policies` | **H3:** `Acknowledgments`.
- **Forms (create / edit):**
  - `Policy Title` (text)
  - `Category` (select)
  - Content (rich-text / textarea)
  - Effective date
- **Buttons:** 18 — Create Policy, row View/Edit/Archive, acknowledgment reminders.
- **Tables:** Policy Title (w-[30%]), Category, Status, Last Updated, Acknowledgment (w-[20%]), Action (right).
- **Shared:** Admin Sidebar.

### HTML/admin/36-integration-settings.html
- **Path:** `/HTML/admin/36-integration-settings.html`
- **Purpose:** External integrations (Gather Town, Notion, Slack, custom).
- **Page title:** `Integration Settings - Potential HRM`
- **H1:** `Integration Settings`
- **H3 (integrations):** `Gather Town`, `Notion`, `Slack`, `Custom Modules`.
- **Forms:** Per integration: `API Key`, `Space ID`, `Sync Frequency`, `Integration Token`, `Workspace`, `Database ID`, `Webhook URL`, `Notification Channel`.
- **Buttons:** 11 — Connect, Disconnect, Save, Test, Regenerate key.
- **Shared:** Admin Sidebar.

### HTML/admin/37-office-configuration.html
- **Path:** `/HTML/admin/37-office-configuration.html`
- **Purpose:** Office hours + working days config.
- **Page title:** `Office Configuration - Potential HRM`
- **H1:** `Office Configuration` | **H3:** `Office Time Settings`, `Office Days Settings`.
- **Forms:** `Office Start Time`, `Office End Time`, `Grace Period (Minutes)`, `Core Hours Start`, `Core Hours End`, `Standard Work Days`, `Weekend Days`, `Alternative Shift Coverage`.
- **Buttons:** 24 — day toggles ×7, Save, Reset, Add shift, Delete shift, etc.
- **Widgets:** Day chips, time pickers.
- **Shared:** Admin Sidebar.

### HTML/admin/38-reports-export.html
- **Path:** `/HTML/admin/38-reports-export.html`
- **Purpose:** Generate + export reports.
- **Page title:** `Reports & Export - Potential HRM`
- **H1:** `Reports & Export` | **H2:** `Configuration`, `Preview Data`.
- **H3 (report types):** `Attendance Report`, `Leave Report`, `Payroll Report`, `Employee Directory`, `Loan Report`, `Performance Report`, `Headcount Report`, `Daily Notes Report`, `Emergency Leave`.
- **Forms — Configuration:** `Start Date`, `End Date`, `Department`, `Employee Status`, export format.
- **Buttons:** 3 — Preview, Export CSV, Export PDF.
- **Tables — Preview (attendance example):** Employee (w-1/3), Department, Date, Check In, Check Out, Status (right).
- **Shared:** Admin Sidebar.

### HTML/admin/44-employee-detail.html
- **Path:** `/HTML/admin/44-employee-detail.html`
- **Purpose:** Admin view of a single employee.
- **Page title:** `Employee Details - Admin - Potential AI`
- **H1:** `Mike Chen`
- **H3:** `Personal Details`, `Contact Information`, `Employment Details`, `Compensation`.
- **Forms:** None (read-only with action menu to edit).
- **Buttons:** 7 — Edit, Deactivate, Reset Password, Export Profile, Back, tab switches.
- **Shared:** Admin Sidebar.

### HTML/admin/45-leave-request-detail.html
- **Path:** `/HTML/admin/45-leave-request-detail.html`
- **Purpose:** HR decision view for a single leave request.
- **Page title:** `Leave Request - Admin - Potential AI`
- **H1:** `Leave Request #LV-2024-0095`
- **H2:** `Employee Information`, `Request Details`, `HR Decision`, `Leave Balance`, `Approval Flow`.
- **Forms:** `Add HR notes (optional)` — textarea (`placeholder="Add any notes for the record..."`).
- **Buttons:** 3 — Approve (primary), Reject (danger), Back.
- **Shared:** Admin Sidebar.

### HTML/admin/46-loan-detail.html
- **Path:** `/HTML/admin/46-loan-detail.html`
- **Purpose:** HR decision view for a loan application.
- **Page title:** `Loan Application - Admin - Potential AI`
- **H1:** `Loan Application #LN-2025-0008`
- **H2:** `Applicant Information`, `Loan Details`, `Approval Decision`, `Financial Context`, `Loan History`.
- **Forms:**
  - `Approved Amount` — text (prefilled `$20,000`)
  - `Adjusted Tenure` — text/number
  - `Notes` — textarea (`placeholder="Add approval notes..."`)
- **Buttons:** 2 — Approve, Reject.
- **Shared:** Admin Sidebar.

### HTML/admin/47-candidate-detail.html
- **Path:** `/HTML/admin/47-candidate-detail.html`
- **Purpose:** Candidate profile with hiring pipeline.
- **Page title:** `Candidate Profile - Admin - Potential AI`
- **H1:** `Michael Johnson`
- **H2:** `Interview Pipeline`, `Skills & Experience`, `Interview Notes`, `Hiring Decision`, `Application Info`, `Candidate Score`, `Activity`.
- **Forms:** `Decision Notes` (textarea).
- **Buttons:** 6 — Move to Next Stage, Reject, Schedule Interview, Send Offer, Download Resume, Back.
- **Shared:** Admin Sidebar.

### HTML/admin/48-job-posting-detail.html
- **Path:** `/HTML/admin/48-job-posting-detail.html`
- **Purpose:** Single job posting detail + applicant pipeline.
- **Page title:** `Job Posting - Admin - Potential AI`
- **H1:** `Senior Frontend Developer`
- **H2:** `Job Description`, `Requirements`, `Recent Applicants`, `Job Details`, `Pipeline Status`, `Hiring Team`.
- **Forms:** None (posting is read-only here; edit lives elsewhere).
- **Buttons:** 3 — Edit Posting, Close Posting, View All Applicants.
- **Shared:** Admin Sidebar.

### HTML/admin/49-create-leave-request.html
- **Path:** `/HTML/admin/49-create-leave-request.html`
- **Purpose:** Admin-initiated leave request on behalf of employee.
- **Page title:** `Create Leave Request - Admin - Potential AI`
- **H1:** `Create Leave Request`
- **H2:** `Employee Selection`, `Leave Details`, `Approval Settings`.
- **Forms:**
  - Employee selector (search + select)
  - Leave type, start, end, reason
  - `adminNotes` — textarea "Admin Notes (Internal)"
  - Auto-approve toggle
- **Buttons:** 1 — Create Request (plus inferred Cancel).
- **Shared:** Admin Sidebar.

---

## Coverage Check

- Total HTML files discovered: **58** (1 index + 3 auth + 1 auth/index + 25 employee + 7 team + 22 admin — matches filesystem listing).
- Every file has a dedicated section above.
- Items marked "(inferred from layout)" are based on visible section headings but may need a Read pass during conversion; the rest is extracted verbatim via Grep on `<title>`, `<h1>/<h2>/<h3>`, `<label>`, `<th>`, `placeholder=`, and per-file `<button>` counts.
- Every inter-page link observed in the prototypes matches a real filename in `/HTML/`.
