import { useState } from 'react';

interface Integration {
  key: 'gather' | 'notion' | 'slack' | 'custom';
  name: string;
  description: string;
  fields: { id: string; label: string; placeholder: string; type?: string }[];
}

const INTEGRATIONS: Integration[] = [
  {
    key: 'gather',
    name: 'Gather Town',
    description: 'Auto attendance tracking via Gather Town presence.',
    fields: [
      { id: 'gather-api-key', label: 'API Key', placeholder: 'gtk_...' },
      { id: 'gather-space-id', label: 'Space ID', placeholder: 'potential-ai' },
      { id: 'gather-sync', label: 'Sync Frequency (minutes)', placeholder: '5', type: 'number' },
    ],
  },
  {
    key: 'notion',
    name: 'Notion',
    description: 'Sync daily notes for performance reviews.',
    fields: [
      { id: 'notion-token', label: 'Integration Token', placeholder: 'secret_...' },
      { id: 'notion-workspace', label: 'Workspace', placeholder: 'Potential AI' },
      { id: 'notion-database', label: 'Database ID', placeholder: 'xxxx-xxxx-xxxx' },
    ],
  },
  {
    key: 'slack',
    name: 'Slack',
    description: 'Emergency leave notifications and thread updates.',
    fields: [
      { id: 'slack-webhook', label: 'Webhook URL', placeholder: 'https://hooks.slack.com/...' },
      { id: 'slack-channel', label: 'Notification Channel', placeholder: '#hr-emergencies' },
    ],
  },
  {
    key: 'custom',
    name: 'Custom Modules',
    description: 'Configure custom performance or reporting modules.',
    fields: [{ id: 'custom-endpoint', label: 'Endpoint URL', placeholder: 'https://...' }],
  },
];

export default function IntegrationSettings() {
  const [connected, setConnected] = useState<Record<string, boolean>>({
    gather: true,
    notion: false,
    slack: true,
    custom: false,
  });

  const toggle = (key: Integration['key']) => {
    setConnected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (_key: Integration['key']) => {
    // TODO: wire to save-integration API in Phase 7 integration
  };

  const handleTest = (_key: Integration['key']) => {
    // TODO: wire to test-integration API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-integration-settings-page"
    >
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Integration Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure external integrations for HRM automation.
          </p>
        </header>

        {INTEGRATIONS.map((integ) => (
          <section
            key={integ.key}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            data-testid={`admin-integration-settings-${integ.key}-section`}
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">{integ.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{integ.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${connected[integ.key] ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${connected[integ.key] ? 'bg-green-500' : 'bg-slate-400'}`}
                    aria-hidden="true"
                  ></span>
                  {connected[integ.key] ? 'Connected' : 'Disconnected'}
                </span>
                <button data-testid={`admin-integration-settings-${integ.key}-toggle-btn`}
                  type="button"
                  onClick={() => toggle(integ.key)}
                  className="h-9 px-3 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  {connected[integ.key] ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integ.fields.map((f) => (
                  <div key={f.id} className="space-y-1.5">
                    <label
                      htmlFor={f.id}
                      className="block text-sm font-medium text-slate-700"
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type ?? 'text'}
                      placeholder={f.placeholder}
                      className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      data-testid={`admin-integration-settings-${integ.key}-${f.id}-input`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end gap-2">
                <button data-testid={`admin-integration-settings-${integ.key}-test-btn`}
                  type="button"
                  onClick={() => handleTest(integ.key)}
                  className="h-9 px-3 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Test
                </button>
                <button data-testid={`admin-integration-settings-${integ.key}-save-btn`}
                  type="button"
                  onClick={() => handleSave(integ.key)}
                  className="h-9 px-4 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
