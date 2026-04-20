export type LeaveType = 'casual' | 'sick' | 'half_day' | 'emergency';
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface LeaveRequest {
  id: string;
  userId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  reason: string | null;
  createdAt: string;
}

export interface LeaveBalance {
  casual: number;
  sick: number;
  halfDay: number;
  emergency: number;
}

export interface LeaveState {
  list: LeaveRequest[];
  balance: LeaveBalance | null;
  loading: boolean;
  error: string | null;
}
