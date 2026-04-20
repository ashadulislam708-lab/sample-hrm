import type { RoleEnum } from '~/enums/role.enum';

export interface UserListItem {
  id: string;
  fullName: string;
  email: string;
  role: RoleEnum;
  department: string | null;
  position: string | null;
  status: string;
}

export interface UserState {
  list: UserListItem[];
  loading: boolean;
  error: string | null;
}
