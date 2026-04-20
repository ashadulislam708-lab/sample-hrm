import { Provider } from 'react-redux';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import type { Route } from './+types/root';
import { AuthProvider } from '~/contexts/AuthContext';
import { store } from '~/redux/store/store';

import './styles/app.css';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.ico' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Potential HRM</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-lg space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground">
          {error instanceof Error ? error.message : 'Unexpected error'}
        </p>
      </div>
    </main>
  );
}
