# Fullstack Pipeline Status - sample-hrm

## Configuration

```yaml
project: sample-hrm
created: 2026-04-20
last_run: 2026-04-20T17:36:28Z
generation: 1
pipeline_score: 0.93
quality_target: 0.95
seed_id: null
tech_stack:
  backend: nestjs
  frontends: [react]
  dashboards: [admin]
format_version: 3
mode: greenfield
skip_spec: true
prd_path: prd.md
html_prototypes: HTML/
```

## Progress

| Phase | Status | Score | Output | Loop Runs | Gate Run At | Notes |
|-------|--------|-------|--------|------------|-------------|-------|
| spec | Skipped | - | - | 0 | - | --skip-spec flag |
| init | Complete | 1.00 | CLAUDE.md + scaffold + docker-compose | 1 | 2026-04-20 | - |
| prd | Complete | 0.95 | PROJECT_KNOWLEDGE.md, PROJECT_API.md (207 endpoints), 41 user stories | 1 | 2026-04-20 | - |
| user-stories | Complete | 0.80 | 41 YAMLs + _fixtures + global-patterns | 1 | 2026-04-20 | Generated in Phase 2 |
| design | Complete | 0.95 | DESIGN_SYSTEM.md, HTML_STRUCTURE_INVENTORY.md (58 files), DESIGN_STATUS.md | 1 | 2026-04-20 | MODE A — approved |
| database | Complete | 0.95 | 27 entities, 20 enums, base classes, migration | 1 | 2026-04-20 | - |
| backend | Complete | 0.80 | 18 modules, 144 files, TypeORM + JWT cookies + Slack/Gather/Notion infra | 1 | 2026-04-20 | Not yet type-checked; some TODOs (office-config DI wiring) |
| frontend | Complete | .93 | 29/31 checks passed | 0 | 2026-04-20T17:36:28Z | gate-runner |
| frontend | Pending | - | - | 0 | - | - |
| integrate | Pending | - | - | 0 | - | - |
| test-api | Pending | - | - | 0 | - | - |
| test-browser | Pending | - | - | 0 | - | - |
| ship | Pending | - | - | 0 | - | - |

## Generation Log

| Gen | Score | Phases Run | Improved | Stagnant | Duration |
|-----|-------|-----------|----------|----------|----------|

## Artifact Hashes

| Phase | Artifact | Hash | Last Changed |
|-------|----------|------|-------------|

## Gate Proofs

| Phase | Proof File | Executed At | Score | Checks Hash |
|-------|-----------|-------------|-------|-------------|
| frontend | .gate-proofs/frontend.proof | 2026-04-20T15:15:10Z | .83 | 12c35f276eda36e5818f6d9e3d9c80eaa8831dabdfacc59d97385f09af3f365e |
| frontend | .gate-proofs/frontend.proof | 2026-04-20T17:36:28Z | .93 | 55065240b5ed056963f472a94bf9c8d5170dda78ddaafb3ce1ade672d14dffe9 |

## Gate Results

### database — Gate Results
| Check | Result | Detail | Time |
|-------|--------|--------|------|
| _no runs yet_ | | | |

### backend — Gate Results
| Check | Result | Detail | Time |
|-------|--------|--------|------|
| _no runs yet_ | | | |

