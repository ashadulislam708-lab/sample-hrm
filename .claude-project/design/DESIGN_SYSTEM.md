# Design System — Potential HRM (sample-hrm)

Design tokens extracted verbatim from the HTML prototypes in `/HTML/`. All pages share a common Tailwind CDN setup with an inline `tailwind.config.extend.colors` block that establishes the palette below. Fonts are loaded from Google Fonts (`Inter`), icons use the Iconify `solar:*` linear / bold set.

---

## 1. Brand Colors

Primary palette is a saturated blue scale centered on `#2563EB` (Tailwind `blue-600`). Sidebar chrome uses a near-black slate.

| Token | Hex | Source |
|-------|-----|--------|
| `primary-50` | `#eff6ff` | tailwind.config in 05/23/24/27 etc. |
| `primary-100` | `#dbeafe` | same |
| `primary-200` | `#bfdbfe` | same |
| `primary-300` | `#93c5fd` | 23-admin-dashboard |
| `primary-400` | `#60a5fa` | 23-admin-dashboard |
| `primary-500` | `#3b82f6` | 23-admin-dashboard (charts) |
| `primary-600` | `#2563EB` | **Brand primary** |
| `primary-700` | `#1D4ED8` | **Brand secondary / hover** |
| `primary-800` | `#1e40af` | 23-admin-dashboard |
| `primary-900` | `#1e3a8a` | 23-admin-dashboard |

### Semantic colors

| Token | Hex | Usage |
|-------|-----|-------|
| `success-50` | `#ecfdf5` | success badge bg |
| `success-500` | `#10B981` | on-time, approved, active dot |
| `success-700` | `#047857` | success text |
| `warning-50` | `#fffbeb` | pending badge bg |
| `warning-500` | `#F59E0B` | pending / late icon |
| `warning-700` | `#b45309` | warning text |
| `error-50` | `#fef2f2` | danger badge bg |
| `error-500` | `#EF4444` | absent / rejected / emergency |
| `error-700` | `#b91c1c` | error text |
| `danger-500` | `#EF4444` | password strength (04-reset) |
| `info` | `#2563EB` | reuses primary |

### Accent / supporting (used in dashboard stat icons)

| Token | Hex (Tailwind default) | Usage |
|-------|------------------------|-------|
| `emerald-500` | `#10b981` | casual leave progress |
| `emerald-50` | `#ecfdf5` | casual leave icon bg |
| `rose-500` | `#f43f5e` | sick leave progress |
| `rose-50` | `#fff1f2` | sick leave icon bg |
| `amber-500` | `#f59e0b` | late attendance stat |
| `amber-50` | `#fffbeb` | amber icon bg |
| `purple-600` | `#9333ea` | loans icon, salary activity |
| `purple-50` | `#faf5ff` | purple icon bg |
| `teal-600` | `#0d9488` | loan stat card |
| `teal-50` | `#f0fdfa` | teal icon bg |
| `indigo-600` | `#4f46e5` | today's attendance stat |
| `indigo-50` | `#eef2ff` | indigo icon bg |

## 2. Neutral Palette (Slate)

Body text, borders, and surfaces use Tailwind's **slate** scale. Sidebars use a customized `slate-900` (`#0F172A`) with `slate-850` (`#1e293b`) borders.

| Token | Hex |
|-------|-----|
| `slate-50` | `#f8fafc` (also page bg `#F8FAFC`) |
| `slate-100` | `#f1f5f9` |
| `slate-200` | `#e2e8f0` |
| `slate-300` | `#cbd5e1` |
| `slate-400` | `#94a3b8` |
| `slate-500` | `#64748b` |
| `slate-600` | `#475569` |
| `slate-700` | `#334155` |
| `slate-800` | `#1e293b` |
| `slate-850` | `#1e293b` (custom sidebar border) |
| `slate-900` | `#0F172A` (custom sidebar bg, body text) |

Also used from gray scale: `gray-400` / `gray-500` / `gray-700` on a few auth screens.

**Page background:** `#F8FAFC` (applied on `<html class="bg-[#F8FAFC]">` and `<body>`).

---

## 3. Typography

- **Font family:** `Inter, sans-serif` — loaded from Google Fonts. Weights: 300, 400, 500, 600, 700 (login additionally uses 300). All bodies use `-webkit-font-smoothing: antialiased` and OpenType features `cv02, cv03, cv04, cv11`.
- **Fallback:** `sans-serif`.
- **Monospace:** used on the attendance clock (`font-mono` at `text-5xl`) and account numbers (`font-mono text-sm`).

### Heading scale (as observed)

