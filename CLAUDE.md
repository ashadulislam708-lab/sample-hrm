# sample-hrm - Project Configuration

## Overview

**Project**: sample-hrm
**Type**: Fullstack Web Application (HRM System)
**Status**: Development
**Version**: 1.1

Potential HRM Software is a comprehensive Human Resource Management System designed for Potential AI. It manages the complete employee lifecycle including attendance (with Gather Town auto-clock-in), leave management (with Slack emergency integration), payroll (loans, bonuses), performance reviews (Notion daily-notes integration), and recruitment.

**Key Differentiator**: Gather Town auto-attendance, Slack emergency leave thread updates, Notion-sourced daily notes for performance, configurable office/work-day policies without code changes, and an extensible module system for custom metrics.

---

## MANDATORY: Submodule Docs Are the Source of Truth

This project uses `.claude/react/` and `.claude/nestjs/` submodules that define **exact** coding patterns. You MUST read the relevant submodule doc BEFORE writing ANY code. Do not generate code from memory or invent your own patterns.

### Path Variable Resolution
- `$FRONTEND` = `react` → e.g., `.claude/$FRONTEND/docs/...` = `.claude/react/docs/...`
- `$BACKEND` = `nestjs` → e.g., `.claude/$BACKEND/guides/...` = `.claude/nestjs/guides/...`

### Before Writing Frontend Code

| Doc | When to Read |
|-----|-------------|
| `.claude/react/docs/file-organization.md` | Before creating ANY file — `app/` dir, `~/` alias |
| `.claude/react/docs/routing-guide.md` | RR7 framework mode, `route()`, `layout()`, `index()` |
| `.claude/react/docs/component-patterns.md` | Before writing any component |
| `.claude/react/docs/best-practices.md` | Coding standards |
| `.claude/react/docs/common-patterns.md` | Forms: React Hook Form + Zod + shadcn |
| `.claude/react/docs/data-fetching.md` | httpService.ts, httpMethods/, Redux thunk |
| `.claude/react/docs/api-integration.md` | Mapping screens to API endpoints |
| `.claude/react/docs/crud-operations.md` | createAsyncThunk for reads, direct calls for mutations |
| `.claude/react/docs/authentication-architecture.md` | Cookie auth, guards, withCredentials |
| `.claude/react/docs/auth-guards.md` | GuestGuard, AuthGuard, RoleGuard |
| `.claude/react/docs/typescript-standards.md` | strict mode, import type, Props interfaces |
| `.claude/react/docs/styling-guide.md` | Tailwind CSS 4, Shadcn/UI |
| `.claude/react/docs/loading-and-error-states.md` | Redux loading/error state patterns |

### Before Writing Backend Code

| Doc | When to Read |
|-----|-------------|
| `.claude/nestjs/guides/architecture-overview.md` | 4-layer pattern, base classes, main.ts |
| `.claude/nestjs/guides/best-practices.md` | Coding standards |
| `.claude/nestjs/guides/routing-and-controllers.md` | Before writing controllers |
| `.claude/nestjs/guides/services-and-repositories.md` | Before writing services |
| `.claude/nestjs/guides/database-patterns.md` | Before writing entities |
| `.claude/nestjs/guides/validation-patterns.md` | Before writing DTOs |
| `.claude/nestjs/guides/authentication-cookies.md` | JWT, httpOnly cookies, token rotation |
| `.claude/nestjs/guides/setup-role-base-access.md` | RBAC — roles, guards, JWT |
| `.claude/nestjs/guides/configuration.md` | UnifiedConfig for env/secrets |
| `.claude/nestjs/guides/workflow-design-database.md` | TypeORM + PostgreSQL schema |

### Key Patterns (Do NOT Deviate)

**Frontend:**
- React Router 7 **framework mode** (NOT library mode, NOT `createBrowserRouter`)
- Entry point: `root.tsx` (NOT `main.tsx`)
- Route config: `routes.ts` with `route()`, `layout()`, `index()` from `@react-router/dev/routes`
- Imports from `react-router` (NOT `react-router-dom`)
- Data fetching: Redux `createAsyncThunk` in service files (NOT TanStack Query)
- Source directory: `app/` (NOT `src/`)
- Import alias: `~/` (NOT `@/`)

**Backend:**
- NestJS 4-layer: Controller → Service → Repository → Entity
- ALL layers extend base classes from `src/core/base/`
- Guards, decorators, filters in `src/core/` (NOT inside feature modules)
- JWT via httpOnly cookies (NEVER localStorage)
- Repository pattern via TypeORM (NEVER query directly in services)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | NestJS (11.x+) |
| Frontend | React 19.2.5 |
| Admin Dashboard | React (same app, role-based routes) |
| Database | PostgreSQL |
| ORM | TypeORM |
| Authentication | JWT httpOnly cookies |
| Deployment | Docker |