### frontend — Gate Results
| Check | Result | Detail | Time |
|-------|--------|--------|------|
| frontend-env-example | PASS |  | 0ms |
| tsc | PASS |  | 6126ms |
| build | PASS |  | 5289ms |
| page-components | PASS | count=62 (expected >= 1) | 0ms |
| html-prototype-coverage | PASS | 62 React pages / 60 HTML prototypes (>= 80% required) | 0ms |
| html-name-coverage | FAIL | 48/60 HTML files have matching React pages. Missing:
    - 19-team-dashboard (team-dashboard → TeamDashboardPage.tsx not found)
    - 20-team-approvals (team-approvals → TeamApprovalsPage.tsx not found)
    - 21-team-performance (team-performance → TeamPerformancePage.tsx not foun
    - 22-team-reports (team-reports → TeamReportsPage.tsx not found)
    - 42-team-member-detail (team-member-detail → TeamMemberDetailPage.tsx not
    - 05-employee-dashboard (employee-dashboard → EmployeeDashboardPage.tsx no
    - index (index → IndexPage.tsx not found)
    - index (index → IndexPage.tsx not found)
    - 25-employee-create-edit (employee-create-edit → EmployeeCreateEditPage.t
    - 27-leave-management-admin (leave-management-admin → LeaveManagementAdmin
    - 23-admin-dashboard (admin-dashboard → AdminDashboardPage.tsx not found)
    - 24-employee-management-list (employee-management-list → EmployeeManageme | 0ms |
| routing-exists | PASS |  | 1ms |
| route-files-split | PASS | 4 route files found in routes/ directory | 0ms |
| no-inline-routes | PASS | routes.ts is aggregator only | 0ms |
| no-hardcoded-urls | FAIL | 1 hardcoded localhost references found | 0ms |
| shared-components | PASS | count=9 (expected >= 1) | 0ms |
| no-dead-buttons | PASS |  | 0ms |
| prd-nfr-compliance | PASS | 1/1 NFR requirements satisfied | 0ms |
| logo-home-link | FAIL | 0/5 layouts have logo link | 0ms |
| 404-catch-all | PASS | catch-all route exists | 0ms |
| ts-strict-mode | PASS |  | 0ms |
| role-based-ui | PASS | 10/62 pages have role checks | 0ms |
| httpservice-env-url | PASS | httpService.ts uses VITE_API_URL | 0ms |
| httpservice-with-credentials | PASS | httpService.ts has withCredentials: true | 0ms |
| redux-extrareducers-wired | PASS | all Redux slices have functional extraReducers | 0ms |
| no-mock-data-in-pages | PASS | no hardcoded mock data found in pages | 0ms |
| empty-state-ui | PASS | 24 pages with empty state handling | 0ms |
| no-inline-domain-interfaces | FAIL | 27 inline interfaces found in pages: Approvals.tsx AttendanceManagement.tsx Bonu | 0ms |
| no-createBrowserRouter | PASS | framework mode confirmed | 0ms |
| no-react-router-dom | PASS | all imports use react-router | 0ms |
| react-router-config-exists | PASS | react-router.config.ts exists | 0ms |
| import-alias-tilde | PASS | all imports use ~/ alias | 0ms |
| no-tanstack-query | PASS | no TanStack Query usage found | 0ms |
| protected-layout-rbac | PASS | ProtectedLayout has routeAccess map | 0ms |
| source-dir-app | PASS | source directory is app/ | 0ms |
| has-stable-testids | FAIL | 0/314 interactive elements have data-testid (0%, need >=70%) — see RULE-F10 | 0ms |
| **Score** | **.83** | **2026-04-20T15:15:10Z** | |

### integrate — Gate Results
| Check | Result | Detail | Time |
|-------|--------|--------|------|
| _no runs yet_ | | | |

### test-api — Gate Results
| Check | Result | Detail | Time |
|-------|--------|--------|------|
| _no runs yet_ | | | |

### test-browser — Gate Results
| Check | Result | Detail | Time |
|-------|--------|--------|------|
| _no runs yet_ | | | |

### ship — Gate Results
| Check | Result | Detail | Time |
|-------|--------|--------|------|
| _no runs yet_ | | | |

## Execution Log

| Date | Phase | Gen | Duration | Result | Score | Notes |
|------|-------|-----|----------|--------|-------|-------|
| 2026-04-20 | init | 1 | 5m | Pass | 1.00 | Scaffold + CLAUDE.md + docker-compose + frontend boilerplate |
| 2026-04-20 | prd | 1 | 16m | Pass | 0.95 | Parallel agent: 207 endpoints, 41 user stories, knowledge doc |
| 2026-04-20 | design | 1 | 7m | Pass | 0.95 | Parallel agent: 58 HTML files cataloged, MODE A approved |
| 2026-04-20 | database | 1 | 8m | Pass | 0.95 | Parallel agent: 27 entities, 20 enums, migration, seeder |
| 2026-04-20 | backend | 1 | 13m | Pass* | 0.80 | 3 parallel agents; AppModule wired; not type-checked |
| 2026-04-20 | frontend | 1 | 3m | Blocked | 0.20 | All 5 agents hit API rate limit; minimum stubs in place to unblock build |
| 2026-04-20 | frontend | 1 | - | Complete | .83 | gate-runner |
| 2026-04-20 | frontend | 1 | - | Complete | .93 | gate-runner |

## Phase Details

### spec
- **Status**: Skipped (--skip-spec)

### init
- **Status**: Pending

### prd
- **Status**: Pending

---
