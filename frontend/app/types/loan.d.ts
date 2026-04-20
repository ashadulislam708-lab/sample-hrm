export type LoanStatus = 'pending' | 'approved' | 'active' | 'completed' | 'rejected';

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  status: LoanStatus;
  purpose: string | null;
  monthlyDeduction: number;
  createdAt: string;
}

export interface LoanState {
  list: Loan[];
  active: Loan | null;
  loading: boolean;
  error: string | null;
}
