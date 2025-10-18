// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { initializeJobs } from "./services/db/jobsDb";
import { initializeCandidates } from "./services/db/candidatesDb";
import { initializeAssessments } from "./services/db/assessmentsDb";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext"; 
import { makeServer } from "./mirage/server"; // ✅ Import MirageJS mock server

// ✅ Initialize and render app
const startApp = () => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

// ✅ Development mode: Start MirageJS mock API
if (import.meta.env.MODE === "development") {
  console.log("🚀 Starting MirageJS in development mode...");
  makeServer({ environment: "development" });

  console.log("📦 Initializing local databases...");
  Promise.all([
    initializeJobs(),
    initializeCandidates(),
    initializeAssessments(),
  ])
    .then(() => {
      console.log("✅ Databases initialized, starting app...");
      startApp();
    })
    .catch((error) => {
      console.error("⚠️ Failed to initialize databases:", error);
      startApp();
    });
} else {
  // ✅ Production mode: skip Mirage
  initializeJobs();
  initializeCandidates();
  initializeAssessments();
  startApp();
}
