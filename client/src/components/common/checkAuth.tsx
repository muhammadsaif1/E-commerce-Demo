import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface User {
  role: string;
}

interface CheckAuthProps {
  isAuthenticated: boolean;
  user?: User | null;
  children: ReactNode;
}

function CheckAuth({ isAuthenticated, user, children }: CheckAuthProps) {
  const location = useLocation();
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth" />;
  }
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
  return <>{children}</>;
}

export default CheckAuth;