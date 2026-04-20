import { type RouteConfig, route } from '@react-router/dev/routes';

import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
import employeeRoutes from './routes/employee.routes';
import teamRoutes from './routes/team.routes';

export default [
  ...authRoutes,
  ...employeeRoutes,
  ...teamRoutes,
  ...adminRoutes,
  route('*', 'pages/not-found.tsx'),
] satisfies RouteConfig;
