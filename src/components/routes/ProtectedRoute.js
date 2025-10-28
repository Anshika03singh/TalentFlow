import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const ProtectedRoute = ({ element, redirectTo = "/login", }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? element : _jsx(Navigate, { to: redirectTo, replace: true });
};
export default ProtectedRoute;