| Level | Class (observed) | Size (px) | Weight |
|-------|------------------|-----------|--------|
| H1 — page title | `text-3xl font-bold tracking-tight` | 30 | 700 |
| H1 — section title | `text-3xl font-semibold tracking-tight` | 30 | 600 |
| H1 — detail page | `text-2xl font-semibold tracking-tight` | 24 | 600 |
| H2 — card / stat headline | `text-2xl font-semibold` | 24 | 600/700 |
| H2 — section | `text-lg font-semibold` | 18 | 600 |
| H3 — card label | `font-semibold text-slate-900` | 16 | 600 |
| Clock display | `text-5xl font-bold font-mono` | 48 | 700 |

### Body / support

| Role | Class | Size |
|------|-------|------|
| Default body | `text-sm text-slate-600` | 14px |
| Sub-label / caption | `text-xs text-slate-500` | 12px |
| Micro (timestamp / badge) | `text-[10px]` | 10px |
| Form input | `text-sm` | 14px |
| Form label | `text-sm font-medium text-slate-700` | 14px |
| Auth label (login) | `text-[13px] font-medium text-gray-700` | 13px |
| Table header | `text-xs font-semibold uppercase tracking-wider text-slate-500` | 12px |
| Section eyebrow | `text-xs font-semibold uppercase tracking-wider text-slate-500` | 12px |

Tracking: `tracking-tight` on H1/H2, `tracking-tighter` on the logo `P`, `tracking-wider` on uppercase labels.

---

## 4. Spacing Scale

Uses Tailwind defaults (`4px` base). Most-observed tokens:

| Token | px |
|-------|----|
| `space-1` / `gap-1` | 4 |
| `space-1.5` | 6 |
| `space-2` | 8 |
| `space-3` | 12 |
| `space-4` | 16 |
| `space-5` | 20 |
| `space-6` | 24 |
| `space-8` | 32 |
| `space-12` | 48 |

Common component padding: cards `p-5` / `p-6`, form inputs `px-3 py-2.5`, table cells `px-4 py-3` or `px-6 py-4`, sidebar nav items `px-3 py-2.5`, section containers `p-6 md:p-8`.

Arbitrary values seen: `h-[44px]` (button height), `w-[240px]` (sidebar), `h-[320px]` (chart card), `max-w-[1920px]` (admin shell), `max-w-[1400px]` (employee shell), `max-w-[420px]` (auth cards).

---

## 5. Border Radius

| Token | px | Where |
|-------|----|------|
| `rounded-sm` | 2 | micro chips |
| `rounded` | 4 | tiny tags |
| `rounded-md` | 6 | segmented toggle buttons |
| `rounded-lg` | 8 | inputs, buttons, sidebar items, most cards |
| `rounded-xl` | 12 | stat cards, chart cards, quick-action buttons |
| `rounded-2xl` | 16 | auth card container |
| `rounded-full` | 9999 | avatars, pills, progress bars |

---

## 6. Shadow Scale

| Token | Value | Usage |
|-------|-------|------|
| `shadow-sm` | Tailwind default | buttons, cards, inputs |
| `shadow-[0_1px_3px_rgba(0,0,0,0.1)]` | soft card | login card |
| `shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]` | stat card elevation | dashboard cards |
| `shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_-1px_rgba(0,0,0,0.02)]` | auth cards | forgot/reset |
| `shadow-primary-600/20` | brand glow | active sidebar item, primary CTAs |
| `shadow-red-600/20` | danger glow | emergency leave button |
| `hover:shadow-md` | hover elevate | list rows, cards |

---

## 7. Component Recipes

### 7.1 Buttons

| Variant | Classes |
|---------|---------|
| **Primary** | `h-11 px-5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 shadow-sm shadow-primary-600/20` |
| **Primary (compact)** | `px-4 py-2.5 rounded-lg text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white` |
| **Danger / Emergency** | `h-11 px-5 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 shadow-sm shadow-red-600/20` |
| **Secondary (dark)** | `bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium` |
| **Secondary (light)** | `bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm` |
| **Ghost icon** | `text-slate-400 hover:text-slate-600` |
| **Segmented (active)** | `px-3 py-1.5 text-xs font-medium bg-white text-slate-900 shadow-sm rounded-md` |
| **Segmented (inactive)** | `px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900` |
| **Quick-action tile** | `flex items-center justify-center gap-3 p-4 rounded-xl shadow-sm bg-primary-600 hover:bg-primary-700 text-white` |
| **Tab (active)** | `px-3 py-1.5 text-xs font-medium bg-white text-slate-900 shadow-sm rounded-md` (inside `bg-slate-100 p-1 rounded-lg`) |

All buttons sit at `h-11` (44px) by default. Active state uses `active:scale-[0.98]`.

### 7.2 Form Inputs

