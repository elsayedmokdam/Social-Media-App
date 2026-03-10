import { Navigate, Outlet, useLocation } from "react-router";
import MainNavBar from "../components/main-navbar/MainNavBar";

export default function RootLayout() {
  const location = useLocation();
  
  if(location.pathname === '/') {
    return <Navigate to="/feed" replace />
  }
  return (
    <>
      <MainNavBar />
      <div className=" bg-neutral-100 py-5 min-h-[calc(100vh-89px)]">
        <Outlet />
      </div>
    </>
  );
}
