import { layout, prefix, route, type RouteConfigEntry } from '@react-router/dev/routes';

const teamRoutes: RouteConfigEntry[] = [
  ...prefix('team', [
    layout('components/layouts/TeamLeaderLayout.tsx', [
      route('dashboard', 'pages/team/Dashboard.tsx'),
      route('approvals', 'pages/team/Approvals.tsx'),
      route('approvals/:id', 'pages/team/ApprovalDetail.tsx'),
      route('performance', 'pages/team/Performance.tsx'),
      route('reports', 'pages/team/Reports.tsx'),
      route('members/:id', 'pages/team/MemberDetail.tsx'),
      route('members/add', 'pages/team/AddMember.tsx'),
    ]),
  ]),
];

export default teamRoutes;
