# PROJECT_DATABASE.md - Potential HRM

Database layer for the Potential HRM Software. TypeORM + PostgreSQL. All entities extend `BaseEntity` (UUID `id`, `createdAt`, `updatedAt`, `deletedAt` for soft delete).

## Conventions

- UUID primary keys via `@PrimaryGeneratedColumn('uuid')`
- Snake_case column names via `@Column({ name: 'snake_case' })`
- Soft delete enabled globally (BaseEntity)
- Enum columns use PostgreSQL native `enum` types with shared TS enums in `src/common/enums/`
- Timestamp columns: `created_at`, `updated_at`, `deleted_at`
- Foreign keys suffix: `_id` (e.g., `user_id`, `payroll_run_id`)
- Lookup fields (`email`, `status`, `role`, dates, FKs) have `@Index`

## ER Summary (Entities)

| Entity | Table | Purpose |
|---|---|---|
| `User` | users | Employees, team leaders, HR admins; self-referencing team leader FK |
| `RefreshToken` | refresh_tokens | JWT refresh token rotation, 1:N from User |
| `Attendance` | attendance | Daily attendance records (Gather/manual) with unique (user,date) |
| `LateRequest` | late_requests | Late attendance approval workflow linked to Attendance |
| `LeaveRequest` | leave_requests | Casual/Sick/Half-Day/Emergency leave with approval workflow |
| `LeaveBalance` | leave_balances | Per-user/year casual+sick allocations, used, remaining |
| `ShiftRequest` | shift_requests | Alternative work day shift (e.g., Fri-Sun) application |
| `LoanApplication` | loan_applications | Salary loan lifecycle (pending/approved/active/completed/rejected) |
| `LoanRepayment` | loan_repayments | Monthly loan repayment tied to Payroll |
| `PayrollRun` | payroll_runs | Monthly payroll batch with unique (month,year) |
| `Payslip` | payslips | Per-employee payslip line items (allowances/deductions/bonuses/net) |
| `Bonus` | bonuses | Project-based / festival bonuses, optionally linked to a payroll run |
| `Goal` | goals | Performance goals set by team leaders, progress tracked |
| `DailyNote` | daily_notes | Notion-sourced daily notes; unique (user, note_date) |
| `ProjectEvaluation` | project_evaluations | PM evaluation at project close (5 dimensions) |
| `ReviewCycle` | review_cycles | Formal review cycle container |
| `PerformanceReview` | performance_reviews | Individual review within a cycle (1-5 rating) |
| `Policy` | policies | Company policies with slug, version, status |
| `PolicyAcknowledgement` | policy_acknowledgements | User acknowledgement of policy; unique (user,policy) |
| `JobPosting` | job_postings | Recruitment job posting |
| `Candidate` | candidates | Applicant per job posting |
| `Interview` | interviews | Interview session scheduled for a candidate |
| `OfficeConfig` | office_config | Key-value editable office settings (start/end/core/grace/days) |
| `CustomModule` | custom_modules | Extensibility: configurable performance/data modules |
| `IntegrationConfig` | integration_configs | Integration credentials per provider (gather/notion/slack/custom) |
| `Notification` | notifications | In-app notifications per user |
| `AuditLog` | audit_logs | Immutable audit trail for changes |

Total: 27 entities / tables.

## Relationships (Text Diagram)

```
User 1-N User                         (team leader self-FK, SET NULL)
User 1-N RefreshToken                 (CASCADE)
User 1-N Attendance                   (CASCADE) - UNIQUE(user_id, date)
User 1-N LateRequest                  (CASCADE)
Attendance 1-N LateRequest            (CASCADE)
User (reviewer) 1-N LateRequest       (SET NULL)
User 1-N LeaveRequest                 (CASCADE)
User (approver) 1-N LeaveRequest      (SET NULL)
User 1-N LeaveBalance                 (CASCADE) - UNIQUE(user_id, year)
User 1-N ShiftRequest                 (CASCADE)
User (approver) 1-N ShiftRequest      (SET NULL)
User 1-N LoanApplication              (CASCADE)
User (approver) 1-N LoanApplication   (SET NULL)
LoanApplication 1-N LoanRepayment     (CASCADE)
PayrollRun 1-N LoanRepayment          (SET NULL)
PayrollRun 1-N Payslip                (CASCADE)
User 1-N Payslip                      (CASCADE)
PayrollRun 1-N Bonus                  (SET NULL)
User 1-N Bonus                        (CASCADE)
User (awarder) 1-N Bonus              (SET NULL)
User 1-N Goal                         (CASCADE)
User (setter) 1-N Goal                (SET NULL)
User 1-N DailyNote                    (CASCADE) - UNIQUE(user_id, note_date)
User 1-N ProjectEvaluation            (CASCADE)
User (evaluator) 1-N ProjectEvaluation (CASCADE)
ReviewCycle 1-N PerformanceReview     (CASCADE)
User 1-N PerformanceReview            (CASCADE)
User (reviewer) 1-N PerformanceReview (CASCADE)
Policy 1-N PolicyAcknowledgement      (CASCADE)
User 1-N PolicyAcknowledgement        (CASCADE) - UNIQUE(user_id, policy_id)
User (publisher) 1-N Policy           (SET NULL)
JobPosting 1-N Candidate              (CASCADE)
Candidate 1-N Interview               (CASCADE)
User (poster) 1-N JobPosting          (SET NULL)
User 1-N Notification                 (CASCADE)
User 1-N AuditLog                     (SET NULL)
User (updater) 1-N OfficeConfig       (SET NULL)
User (updater) 1-N IntegrationConfig  (SET NULL) - UNIQUE(provider)
User (creator) 1-N CustomModule       (SET NULL)
```

