import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000000 implements MigrationInterface {
  name = 'InitialSchema1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // uuid-ossp for uuid_generate_v4()
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // ===== ENUM TYPES =====
    await queryRunner.query(
      `CREATE TYPE "role_enum" AS ENUM('employee','team_leader','hr_admin')`,
    );
    await queryRunner.query(
      `CREATE TYPE "user_status_enum" AS ENUM('active','suspended','terminated')`,
    );
    await queryRunner.query(
      `CREATE TYPE "leave_type_enum" AS ENUM('casual','sick','half_day','emergency')`,
    );
    await queryRunner.query(
      `CREATE TYPE "leave_status_enum" AS ENUM('pending','approved','rejected','cancelled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "leave_duration_enum" AS ENUM('full_day','half_day_first','half_day_second')`,
    );
    await queryRunner.query(
      `CREATE TYPE "attendance_source_enum" AS ENUM('gather','manual')`,
    );
    await queryRunner.query(
      `CREATE TYPE "attendance_status_enum" AS ENUM('on_time','late_grace','late','absent','holiday','leave')`,
    );
    await queryRunner.query(
      `CREATE TYPE "late_request_status_enum" AS ENUM('pending','approved','rejected')`,
    );
    await queryRunner.query(
      `CREATE TYPE "loan_status_enum" AS ENUM('pending','approved','active','completed','rejected')`,
    );
    await queryRunner.query(
      `CREATE TYPE "bonus_type_enum" AS ENUM('project','festival')`,
    );
    await queryRunner.query(
      `CREATE TYPE "payroll_status_enum" AS ENUM('draft','review','approved','disbursed')`,
    );
    await queryRunner.query(
      `CREATE TYPE "policy_status_enum" AS ENUM('draft','active','archived')`,
    );
    await queryRunner.query(
      `CREATE TYPE "shift_status_enum" AS ENUM('pending','approved','rejected')`,
    );
    await queryRunner.query(
      `CREATE TYPE "job_posting_status_enum" AS ENUM('draft','active','closed')`,
    );
    await queryRunner.query(
      `CREATE TYPE "application_status_enum" AS ENUM('new','shortlisted','interview','hired','rejected')`,
    );
    await queryRunner.query(
      `CREATE TYPE "review_cycle_status_enum" AS ENUM('draft','active','closed')`,
    );
    await queryRunner.query(
      `CREATE TYPE "rating_scale_enum" AS ENUM('one','two','three','four','five')`,
    );
    await queryRunner.query(
      `CREATE TYPE "notification_type_enum" AS ENUM('leave_approval','late_attendance','loan_approval','policy_update','emergency_leave','review_reminder')`,
    );
    await queryRunner.query(
      `CREATE TYPE "module_status_enum" AS ENUM('enabled','disabled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "integration_provider_enum" AS ENUM('gather','notion','slack','custom')`,
    );

    // ===== TABLES =====
    // users
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "email" varchar(255) NOT NULL,
        "password" varchar(255) NOT NULL,
        "full_name" varchar(255) NOT NULL,
        "phone" varchar(50),
        "department" varchar(120),
        "position" varchar(120),
        "role" "role_enum" NOT NULL DEFAULT 'employee',
        "status" "user_status_enum" NOT NULL DEFAULT 'active',
        "joining_date" date,
        "team_leader_id" uuid,
        "salary" decimal(12,2) NOT NULL DEFAULT 0,
        "bank_details" jsonb,
        "avatar_url" varchar(500),
        "gather_town_email" varchar(255),
        "notion_user_id" varchar(255),
        "last_login_at" TIMESTAMP,
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_users_email" ON "users" ("email")`);
    await queryRunner.query(`CREATE INDEX "IDX_users_role" ON "users" ("role")`);
    await queryRunner.query(`CREATE INDEX "IDX_users_status" ON "users" ("status")`);
    await queryRunner.query(`CREATE INDEX "IDX_users_team_leader" ON "users" ("team_leader_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_users_department" ON "users" ("department")`);
    await queryRunner.query(`
      ALTER TABLE "users" ADD CONSTRAINT "FK_users_team_leader"
      FOREIGN KEY ("team_leader_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);

    // refresh_tokens
    await queryRunner.query(`
      CREATE TABLE "refresh_tokens" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "token" varchar(512) NOT NULL,
        "user_id" uuid NOT NULL,
        "expires_at" TIMESTAMP NOT NULL,
        "created_by_ip" varchar(64),
        "revoked_at" TIMESTAMP,
        CONSTRAINT "UQ_refresh_tokens_token" UNIQUE ("token"),
        CONSTRAINT "PK_refresh_tokens" PRIMARY KEY ("id"),
        CONSTRAINT "FK_refresh_tokens_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_refresh_tokens_user" ON "refresh_tokens" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_refresh_tokens_token" ON "refresh_tokens" ("token")`);

    // attendance
    await queryRunner.query(`
      CREATE TABLE "attendance" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" uuid NOT NULL,
        "date" date NOT NULL,
        "clock_in_time" TIMESTAMP,
        "clock_out_time" TIMESTAMP,
        "source" "attendance_source_enum" NOT NULL DEFAULT 'manual',
        "status" "attendance_status_enum" NOT NULL DEFAULT 'on_time',
        "late_minutes" int NOT NULL DEFAULT 0,
        "notes" text,
        CONSTRAINT "UQ_attendance_user_date" UNIQUE ("user_id","date"),
        CONSTRAINT "PK_attendance" PRIMARY KEY ("id"),
        CONSTRAINT "FK_attendance_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_attendance_user" ON "attendance" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_attendance_date" ON "attendance" ("date")`);
    await queryRunner.query(`CREATE INDEX "IDX_attendance_status" ON "attendance" ("status")`);

    // late_requests
    await queryRunner.query(`
      CREATE TABLE "late_requests" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" uuid NOT NULL,
        "attendance_id" uuid NOT NULL,
        "reason" text NOT NULL,
        "status" "late_request_status_enum" NOT NULL DEFAULT 'pending',
        "reviewed_by_id" uuid,
        "reviewed_at" TIMESTAMP,
        "decision_note" text,
        CONSTRAINT "PK_late_requests" PRIMARY KEY ("id"),
        CONSTRAINT "FK_late_requests_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_late_requests_attendance" FOREIGN KEY ("attendance_id") REFERENCES "attendance"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_late_requests_reviewer" FOREIGN KEY ("reviewed_by_id") REFERENCES "users"("id") ON DELETE SET NULL
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_late_requests_user" ON "late_requests" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_late_requests_attendance" ON "late_requests" ("attendance_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_late_requests_status" ON "late_requests" ("status")`);

    // leave_requests
    await queryRunner.query(`
      CREATE TABLE "leave_requests" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" uuid NOT NULL,
        "leave_type" "leave_type_enum" NOT NULL,
        "duration" "leave_duration_enum" NOT NULL DEFAULT 'full_day',
        "start_date" date NOT NULL,
        "end_date" date NOT NULL,
        "reason" text NOT NULL,
        "status" "leave_status_enum" NOT NULL DEFAULT 'pending',
        "estimated_return_time" TIMESTAMP,
        "contact_availability" varchar(255),
        "approved_by_id" uuid,
        "approved_at" TIMESTAMP,
        "decision_note" text,
        "slack_thread_ts" varchar(128),
        "returned_at" TIMESTAMP,
        CONSTRAINT "PK_leave_requests" PRIMARY KEY ("id"),
        CONSTRAINT "FK_leave_requests_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_leave_requests_approver" FOREIGN KEY ("approved_by_id") REFERENCES "users"("id") ON DELETE SET NULL
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_leave_requests_user" ON "leave_requests" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_leave_requests_type" ON "leave_requests" ("leave_type")`);
    await queryRunner.query(`CREATE INDEX "IDX_leave_requests_status" ON "leave_requests" ("status")`);
    await queryRunner.query(`CREATE INDEX "IDX_leave_requests_start" ON "leave_requests" ("start_date")`);

    // leave_balances
    await queryRunner.query(`
      CREATE TABLE "leave_balances" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" uuid NOT NULL,
        "year" int NOT NULL,
        "casual_allocated" decimal(5,2) NOT NULL DEFAULT 0,
        "casual_used" decimal(5,2) NOT NULL DEFAULT 0,
        "casual_remaining" decimal(5,2) NOT NULL DEFAULT 0,
        "sick_allocated" decimal(5,2) NOT NULL DEFAULT 0,
        "sick_used" decimal(5,2) NOT NULL DEFAULT 0,
        "sick_remaining" decimal(5,2) NOT NULL DEFAULT 0,
        CONSTRAINT "UQ_leave_balance_user_year" UNIQUE ("user_id","year"),
        CONSTRAINT "PK_leave_balances" PRIMARY KEY ("id"),
        CONSTRAINT "FK_leave_balances_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_leave_balances_user" ON "leave_balances" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_leave_balances_year" ON "leave_balances" ("year")`);

    // shift_requests
    await queryRunner.query(`
      CREATE TABLE "shift_requests" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" uuid NOT NULL,
        "requested_days" jsonb NOT NULL,
        "reason" text NOT NULL,
        "status" "shift_status_enum" NOT NULL DEFAULT 'pending',
        "approved_by_id" uuid,
        "approved_at" TIMESTAMP,
        "effective_from" date,
        CONSTRAINT "PK_shift_requests" PRIMARY KEY ("id"),
        CONSTRAINT "FK_shift_requests_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_shift_requests_approver" FOREIGN KEY ("approved_by_id") REFERENCES "users"("id") ON DELETE SET NULL
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_shift_requests_user" ON "shift_requests" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_shift_requests_status" ON "shift_requests" ("status")`);

    // loan_applications
    await queryRunner.query(`
      CREATE TABLE "loan_applications" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" uuid NOT NULL,
        "amount" decimal(12,2) NOT NULL,
        "reason" text NOT NULL,
        "tenure_months" int NOT NULL,
        "monthly_installment" decimal(12,2) NOT NULL,
        "status" "loan_status_enum" NOT NULL DEFAULT 'pending',
        "approved_by_id" uuid,
        "approved_at" TIMESTAMP,
        "disbursed_at" TIMESTAMP,
        "completed_at" TIMESTAMP,
        "outstanding_balance" decimal(12,2) NOT NULL DEFAULT 0,
        CONSTRAINT "PK_loan_applications" PRIMARY KEY ("id"),
        CONSTRAINT "FK_loan_applications_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_loan_applications_approver" FOREIGN KEY ("approved_by_id") REFERENCES "users"("id") ON DELETE SET NULL
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_loan_applications_user" ON "loan_applications" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_loan_applications_status" ON "loan_applications" ("status")`);

    // payroll_runs (before loan_repayments / payslips / bonuses)
    await queryRunner.query(`
      CREATE TABLE "payroll_runs" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "month" int NOT NULL,
        "year" int NOT NULL,
        "status" "payroll_status_enum" NOT NULL DEFAULT 'draft',
        "total_amount" decimal(14,2) NOT NULL DEFAULT 0,
        "created_by_id" uuid,
        "approved_by_id" uuid,
        "approved_at" TIMESTAMP,
        "disbursed_at" TIMESTAMP,
        CONSTRAINT "UQ_payroll_month_year" UNIQUE ("month","year"),
        CONSTRAINT "PK_payroll_runs" PRIMARY KEY ("id"),
        CONSTRAINT "FK_payroll_runs_creator" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL,
        CONSTRAINT "FK_payroll_runs_approver" FOREIGN KEY ("approved_by_id") REFERENCES "users"("id") ON DELETE SET NULL
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_payroll_runs_month" ON "payroll_runs" ("month")`);
    await queryRunner.query(`CREATE INDEX "IDX_payroll_runs_year" ON "payroll_runs" ("year")`);
    await queryRunner.query(`CREATE INDEX "IDX_payroll_runs_status" ON "payroll_runs" ("status")`);

    // loan_repayments
    await queryRunner.query(`
      CREATE TABLE "loan_repayments" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "loan_id" uuid NOT NULL,
        "payroll_id" uuid,
        "amount" decimal(12,2) NOT NULL,
        "due_date" date NOT NULL,
        "paid_at" TIMESTAMP,
        "remaining_balance" decimal(12,2) NOT NULL DEFAULT 0,
        CONSTRAINT "PK_loan_repayments" PRIMARY KEY ("id"),
        CONSTRAINT "FK_loan_repayments_loan" FOREIGN KEY ("loan_id") REFERENCES "loan_applications"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_loan_repayments_payroll" FOREIGN KEY ("payroll_id") REFERENCES "payroll_runs"("id") ON DELETE SET NULL
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_loan_repayments_loan" ON "loan_repayments" ("loan_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_loan_repayments_payroll" ON "loan_repayments" ("payroll_id")`);

    // payslips
    await queryRunner.query(`
      CREATE TABLE "payslips" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" uuid NOT NULL,
        "payroll_run_id" uuid NOT NULL,
        "basic_salary" decimal(12,2) NOT NULL,
        "allowances" jsonb NOT NULL DEFAULT '{}',
        "deductions" jsonb NOT NULL DEFAULT '{}',
        "bonuses" jsonb NOT NULL DEFAULT '{}',
        "loan_deduction" decimal(12,2) NOT NULL DEFAULT 0,
        "net_salary" decimal(12,2) NOT NULL,
        "paid_at" TIMESTAMP,
        "bank_file_reference" varchar(255),
        CONSTRAINT "PK_payslips" PRIMARY KEY ("id"),
        CONSTRAINT "FK_payslips_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_payslips_run" FOREIGN KEY ("payroll_run_id") REFERENCES "payroll_runs"("id") ON DELETE CASCADE
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_payslips_user" ON "payslips" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_payslips_run" ON "payslips" ("payroll_run_id")`);

    // bonuses
    await queryRunner.query(`
      CREATE TABLE "bonuses" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" uuid NOT NULL,
        "type" "bonus_type_enum" NOT NULL,
        "amount" decimal(12,2) NOT NULL,
        "reason" text NOT NULL,
        "project_reference" varchar(255),
        "festival_name" varchar(120),
        "awarded_by_id" uuid,
        "awarded_at" TIMESTAMP NOT NULL,
        "payroll_run_id" uuid,
        CONSTRAINT "PK_bonuses" PRIMARY KEY ("id"),
        CONSTRAINT "FK_bonuses_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_bonuses_awarder" FOREIGN KEY ("awarded_by_id") REFERENCES "users"("id") ON DELETE SET NULL,
        CONSTRAINT "FK_bonuses_payroll" FOREIGN KEY ("payroll_run_id") REFERENCES "payroll_runs"("id") ON DELETE SET NULL
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_bonuses_user" ON "bonuses" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_bonuses_type" ON "bonuses" ("type")`);
    await queryRunner.query(`CREATE INDEX "IDX_bonuses_payroll" ON "bonuses" ("payroll_run_id")`);

    // goals
    await queryRunner.query(`
      CREATE TABLE "goals" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" uuid NOT NULL,
        "title" varchar(255) NOT NULL,
        "description" text,
        "target_date" date,
        "progress" int NOT NULL DEFAULT 0,
        "set_by_id" uuid,
        "status" varchar(50) NOT NULL DEFAULT 'active',
        CONSTRAINT "PK_goals" PRIMARY KEY ("id"),
        CONSTRAINT "FK_goals_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_goals_setter" FOREIGN KEY ("set_by_id") REFERENCES "users"("id") ON DELETE SET NULL
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_goals_user" ON "goals" ("user_id")`);

    // daily_notes
    await queryRunner.query(`
      CREATE TABLE "daily_notes" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" uuid NOT NULL,
        "note_date" date NOT NULL,
        "notion_page_id" varchar(255),
        "title" varchar(255),
        "summary" text,
        "tasks_completed" int NOT NULL DEFAULT 0,
        "blockers_reported" jsonb NOT NULL DEFAULT '[]',
        CONSTRAINT "UQ_daily_note_user_date" UNIQUE ("user_id","note_date"),
        CONSTRAINT "PK_daily_notes" PRIMARY KEY ("id"),
        CONSTRAINT "FK_daily_notes_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_daily_notes_user" ON "daily_notes" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_daily_notes_date" ON "daily_notes" ("note_date")`);

    // project_evaluations
    await queryRunner.query(`
      CREATE TABLE "project_evaluations" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" uuid NOT NULL,
        "project_name" varchar(255) NOT NULL,
        "evaluator_id" uuid NOT NULL,
        "quality" int NOT NULL,
        "timeliness" int NOT NULL,
        "collaboration" int NOT NULL,
        "problem_solving" int NOT NULL,
        "communication" int NOT NULL,
        "overall_rating" decimal(4,2) NOT NULL,
        "feedback" text,
        "completed_at" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_project_evaluations" PRIMARY KEY ("id"),
        CONSTRAINT "FK_project_evaluations_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_project_evaluations_evaluator" FOREIGN KEY ("evaluator_id") REFERENCES "users"("id") ON DELETE CASCADE
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_project_evaluations_user" ON "project_evaluations" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_project_evaluations_evaluator" ON "project_evaluations" ("evaluator_id")`);

    // review_cycles
    await queryRunner.query(`
      CREATE TABLE "review_cycles" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "title" varchar(255) NOT NULL,
        "period_start" date NOT NULL,
        "period_end" date NOT NULL,
        "status" "review_cycle_status_enum" NOT NULL DEFAULT 'draft',
        "created_by_id" uuid,
        CONSTRAINT "PK_review_cycles" PRIMARY KEY ("id"),
        CONSTRAINT "FK_review_cycles_creator" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_review_cycles_status" ON "review_cycles" ("status")`);

    // performance_reviews
    await queryRunner.query(`
      CREATE TABLE "performance_reviews" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" uuid NOT NULL,
        "cycle_id" uuid NOT NULL,
        "reviewer_id" uuid NOT NULL,
        "rating" "rating_scale_enum" NOT NULL,
        "strengths" text,
        "improvements" text,
        "feedback" text,
        "self_assessment" text,
        "submitted_at" TIMESTAMP,
        CONSTRAINT "PK_performance_reviews" PRIMARY KEY ("id"),
        CONSTRAINT "FK_performance_reviews_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_performance_reviews_cycle" FOREIGN KEY ("cycle_id") REFERENCES "review_cycles"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_performance_reviews_reviewer" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE CASCADE
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_performance_reviews_user" ON "performance_reviews" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_performance_reviews_cycle" ON "performance_reviews" ("cycle_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_performance_reviews_reviewer" ON "performance_reviews" ("reviewer_id")`);

    // policies
    await queryRunner.query(`
      CREATE TABLE "policies" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "title" varchar(255) NOT NULL,
        "slug" varchar(255) NOT NULL,
        "content" text NOT NULL,
        "category" varchar(120),
        "status" "policy_status_enum" NOT NULL DEFAULT 'draft',
        "version" int NOT NULL DEFAULT 1,
        "published_by_id" uuid,
        "published_at" TIMESTAMP,
        CONSTRAINT "UQ_policies_slug" UNIQUE ("slug"),
        CONSTRAINT "PK_policies" PRIMARY KEY ("id"),
        CONSTRAINT "FK_policies_publisher" FOREIGN KEY ("published_by_id") REFERENCES "users"("id") ON DELETE SET NULL
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_policies_slug" ON "policies" ("slug")`);
    await queryRunner.query(`CREATE INDEX "IDX_policies_category" ON "policies" ("category")`);
    await queryRunner.query(`CREATE INDEX "IDX_policies_status" ON "policies" ("status")`);

    // policy_acknowledgements
    await queryRunner.query(`
      CREATE TABLE "policy_acknowledgements" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" uuid NOT NULL,
        "policy_id" uuid NOT NULL,
        "acknowledged_at" TIMESTAMP NOT NULL,
        CONSTRAINT "UQ_policy_ack_user_policy" UNIQUE ("user_id","policy_id"),
        CONSTRAINT "PK_policy_acknowledgements" PRIMARY KEY ("id"),
        CONSTRAINT "FK_policy_ack_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_policy_ack_policy" FOREIGN KEY ("policy_id") REFERENCES "policies"("id") ON DELETE CASCADE
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_policy_ack_user" ON "policy_acknowledgements" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_policy_ack_policy" ON "policy_acknowledgements" ("policy_id")`);

    // job_postings
    await queryRunner.query(`
      CREATE TABLE "job_postings" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "title" varchar(255) NOT NULL,
        "department" varchar(120) NOT NULL,
        "description" text NOT NULL,
        "requirements" text NOT NULL,
        "status" "job_posting_status_enum" NOT NULL DEFAULT 'draft',
        "posted_by_id" uuid,
        "posted_at" TIMESTAMP,
        "closed_at" TIMESTAMP,
        CONSTRAINT "PK_job_postings" PRIMARY KEY ("id"),
        CONSTRAINT "FK_job_postings_poster" FOREIGN KEY ("posted_by_id") REFERENCES "users"("id") ON DELETE SET NULL
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_job_postings_department" ON "job_postings" ("department")`);
    await queryRunner.query(`CREATE INDEX "IDX_job_postings_status" ON "job_postings" ("status")`);

    // candidates
    await queryRunner.query(`
      CREATE TABLE "candidates" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "job_posting_id" uuid NOT NULL,
        "full_name" varchar(255) NOT NULL,
        "email" varchar(255) NOT NULL,
        "phone" varchar(50),
        "resume_url" varchar(500),
        "status" "application_status_enum" NOT NULL DEFAULT 'new',
        "current_stage" varchar(120),
        "notes" text,
        CONSTRAINT "PK_candidates" PRIMARY KEY ("id"),
        CONSTRAINT "FK_candidates_posting" FOREIGN KEY ("job_posting_id") REFERENCES "job_postings"("id") ON DELETE CASCADE
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_candidates_posting" ON "candidates" ("job_posting_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_candidates_email" ON "candidates" ("email")`);
    await queryRunner.query(`CREATE INDEX "IDX_candidates_status" ON "candidates" ("status")`);

    // interviews
    await queryRunner.query(`
      CREATE TABLE "interviews" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "candidate_id" uuid NOT NULL,
        "scheduled_at" TIMESTAMP NOT NULL,
        "interviewer_ids" jsonb NOT NULL DEFAULT '[]',
        "feedback" text,
        "rating" int,
        CONSTRAINT "PK_interviews" PRIMARY KEY ("id"),
        CONSTRAINT "FK_interviews_candidate" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE CASCADE
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_interviews_candidate" ON "interviews" ("candidate_id")`);

    // office_config
    await queryRunner.query(`
      CREATE TABLE "office_config" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "key" varchar(120) NOT NULL,
        "value" jsonb NOT NULL,
        "description" text,
        "updated_by_id" uuid,
        CONSTRAINT "UQ_office_config_key" UNIQUE ("key"),
        CONSTRAINT "PK_office_config" PRIMARY KEY ("id"),
        CONSTRAINT "FK_office_config_updater" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_office_config_key" ON "office_config" ("key")`);

    // custom_modules
    await queryRunner.query(`
      CREATE TABLE "custom_modules" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "name" varchar(255) NOT NULL,
        "description" text,
        "menu_placement" varchar(120),
        "data_source_url" varchar(500),
        "metrics_config" jsonb NOT NULL DEFAULT '{}',
        "weighting" decimal(5,2) NOT NULL DEFAULT 1,
        "status" "module_status_enum" NOT NULL DEFAULT 'enabled',
        "created_by_id" uuid,
        CONSTRAINT "PK_custom_modules" PRIMARY KEY ("id"),
        CONSTRAINT "FK_custom_modules_creator" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_custom_modules_name" ON "custom_modules" ("name")`);
    await queryRunner.query(`CREATE INDEX "IDX_custom_modules_status" ON "custom_modules" ("status")`);

    // integration_configs
    await queryRunner.query(`
      CREATE TABLE "integration_configs" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "provider" "integration_provider_enum" NOT NULL,
        "config_json" jsonb NOT NULL DEFAULT '{}',
        "connected" boolean NOT NULL DEFAULT false,
        "last_sync_at" TIMESTAMP,
        "updated_by_id" uuid,
        CONSTRAINT "UQ_integration_configs_provider" UNIQUE ("provider"),
        CONSTRAINT "PK_integration_configs" PRIMARY KEY ("id"),
        CONSTRAINT "FK_integration_configs_updater" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_integration_configs_provider" ON "integration_configs" ("provider")`);

    // notifications
    await queryRunner.query(`
      CREATE TABLE "notifications" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" uuid NOT NULL,
        "type" "notification_type_enum" NOT NULL,
        "title" varchar(255) NOT NULL,
        "message" text NOT NULL,
        "metadata" jsonb NOT NULL DEFAULT '{}',
        "read_at" TIMESTAMP,
        CONSTRAINT "PK_notifications" PRIMARY KEY ("id"),
        CONSTRAINT "FK_notifications_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_notifications_user" ON "notifications" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_notifications_type" ON "notifications" ("type")`);
    await queryRunner.query(`CREATE INDEX "IDX_notifications_read" ON "notifications" ("read_at")`);

    // audit_logs
    await queryRunner.query(`
      CREATE TABLE "audit_logs" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "user_id" uuid,
        "entity_type" varchar(120) NOT NULL,
        "entity_id" varchar(64) NOT NULL,
        "action" varchar(60) NOT NULL,
        "old_value" jsonb,
        "new_value" jsonb,
        "ip_address" varchar(64),
        "user_agent" varchar(500),
        CONSTRAINT "PK_audit_logs" PRIMARY KEY ("id"),
        CONSTRAINT "FK_audit_logs_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL
      )`);
    await queryRunner.query(`CREATE INDEX "IDX_audit_logs_user" ON "audit_logs" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_audit_logs_entity_type" ON "audit_logs" ("entity_type")`);
    await queryRunner.query(`CREATE INDEX "IDX_audit_logs_entity_id" ON "audit_logs" ("entity_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_audit_logs_action" ON "audit_logs" ("action")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse dependency order
    await queryRunner.query(`DROP TABLE IF EXISTS "audit_logs"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "notifications"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "integration_configs"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "custom_modules"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "office_config"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "interviews"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "candidates"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "job_postings"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "policy_acknowledgements"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "policies"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "performance_reviews"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "review_cycles"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "project_evaluations"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "daily_notes"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "goals"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "bonuses"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "payslips"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "loan_repayments"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "payroll_runs"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "loan_applications"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "shift_requests"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "leave_balances"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "leave_requests"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "late_requests"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "attendance"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "refresh_tokens"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);

    // Drop enums
    await queryRunner.query(`DROP TYPE IF EXISTS "integration_provider_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "module_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "notification_type_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "rating_scale_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "review_cycle_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "application_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "job_posting_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "shift_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "policy_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "payroll_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "bonus_type_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "loan_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "late_request_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "attendance_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "attendance_source_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "leave_duration_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "leave_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "leave_type_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "user_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "role_enum"`);
  }
}
