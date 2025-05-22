
import { Navigate } from "react-router-dom";
import { ReactNode } from 'react';
import { useAuthContext } from "../../store/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {

  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {

    return <Navigate to='/unauthorized' replace />;
  }

  return children;
}