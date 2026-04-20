import { createContext, useContext, useEffect, type ReactNode } from 'react';

import { loginSuccess, logout, setLoading } from '~/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '~/redux/store/hooks';
import { get } from '~/services/httpMethods';

import type { AuthUser } from '~/types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const checkSession = async () => {
      dispatch(setLoading(true));
      try {
        const me = await get<AuthUser>('/auth/me');
        dispatch(loginSuccess(me));
      } catch {
        dispatch(logout());
      }
    };
    checkSession();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
