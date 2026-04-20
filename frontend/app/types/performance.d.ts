export interface PerformanceGoal {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  targetDate: string | null;
  progress: number;
}

export interface DailyNote {
  id: string;
  userId: string;
  date: string;
  content: string;
  source: string;
}

export interface PerformanceEvaluation {
  id: string;
  userId: string;
  reviewerId: string;
  score: number;
  comments: string | null;
  createdAt: string;
}

export interface PerformanceReview {
  id: string;
  cycleId: string;
  userId: string;
  status: string;
  createdAt: string;
}

export interface PerformanceState {
  goals: PerformanceGoal[];
  dailyNotes: DailyNote[];
  evaluations: PerformanceEvaluation[];
  reviews: PerformanceReview[];
  loading: boolean;
  error: string | null;
}
