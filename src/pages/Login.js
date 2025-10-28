import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // 🧩 Dummy HR credentials
        const hrEmail = "hr@talentflow.com";
        const hrPassword = "123456";
        if (email === hrEmail && password === hrPassword) {
            login(); // from AuthContext
            toast.success("Welcome back HR!");
            navigate("/dashboard");
        }
        else {
            toast.error("Invalid credentials. Try again!");
        }
        setLoading(false);
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-50", children: _jsxs("div", { className: "bg-white shadow-lg rounded-2xl p-8 w-[400px]", children: [_jsx("h1", { className: "text-2xl font-bold text-center mb-6 text-gray-800", children: "HR Login" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Email" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200", required: true, placeholder: "Enter your email" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200", required: true, placeholder: "Enter your password" })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50", children: loading ? "Logging in..." : "Login" })] })] }) }));
};
export default Login;
