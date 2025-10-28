import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
const HrLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        toast("Logged out successfully");
        navigate("/login");
    };
    return (_jsxs("div", { children: [_jsxs("nav", { className: "flex justify-between items-center bg-gray-800 text-white p-4", children: [_jsx("h2", { className: "text-xl font-bold", children: "TalentFlow HR Dashboard" }), _jsx("button", { onClick: handleLogout, className: "bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md", children: "Logout" })] }), _jsx("main", { className: "p-6", children: _jsx(Outlet, {}) })] }));
};
export default HrLayout;
