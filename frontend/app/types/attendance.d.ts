export type AttendanceSource = 'gather' | 'manual';
export type AttendanceStatus = 'on_time' | 'late_grace' | 'late' | 'absent';

export interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  source: AttendanceSource | null;
  status: AttendanceStatus | null;
  note: string | null;
}

export interface AttendanceSummary {
  totalDays: number;
  present: number;
  late: number;
  absent: number;
  onTime: number;
}

export interface AttendanceState {
  today: AttendanceRecord | null;
  history: AttendanceRecord[];
  summary: AttendanceSummary | null;
  loading: boolean;
  error: string | null;
}
