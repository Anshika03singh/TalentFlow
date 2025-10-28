import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from "react-router-dom";
// Pages
import Landing from "./pages/Landing";
import HrDashboard from "./pages/HrDashboard";
import Candidates from "./pages/Candidates";
import Jobs from "./pages/Jobs";
import CandidateJobs from "./pages/CandidateJobs";
import JobDetails from "./pages/JobDetails";
import Assessments from "./pages/Assessments";
import AssessmentBuilder from "./pages/AssessmentBuilder";
import AssessmentPreview from "./pages/AssessmentPreview";
import AssessmentResults from "./pages/AssessmentResults";
import CandidateProfile from "./pages/CandidateProfile";
import Features from "./pages/Features";
import Login from "./pages/Login";
// Layouts & Routes
import HrLayout from "./components/layout/HrLayout";
import ProtectedRoute from "./components/routes/ProtectedRoute";
// Auth Context
import { AuthProvider } from "./context/AuthContext";
function App() {
    return (_jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Landing, {}) }), _jsx(Route, { path: "/features", element: _jsx(Features, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/jobs", element: _jsx(CandidateJobs, {}) }), _jsx(Route, { path: "/jobs/:id", element: _jsx(JobDetails, {}) }), _jsx(Route, { path: "/candidates/:id", element: _jsx(CandidateProfile, {}) }), _jsxs(Route, { path: "/dashboard/*", element: _jsx(ProtectedRoute, { element: _jsx(HrLayout, {}), redirectTo: "/login" }), children: [_jsx(Route, { index: true, element: _jsx(HrDashboard, {}) }), _jsx(Route, { path: "candidates", element: _jsx(Candidates, {}) }), _jsx(Route, { path: "jobs", element: _jsx(Jobs, {}) }), _jsx(Route, { path: "assessments", element: _jsx(Assessments, {}) })] }), _jsx(Route, { path: "/assessments/builder/:jobId", element: _jsx(AssessmentBuilder, {}) }), _jsx(Route, { path: "/assessments/preview/:jobId", element: _jsx(AssessmentPreview, {}) }), _jsx(Route, { path: "/assessments/results/:jobId", element: _jsx(AssessmentResults, {}) }), _jsx(Route, { path: "/hr-login", element: _jsx(Navigate, { to: "/dashboard", replace: true }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) }));
}
export default App;
