import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface DashboardStatistics {
  totalJobs: number;
  activeJobs: number;
  totalCandidates: number;
  newCandidates: number;
  totalAssessments: number;
  completedAssessments: number;
  interviewsScheduled: number;
  offersPending: number;
  hiredCandidates: number;
}

const HrDashboard = () => {
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState<DashboardStatistics>({
    totalJobs: 0,
    activeJobs: 0,
    totalCandidates: 0,
    newCandidates: 0,
    totalAssessments: 0,
    completedAssessments: 0,
    interviewsScheduled: 0,
    offersPending: 0,
    hiredCandidates: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("/dashboard/statistics");
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching dashboard statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    iconColor,
    bgColor,
  }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ReactNode;
    iconColor: string;
    bgColor: string;
  }) => (
    <div className="bg-purple-50/60 border border-purple-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-3 ${bgColor} rounded-lg`}>
            <div className={`w-5 h-5 ${iconColor}`}>{icon}</div>
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-purple-900">{title}</h3>
            <p className="text-xs font-medium text-purple-600">{subtitle}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-purple-900">{value}</div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-100 via-purple-50 to-purple-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-purple-800 animate-pulse">
            Loading Dashboard...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-purple-100 to-purple-200 px-6 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-purple-900 mb-2">
          HR Dashboard
        </h1>
        <p className="text-purple-600 text-sm">
          Welcome to your HR management dashboard
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Jobs"
          value={statistics.totalJobs}
          subtitle={`${statistics.activeJobs} active`}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
              />
            </svg>
          }
          iconColor="text-purple-600"
          bgColor="bg-purple-100"
        />

        <StatCard
          title="Candidates"
          value={statistics.totalCandidates}
          subtitle={`${statistics.hiredCandidates} hired`}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          }
          iconColor="text-purple-600"
          bgColor="bg-purple-100"
        />

        <StatCard
          title="Assessments"
          value={statistics.totalAssessments}
          subtitle={`${statistics.completedAssessments} completed`}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
          iconColor="text-purple-600"
          bgColor="bg-purple-100"
        />

        <StatCard
          title="Interviews"
          value={statistics.interviewsScheduled}
          subtitle={`${statistics.offersPending} offers pending`}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          }
          iconColor="text-purple-600"
          bgColor="bg-purple-100"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-purple-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Candidates",
              subtitle: "Manage your candidate pipeline",
              route: "/dashboard/candidates",
              bgColor: "bg-purple-100",
              icon: (
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              ),
            },
            {
              title: "Jobs",
              subtitle: "Create and manage job postings",
              route: "/dashboard/jobs",
              bgColor: "bg-purple-100",
              icon: (
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                  />
                </svg>
              ),
            },
            {
              title: "Assessments",
              subtitle: "Create candidate assessments",
              route: "/dashboard/assessments",
              bgColor: "bg-purple-100",
              icon: (
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              ),
            },
          ].map((action, index) => (
            <div
              key={index}
              onClick={() => navigate(action.route)}
              className="bg-white border border-purple-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-center">
                <div className={`p-3 ${action.bgColor} rounded-lg`}>
                  {action.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-purple-900">
                    {action.title}
                  </h3>
                  <p className="text-sm text-purple-600">{action.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-purple-200 rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-purple-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-purple-800">
              {statistics.newCandidates} new candidates applied this week
            </span>
            <span className="text-xs text-purple-500 ml-auto">This week</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-purple-800">
              {statistics.completedAssessments} assessments completed
            </span>
            <span className="text-xs text-purple-500 ml-auto">This week</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-purple-800">
              {statistics.activeJobs} active job postings
            </span>
            <span className="text-xs text-purple-500 ml-auto">Current</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-purple-800">
              {statistics.interviewsScheduled} interviews scheduled
            </span>
            <span className="text-xs text-purple-500 ml-auto">Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;

