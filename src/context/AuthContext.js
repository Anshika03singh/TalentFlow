import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
    const login = () => {
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
    };
    const logout = () => {
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
    };
    useEffect(() => {
        const storedAuth = localStorage.getItem("isAuthenticated");
        if (storedAuth === "true") {
            setIsAuthenticated(true);
        }
    }, []);
    return (_jsx(AuthContext.Provider, { value: { isAuthenticated, login, logout }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
