import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  element: React.ReactElement;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  redirectTo = "/login",
}) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