**Text / email / password / number:**
```
block w-full px-3 py-2.5 h-[44px]
bg-white border border-slate-200 (or slate-300 on auth)
rounded-lg text-sm text-slate-900
placeholder:text-slate-400
focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600
transition-all shadow-sm
```
With leading icon: `pl-10 pr-3`. With trailing icon (eye toggle, error): `pr-10`.

**Select:** same as input + custom caret (inline SVG data-uri) via `form-select` utility or `select { appearance: none; background-image: ... }`.

**Textarea:** `w-full px-4 py-3 border border-slate-200 rounded-lg text-sm` + same focus ring.

**Labels:** `block text-sm font-medium text-slate-700 mb-1.5` (auth uses `text-[13px]`; admin uppercase variant uses `text-xs font-semibold text-slate-500 uppercase tracking-wide`).

**Checkboxes:** `accent-color: #2563EB; w-4 h-4 rounded-[4px]`.

### 7.3 Card

Standard surface:
```
bg-white rounded-xl p-5 (or p-6) 
border border-slate-200 (sometimes slate-100)
shadow-sm (sometimes shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)])
hover:shadow-md transition-all
```
Section card with header:
```
bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden
  .header: p-5 border-b border-slate-200
  .body:   p-6
```

### 7.4 Table

```
<table class="w-full text-left border-collapse">
  <thead>
    <tr class="bg-slate-50/50 border-b border-slate-200">
      <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">…</th>
```
Body rows: `border-b border-slate-100 hover:bg-slate-50`. Row cells: `px-6 py-4 text-sm text-slate-600` (avatar cells use `text-slate-900 font-medium`). Action cells are right-aligned (`text-right`).

Empty state: centered illustration / message inside a `p-10` body region with `text-slate-500`.

### 7.5 Modal

Observed pattern (centered overlay):
```
fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm
  .dialog: bg-white rounded-2xl shadow-xl max-w-[480px]–[640px] w-full p-6
  .header: flex justify-between items-center mb-4 (title + close icon-button)
  .body:   space-y-4
  .footer: flex justify-end gap-2 mt-6 (secondary + primary)
```

### 7.6 Badge (Status)

All badges share `inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border`.

| Status | Classes |
|--------|---------|
| Approved / Success / On Time | `bg-green-50 text-green-700 border-green-100` |
| Pending / Awaiting | `bg-amber-50 text-amber-700 border-amber-100` (or `warning-50 warning-700`) |
| Rejected / Absent / Emergency | `bg-red-50 text-red-700 border-red-100` (or `error-50 error-500`) |
| Late | `bg-amber-50 text-amber-600 border-amber-100` |
| Auto / Neutral | `bg-slate-100 text-slate-600 border-slate-200` |
| Active Leave (admin) | `bg-error-500 text-white` pill |
| Percent chip | `bg-slate-100 text-slate-700 font-bold` |

Live dot (pulsing): `w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse` wrapped in `bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200`.

### 7.7 Avatar

- **Initials:** `w-8 h-8 rounded-full bg-slate-700 text-white text-xs font-medium flex items-center justify-center` (sidebar user).
- **Image:** `rounded-full object-cover` inside `w-8/w-9/w-10/w-12` container with `border-2 border-white shadow-sm`.
- **Presence dot:** `absolute bottom-0 right-0 w-2.5 h-2.5 bg-success-500 border-2 border-slate-900 rounded-full`.

### 7.8 Progress Bar

`w-full bg-slate-100 rounded-full h-2` + inner `bg-primary-600 h-2 rounded-full` with inline `style="width: {pct}%"`. Variants: `bg-emerald-500`, `bg-rose-500`.

### 7.9 Sidebar Nav Item

```
flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
  inactive: text-slate-400 hover:text-white hover:bg-slate-800
  active:   bg-primary-600 text-white shadow-lg shadow-primary-600/20
icon: <iconify-icon width="20" stroke-width="1.5">
label: text-sm font-medium
```
Section divider: `pt-4 mt-4 border-t border-slate-800` + eyebrow `text-xs font-semibold text-slate-500 uppercase tracking-wider`.

### 7.10 Logo mark

`w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-semibold text-lg tracking-tighter` containing `P`. On auth: larger `w-12 h-12 rounded-xl` variant.

---

## 8. Layout & Grid

- **App shell:** `body h-full flex overflow-hidden`.
- **Sidebar:** fixed width `w-[240px]`, `bg-slate-900`, hidden on mobile (`hidden md:flex`). Header row inside sidebar is `h-16` with `border-b border-slate-800`.
- **Header bar height:** 64 px (sidebar logo row); page has no separate top bar — header lives inside `<main>` at the top of the content area.
- **Main container widths:**
  - Employee: `max-w-[1400px] mx-auto p-8`
  - Admin: `max-w-[1920px] mx-auto p-6 md:p-8`
  - Team Lead: `max-w-7xl mx-auto p-6 md:p-8` (1280px)
  - Auth: centered card `max-w-[420px]` on `#F8FAFC` full-screen background.
