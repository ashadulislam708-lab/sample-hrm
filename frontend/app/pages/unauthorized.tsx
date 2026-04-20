import { Link } from 'react-router';

export default function Unauthorized() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-3xl font-semibold">403 — Unauthorized</h1>
        <p className="text-muted-foreground">You don't have permission to view this page.</p>
        <Link to="/" className="inline-block text-primary-600 underline">
          Return home
        </Link>
      </div>
    </main>
  );
}
