export interface Payslip {
  id: string;
  userId: string;
  periodStart: string;
  periodEnd: string;
  grossSalary: number;
  deductions: number;
  netSalary: number;
  createdAt: string;
}

export interface PayrollRun {
  id: string;
  periodStart: string;
  periodEnd: string;
  totalAmount: number;
  payslipCount: number;
  status: string;
}

export interface PayrollState {
  payslips: Payslip[];
  runs: PayrollRun[];
  loading: boolean;
  error: string | null;
}
