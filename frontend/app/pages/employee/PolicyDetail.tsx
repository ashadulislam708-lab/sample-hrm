import { useState } from 'react';

import { Link } from 'react-router';

export default function PolicyDetail() {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600 font-normal"
      data-testid="policy-detail-page"
    >
      <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            to="/employee/policies"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            data-testid="policy-detail-back-link"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Policies
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
                  data-testid="policy-detail-category-badge"
                >
                  Leave
                </span>
                <span
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 tracking-wide"
                  data-testid="policy-detail-updated-badge"
                >
                  UPDATED
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                Leave Management System
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">Last updated: Jan 10, 2025</span>
                <span className="flex items-center gap-1.5">Version 2.3</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button data-testid="policy-detail-print-btn"
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Print
              </button>
              <button data-testid="policy-detail-download-btn"
                type="button"
                onClick={() => {
                  /* download pdf */
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Download PDF
              </button>
            </div>
          </div>

          <div
            className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-lg"
            data-testid="policy-detail-ack-notice"
          >
            <span className="text-amber-600 text-xl" aria-hidden="true">
              !
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-800">
                This policy requires your acknowledgment
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                Please read through the policy and acknowledge at the bottom.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              This Leave Management Policy outlines the guidelines and procedures for requesting,
              approving, and managing employee leaves at Potential AI. The policy ensures fair and
              consistent treatment of all employees while maintaining operational efficiency.
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mb-4">2. Types of Leave</h2>

            <h3 className="text-base font-medium text-slate-800 mb-2">2.1 Casual Leave</h3>
            <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
              <li>12 days per calendar year for permanent employees</li>
              <li>Pro-rated for employees joining mid-year</li>
              <li>Cannot be carried forward to the next year</li>
              <li>Requires 3 days advance notice for planned leave</li>
            </ul>

            <h3 className="text-base font-medium text-slate-800 mb-2">2.2 Sick Leave</h3>
            <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
              <li>7 days per calendar year</li>
              <li>Medical certificate required for absences exceeding 2 consecutive days</li>
              <li>Can be taken in half-day increments</li>
              <li>Unused sick leave does not carry forward</li>
            </ul>

            <h3 className="text-base font-medium text-slate-800 mb-2">2.3 Emergency Leave</h3>
            <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
              <li>Up to 5 days for genuine emergencies</li>
              <li>Requires immediate notification to supervisor</li>
              <li>Supporting documentation may be required</li>
              <li>Subject to HR approval within 48 hours</li>
            </ul>

            <h2 className="text-lg font-semibold text-slate-900 mb-4">3. Leave Request Process</h2>
            <ol className="list-decimal list-inside text-slate-600 mb-6 space-y-2">
              <li>Submit leave request through the HRM portal</li>
              <li>Specify leave type, dates, and reason</li>
              <li>Request will be routed to your direct supervisor</li>
              <li>Approval/rejection notification will be sent via email</li>
              <li>Leave balance will be automatically updated upon approval</li>
            </ol>

            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              4. Leave Approval Authority
            </h2>
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-200">
                    <th className="pb-2 font-medium">Leave Duration</th>
                    <th className="pb-2 font-medium">Approving Authority</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-100">
                    <td className="py-2">1-3 days</td>
                    <td className="py-2">Direct Supervisor</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2">4-7 days</td>
                    <td className="py-2">Department Head</td>
                  </tr>
                  <tr>
                    <td className="py-2">More than 7 days</td>
                    <td className="py-2">HR Manager</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-lg font-semibold text-slate-900 mb-4">5. Important Notes</h2>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-600" aria-hidden="true">
                    i
                  </span>
                  Leave requests during peak business periods may be subject to additional review
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-600" aria-hidden="true">
                    i
                  </span>
                  Cancellation of approved leave must be done at least 24 hours in advance
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-600" aria-hidden="true">
                    i
                  </span>
                  Unauthorized absence may result in disciplinary action
                </li>
              </ul>
            </div>

            <h2 className="text-lg font-semibold text-slate-900 mb-4">6. Contact</h2>
            <p className="text-slate-600 mb-4">
              For any questions regarding this policy, please contact:
            </p>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className="text-slate-400" aria-hidden="true">
                @
              </span>
              <a
                href="mailto:hr@potentialai.com"
                className="text-blue-600 hover:text-blue-700"
                data-testid="policy-detail-contact-email"
              >
                hr@potentialai.com
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Acknowledge Policy</h3>
          <div className="flex items-start gap-3 mb-6">
            <input data-testid="employee-policy-detail-input-acknowledge-1"
              type="checkbox"
              id="acknowledge"
              checked={acknowledged}
              onChange={(event) => setAcknowledged(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="acknowledge" className="text-sm text-slate-600">
              I have read, understood, and agree to comply with the Leave Management Policy as
              outlined above. I understand that violation of this policy may result in disciplinary
              action.
            </label>
          </div>
          <div className="flex justify-end">
            <button data-testid="policy-detail-ack-submit-btn"
              type="button"
              disabled={!acknowledged}
              onClick={() => {
                /* submit ack */
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Submit Acknowledgment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
