export interface Policy {
  id: string;
  title: string;
  body: string;
  version: number;
  effectiveDate: string;
  createdAt: string;
}

export interface PolicyState {
  list: Policy[];
  current: Policy | null;
  loading: boolean;
  error: string | null;
}
