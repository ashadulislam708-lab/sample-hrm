import type { RoleEnum } from '~/enums/role.enum';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: RoleEnum;
  department: string | null;
  position: string | null;
  avatarUrl: string | null;
  teamLeaderId: string | null;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