## Indexes

### Primary Lookup
- `users.email` (UNIQUE + INDEX), `users.role`, `users.status`, `users.department`, `users.team_leader_id`
- `refresh_tokens.token` (UNIQUE + INDEX), `refresh_tokens.user_id`
- `attendance.user_id`, `attendance.date`, `attendance.status` + UNIQUE(user_id, date)
- `late_requests.user_id`, `late_requests.attendance_id`, `late_requests.status`
- `leave_requests.user_id`, `leave_requests.leave_type`, `leave_requests.status`, `leave_requests.start_date`
- `leave_balances.user_id`, `leave_balances.year` + UNIQUE(user_id, year)
- `shift_requests.user_id`, `shift_requests.status`
- `loan_applications.user_id`, `loan_applications.status`
- `loan_repayments.loan_id`, `loan_repayments.payroll_id`
- `payroll_runs.month`, `payroll_runs.year`, `payroll_runs.status` + UNIQUE(month, year)
- `payslips.user_id`, `payslips.payroll_run_id`
- `bonuses.user_id`, `bonuses.type`, `bonuses.payroll_run_id`
- `goals.user_id`
- `daily_notes.user_id`, `daily_notes.note_date` + UNIQUE(user_id, note_date)
- `project_evaluations.user_id`, `project_evaluations.evaluator_id`
- `review_cycles.status`
- `performance_reviews.user_id`, `performance_reviews.cycle_id`, `performance_reviews.reviewer_id`
- `policies.slug` (UNIQUE + INDEX), `policies.category`, `policies.status`
- `policy_acknowledgements.user_id`, `policy_acknowledgements.policy_id` + UNIQUE(user_id, policy_id)
- `job_postings.department`, `job_postings.status`
- `candidates.job_posting_id`, `candidates.email`, `candidates.status`
- `interviews.candidate_id`
- `office_config.key` (UNIQUE + INDEX)
- `custom_modules.name`, `custom_modules.status`
- `integration_configs.provider` (UNIQUE + INDEX)
- `notifications.user_id`, `notifications.type`, `notifications.read_at`
- `audit_logs.user_id`, `audit_logs.entity_type`, `audit_logs.entity_id`, `audit_logs.action`

## Migration Strategy

- **Tool:** TypeORM QueryRunner migrations
- **Location:** `backend/src/database/migrations/`
- **Initial migration:** `1700000000000-InitialSchema.ts` - creates all 20 enum types and 27 tables with FKs and indexes in dependency order (users first, then dependents)
- **Naming:** `<timestamp>-<DescriptiveName>.ts`
- **Process:** Generate further migrations via `npm run migration:generate` as entities evolve; never use `synchronize: true` in any non-dev environment
- **Rollback:** Each migration must implement `down()` that reverses `up()` in inverse order (drop tables, then enums)
- **Extension:** Migration enables `uuid-ossp` extension for `uuid_generate_v4()`

## Seed Data Approach

- **Location:** `backend/src/database/seeders/`
- **Idempotent:** Seeders `findOne` by natural key before inserting - re-running is safe
- **initial-office-config.seeder.ts** - seeds office configuration keys with defaults from PRD:
  - `officeStartTime=08:00`, `officeEndTime=17:00`
  - `coreHoursStart=08:00`, `coreHoursEnd=13:00`
  - `gracePeriodMinutes=10`
  - `workDays=[mon..fri]`, `weekendDays=[sat,sun]`, `altShiftDays=[fri..sun]`
  - Also seeds empty `integration_configs` rows for `gather`, `notion`, `slack`
- **User/fixture seeder** (to be added alongside auth module): reads `.claude-project/user_stories/_fixtures.yaml` `users` section, bcrypt hashes passwords, upserts `users` rows plus minimum `leave_balances` and a sample `policy` per PRD policy list
- **Execution order:** users -> office_config -> integration_configs -> policies -> leave_balances -> sample domain data
