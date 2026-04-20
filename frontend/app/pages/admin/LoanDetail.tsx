import { useState } from 'react';

import { Link, useParams } from 'react-router';

export default function LoanDetail() {
  const { id } = useParams();
  const [approvedAmount, setApprovedAmount] = useState('$20,000');
  const [tenure, setTenure] = useState('24 months');
  const [notes, setNotes] = useState('');

  const handleDecision = (_decision: 'approved' | 'rejected') => {
    // TODO: wire to loan decision API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-loan-detail-page"
    >
      <div className="max-w-[1000px] mx-auto p-8">
        <Link
          to="/admin/loans"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6"
          data-testid="admin-loan-detail-back-link"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Loan Management
        </Link>

        <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600"
              aria-hidden="true"
            >
              LN
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                  Loan Application #{id ?? 'LN-2025-0008'}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-amber-500"
                    aria-hidden="true"
                  ></span>
                  Pending Approval
                </span>
              </div>
              <p className="text-sm text-slate-500">Applied: January 20, 2025</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Applicant Information</h2>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center text-2xl font-bold"
                    aria-hidden="true"
                  >
                    LA
                  </div>
                  <div className="flex-1">
                    <Link
                      to="/admin/employees/1"
                      className="text-lg font-semibold text-slate-900 hover:text-blue-600"
                      data-testid="admin-loan-detail-applicant-link"
                    >
                      Lisa Anderson
                    </Link>
                    <p className="text-sm text-slate-500">Product Manager &bull; Product Team</p>
                    <p className="text-xs text-slate-400 mt-1">
                      EMP-2021-0012 &bull; 3 years tenure
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Loan Details</h2>
              </div>
              <div className="p-5 space-y-5">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Loan Type
                    </p>
                    <p className="text-sm font-medium text-slate-900">Personal Loan</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Amount Requested
                    </p>
                    <p className="text-sm font-medium text-slate-900">$20,000</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Tenure
                    </p>
                    <p className="text-sm font-medium text-slate-900">24 months</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Interest Rate
                    </p>
                    <p className="text-sm font-medium text-slate-900">8.5% p.a.</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Monthly EMI
                    </p>
                    <p className="text-sm font-medium text-slate-900">$908</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Total Payable
                    </p>
                    <p className="text-sm font-medium text-slate-900">$21,792</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                    Purpose
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Medical expenses for family member&apos;s surgery. Required urgently within 2
                    weeks.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Approval Decision</h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="approved-amount"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Approved Amount
                    </label>
                    <input data-testid="admin-loan-detail-input-approved-amount-1"
                      id="approved-amount"
                      type="text"
                      value={approvedAmount}
                      onChange={(e) => setApprovedAmount(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="adjusted-tenure"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Adjusted Tenure
                    </label>
                    <select data-testid="admin-loan-detail-select-adjusted-tenure-1"
                      id="adjusted-tenure"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white"
                    >
                      <option value="24 months">24 months</option>
                      <option value="18 months">18 months</option>
                      <option value="12 months">12 months</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="loan-notes"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Notes
                  </label>
                  <textarea data-testid="admin-loan-detail-textarea-loan-notes-1"
                    id="loan-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Add approval notes..."
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button data-testid="admin-loan-detail-approve-btn"
                    type="button"
                    onClick={() => handleDecision('approved')}
                    className="flex-1 h-11 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Approve Loan
                  </button>
                  <button data-testid="admin-loan-detail-reject-btn"
                    type="button"
                    onClick={() => handleDecision('rejected')}
                    className="flex-1 h-11 rounded-lg text-sm font-medium text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Financial Context</h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Monthly Salary</span>
                  <span className="text-sm font-medium text-slate-900">$7,500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">EMI to Salary Ratio</span>
                  <span className="text-sm font-medium text-green-600">12.1%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Existing Loans</span>
                  <span className="text-sm font-medium text-slate-900">None</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Eligibility</span>
                  <span className="text-sm font-medium text-green-600">Qualified</span>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-500">
                    Max eligible amount:{' '}
                    <strong className="text-slate-700">$30,000</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Loan History</h2>
              </div>
              <div className="p-5">
                <div className="text-center py-4">
                  <p className="text-sm font-medium text-slate-900">No previous loans</p>
                  <p className="text-xs text-slate-500 mt-1">First loan application</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl border border-green-100 p-5">
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0"
                  aria-hidden="true"
                >
                  OK
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800">Low Risk</p>
                  <p className="text-xs text-green-700 mt-1">
                    Good tenure, no existing loans, healthy EMI ratio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
