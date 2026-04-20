import { index, layout, route, type RouteConfigEntry } from '@react-router/dev/routes';

const authRoutes: RouteConfigEntry[] = [
  layout('components/layouts/GuestLayout.tsx', [
    index('pages/redirect-home.tsx'),
    route('login', 'pages/auth/Login.tsx'),
    route('forgot-password', 'pages/auth/ForgotPassword.tsx'),
    route('reset-password', 'pages/auth/ResetPassword.tsx'),
  ]),
];

export default authRoutes;