- **Grid breakpoints (Tailwind v3 defaults used):**
  - `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px (admin stat grid also uses `2xl:grid-cols-6`).
- **Common column grids:**
  - Stat cards: `grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6` (employee) / `sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6` (admin).
  - Dashboard two-column: `grid-cols-1 lg:grid-cols-5` with `lg:col-span-3` + `lg:col-span-2`.
- **Mobile:** sidebar is hidden behind a hamburger toggle; content reflows to single column; minimum viewport 375px is supported by all page containers.

### Responsive breakpoints reference

| Breakpoint | Min width | Primary change |
|------------|-----------|----------------|
| base | 0 | stacked single column, sidebar hidden |
| `sm` | 640 | 2-col stat grid |
| `md` | 768 | sidebar visible, 2/3-col content |
| `lg` | 1024 | 3-col dashboards, two-column layouts |
| `xl` | 1280 | 4-col stat grids, max content widths begin to apply |
| `2xl` | 1536 | 6-col admin stat grid |

---

## 9. Icons

All icons use **Iconify** (`iconify-icon` web component) with the `solar:*` set — linear for inactive/default, bold for active/selected.

| Context | Icon |
|---------|------|
| Dashboard | `solar:widget-5-linear` / `-bold` |
| Attendance | `solar:user-check-linear` / `-bold` |
| Leave | `solar:calendar-mark-linear` |
| Salary | `solar:wallet-money-linear` / `-bold` |
| Loans | `solar:hand-money-linear` / `-bold` |
| Performance | `solar:chart-square-linear` |
| Policies | `solar:document-text-linear` |
| Profile | `solar:user-circle-linear` |
| Logout | `solar:logout-2-linear` / `logout-3-linear` |
| Settings | `solar:settings-linear` |
| Email | `solar:letter-linear` |
| Password | `solar:lock-password-linear` |
| Reveal password | `solar:eye-linear` / `solar:eye-closed-linear` |
| Search | `solar:magnifer-linear` |
| Add | `solar:add-circle-linear`, `solar:user-plus-linear` |
| Info | `solar:info-circle-linear` |
| Danger | `solar:danger-circle-linear`, `solar:medical-kit-linear` |
| Approve | `solar:check-circle-linear` / `-bold` |
| Menu (mobile) | `solar:hamburger-menu-linear` |
| Menu dots | `solar:menu-dots-bold` |
| Back | `solar:arrow-left-linear` |
| Trend up | `solar:arrow-right-up-linear` |
| Notification | `solar:bell-bing-bold` |
| Employees | `solar:users-group-rounded-linear` / `-bold`, `solar:users-group-two-rounded-linear` |

Sizing: `w-5 h-5` (20px) inline nav/button icons, `w-6 h-6` (24px) standalone, `w-4 h-4` (16px) in micro-badges.

---

## 10. Animations & Transitions

- `transition-colors`, `transition-all` (default 150ms) on all interactive surfaces.
- Active press: `active:scale-[0.98]`.
- Live status dots: `animate-pulse`, `animate-ping`.
- Auth card entrance: custom `fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)`.
- Loader spinner: 2px border top, `spin 1s linear infinite`.
- Sidebar scrollbar: custom 5px thumb at `rgba(255,255,255,0.1)`.

---

## 11. Accessibility Notes

- All prototypes pass contrast: `text-slate-900` (`#0F172A`) on `#F8FAFC` ≈ 15:1, `text-slate-500` on white ≈ 7.1:1.
- Form inputs have explicit `<label for="…">` ties on most pages (auth, create-employee, edit-profile).
- Focus rings: `focus:ring-1 focus:ring-primary-600` (admin) or `focus:ring-2 focus:ring-primary-600/20` (auth).
- Icons inside icon-only buttons should carry `aria-label` (currently missing in the prototype and MUST be added in React).
- Every clickable button/anchor has `cursor-pointer` implicitly from Tailwind defaults; eye toggles explicitly set `cursor-pointer`.

---

## 12. Style DNA (use as prompt prefix)

> Potential HRM visual DNA — Inter-based SaaS dashboard. Primary `#2563EB` on `#F8FAFC` canvas with `#0F172A` dark sidebar. Rounded-xl cards, subtle `shadow-sm`, 44px button height, 240px sidebar, 64px internal header rows. Status palette: green `#10B981`, amber `#F59E0B`, red `#EF4444`. Icons from Iconify `solar:*` linear/bold. Calm, modern, enterprise-grade — minimal decoration, generous spacing, numeric data emphasised with `font-semibold tracking-tight`.
