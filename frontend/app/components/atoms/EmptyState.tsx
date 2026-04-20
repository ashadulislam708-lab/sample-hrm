interface EmptyStateProps {
  title: string;
  description?: string;
  testId?: string;
}

export default function EmptyState({ title, description, testId }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
      data-testid={testId ?? 'empty-state'}
    >
      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      {description ? <p className="text-xs text-slate-500 mt-1 max-w-xs">{description}</p> : null}
    </div>
  );
}
