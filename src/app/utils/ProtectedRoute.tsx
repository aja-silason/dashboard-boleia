import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = localStorage.getItem('yhameNaKuHanna') === 'henGa';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};