import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface SuperadminProtectedRouteProps {
  children: React.ReactNode;
}

export function SuperadminProtectedRoute({ children }: SuperadminProtectedRouteProps) {
  const { hasRole } = useAuth();

  // Controleer of de gebruiker de 'superadmin' rol heeft.
  // Zo niet, stuur ze naar een niet-gevonden pagina.
  if (!hasRole('superadmin')) {
    return <Navigate to="/not-found" replace />;
  }

  return <>{children}</>;
}