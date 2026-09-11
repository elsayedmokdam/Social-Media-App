import { Navigate, useLocation } from "react-router";
import { $Contexts } from "../context/context-repository";

export default function GuestRoute({ children }) {
  const { isAuthenticated } = $Contexts.useAuth();
  const location = useLocation();
  const from =
    location.state?.from?.pathname == "/"
      ? "/feed"
      : location.state?.from?.pathname || "/feed";
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }
  return <>{children}</>;
}
