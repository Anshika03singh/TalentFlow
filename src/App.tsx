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
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<CandidateJobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/candidates/:id" element={<CandidateProfile />} />

        {/* Protected HR Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute
              element={<HrLayout />}
              redirectTo="/login"
            />
          }
        >
          <Route index element={<HrDashboard />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="assessments" element={<Assessments />} />
        </Route>

        {/* Assessment Management */}
        <Route
          path="/assessments/builder/:jobId"
          element={<AssessmentBuilder />}
        />
        <Route
          path="/assessments/preview/:jobId"
          element={<AssessmentPreview />}
        />
        <Route
          path="/assessments/results/:jobId"
          element={<AssessmentResults />}
        />

        {/* Redirect HR login directly to dashboard if logged in */}
        <Route path="/hr-login" element={<Navigate to="/dashboard" replace />} />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
