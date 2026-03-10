import AppSpinner from "../components/shared-components/spinners/AppSpinner";
import { Navigate, useLocation } from "react-router";
import { $Contexts } from "../context/context-repository";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = $Contexts.useAuth();
  const location = useLocation();

  if (isLoading) return <AppSpinner />;

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