---

## User Roles

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| Guest | Unauthenticated visitor | View public pages, Login, Forgot password |
| Employee | Staff using self-service HR | Clock-in, apply leave/loan, view payslip, track performance |
| Team Leader | Department/team head | All employee rights + approve team leave/late-attendance/shift, evaluate team performance |
| HR Admin | HR personnel | Full system access: manage employees, payroll, policies, recruitment, integrations, office config |

### Core Enums

| Enum | Values |
|------|--------|
| RoleEnum | `employee`, `team_leader`, `hr_admin` |
| UserStatusEnum | `active`, `suspended`, `terminated` |
| LeaveTypeEnum | `casual`, `sick`, `half_day`, `emergency` |
| LeaveStatusEnum | `pending`, `approved`, `rejected`, `cancelled` |
| AttendanceSourceEnum | `gather`, `manual` |
| AttendanceStatusEnum | `on_time`, `late_grace`, `late`, `absent` |
| LoanStatusEnum | `pending`, `approved`, `active`, `completed`, `rejected` |
| BonusTypeEnum | `project`, `festival` |
| ReviewCycleStatusEnum | `draft`, `active`, `closed` |

---

## Project Structure

```
sample-hrm/
├── backend/                      # NestJS API
│   └── src/
│       ├── core/                # base/, decorators/, guards/, filters/, interceptors/, pipes/
│       ├── modules/             # auth/, users/, attendance/, leave/, payroll/, loan/, bonus/,
│       │                        # performance/, policy/, recruitment/, office-config/, module-config/
│       ├── infrastructure/      # mail/, slack/, gather-town/, notion/, s3/, token/
│       └── database/            # migrations/, seeders/
├── frontend/                    # React 19 + RR7 (employee + team leader + admin in one app)
│   └── app/
│       ├── components/          # ui/, atoms/, modals/, shared/, layouts/, guards/
│       ├── pages/               # auth/, employee/, team/, admin/
│       ├── services/            # httpService.ts, httpMethods/, httpServices/
│       ├── redux/               # features/, store/
│       └── routes/              # auth.routes.ts, employee.routes.ts, team.routes.ts, admin.routes.ts
├── .claude/                     # Claude configuration (submodule root)
├── .claude-project/             # Project documentation
└── docker-compose.yml
```

---

## Git Rules

- Branch from `dev`, PR to `dev`, never push directly to `main`
- Branch naming: `feature/<name>`, `fix/<name>`, `chore/<name>`
- Commit messages: imperative mood, concise

---

## Key Documentation

| Document | Path |
|----------|------|
| Project Knowledge | [.claude-project/docs/PROJECT_KNOWLEDGE.md](.claude-project/docs/PROJECT_KNOWLEDGE.md) |
| API Documentation | [.claude-project/docs/PROJECT_API.md](.claude-project/docs/PROJECT_API.md) |
| Database Schema | [.claude-project/docs/PROJECT_DATABASE.md](.claude-project/docs/PROJECT_DATABASE.md) |
| API Integration | [.claude-project/docs/PROJECT_API_INTEGRATION.md](.claude-project/docs/PROJECT_API_INTEGRATION.md) |
| Pipeline Status | [.claude-project/status/sample-hrm/PIPELINE_STATUS.md](.claude-project/status/sample-hrm/PIPELINE_STATUS.md) |
| PRD | [prd.md](prd.md) |
| HTML Prototypes | [HTML/](HTML/) |

---

## API Base URLs

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:3000/api` |
| Production | `https://api.sample-hrm.com/api` |

---

## Authentication Flow

- JWT via httpOnly cookies (NEVER localStorage)
- Access Token: 1h expiry
- Refresh Token: 7d expiry
- Cookie config: `httpOnly: true, secure: true, sameSite: 'strict'`

---

## Design System

- **Primary Color**: TBD from DESIGN_SYSTEM.md (HTML prototypes exist in `HTML/` — cataloged in Phase 3)
- **HTML Source of Truth**: MODE A (prototypes provided) — see rule RULE-F7

---

## Third-Party Integrations

| Integration | Purpose | Type |
|-------------|---------|------|
| Gather Town | Auto attendance tracking | API |
| Notion | Daily note tracking for performance | API |
| Slack | Emergency leave notifications + thread updates | Webhook |
| Custom Modules | Extensible performance/reporting | Configurable API |

---

*Last Updated: 2026-04-20*
