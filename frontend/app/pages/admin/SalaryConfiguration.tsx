import { useState } from 'react';

import { Link } from 'react-router';

interface Grade {
  key: string;
  name: string;
  min: string;
  max: string;
}

const DEFAULT_GRADES: Grade[] = [
  { key: 'executive', name: 'Executive', min: '180,000', max: '250,000' },
  { key: 'senior', name: 'Senior', min: '120,000', max: '180,000' },
  { key: 'mid', name: 'Mid-Level', min: '80,000', max: '120,000' },
  { key: 'junior', name: 'Junior', min: '50,000', max: '80,000' },
];

export default function SalaryConfiguration() {
  const [grades, setGrades] = useState<Grade[]>(DEFAULT_GRADES);

  const updateGrade = (key: string, field: 'min' | 'max', value: string) => {
    setGrades((prev) => prev.map((g) => (g.key === key ? { ...g, [field]: value } : g)));
  };

  const handleSave = () => {
    // TODO: wire to salary configuration save API in Phase 7 integration
  };

  const handleAddAllowance = () => {
    // TODO: wire to add-allowance API in Phase 7 integration
  };

  const handleAddDeduction = () => {
    // TODO: wire to add-deduction API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-salary-configuration-page"
    >
      <div className="max-w-[1400px] mx-auto p-8 space-y-6">
        <Link
          to="/admin/payroll"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          data-testid="admin-salary-configuration-back-link"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Payroll
        </Link>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Salary Configuration
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Define salary grades and allowance/deduction templates.
            </p>
          </div>
          <button data-testid="admin-salary-configuration-save-btn"
            type="button"
            onClick={handleSave}
            className="h-10 px-5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
          >
            Save Changes
          </button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {grades.map((g) => (
            <div
              key={g.key}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4"
              data-testid={`admin-salary-configuration-grade-${g.key}-card`}
            >
              <h3 className="text-base font-semibold text-slate-900">{g.name}</h3>
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor={`grade-${g.key}-min`}
                    className="text-xs font-medium text-slate-700 block mb-1.5"
                  >
                    Min
                  </label>
                  <input data-testid={`admin-salary-configuration-grade-${g.key}-min-input`}
                    id={`grade-${g.key}-min`}
                    type="text"
                    value={g.min}
                    onChange={(e) => updateGrade(g.key, 'min', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`grade-${g.key}-max`}
                    className="text-xs font-medium text-slate-700 block mb-1.5"
                  >
                    Max
                  </label>
                  <input data-testid={`admin-salary-configuration-grade-${g.key}-max-input`}
                    id={`grade-${g.key}-max`}
                    type="text"
                    value={g.max}
                    onChange={(e) => updateGrade(g.key, 'max', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
              </div>
              <button data-testid={`admin-salary-configuration-grade-${g.key}-edit-btn`}
                type="button"
                onClick={() => {
                  /* edit grade */
                }}
                className="w-full h-9 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
              >
                Edit Grade
              </button>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Allowances</h2>
            <button data-testid="admin-salary-configuration-add-allowance-btn"
              type="button"
              onClick={handleAddAllowance}
              className="h-9 px-3 rounded-lg text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all cursor-pointer"
            >
              + Add Allowance
            </button>
          </div>
          <div className="p-5 text-sm text-slate-500">
            Configure allowance components (Housing, Transport, Medical, etc.) — data loaded from
            API in Phase 7.
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Deductions</h2>
            <button data-testid="admin-salary-configuration-add-deduction-btn"
              type="button"
              onClick={handleAddDeduction}
              className="h-9 px-3 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-all cursor-pointer"
            >
              + Add Deduction
            </button>
          </div>
          <div className="p-5 text-sm text-slate-500">
            Configure deduction components (Tax, Provident Fund, etc.) — data loaded from API in
            Phase 7.
          </div>
        </section>
      </div>
    </div>
  );
}
