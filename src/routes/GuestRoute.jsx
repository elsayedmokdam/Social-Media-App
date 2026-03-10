import { Navigate, useLocation } from "react-router";
import { $Contexts } from "../context/context-repository";

export default function GuestRoute({ children }) {
  const { isAuthenticated } = $Contexts.useAuth();
  const location = useLocation();
  // console.log("Location :",location);
  const from =
    location.state?.from?.pathname == "/"
      ? "/feed"
      : location.state?.from?.pathname || "/feed";
      console.log("From : ",from);
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }
  return <>{children}</>;
}
