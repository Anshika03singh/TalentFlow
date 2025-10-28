import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JobCard from "../components/common/JobCard";
import { Button } from "../components/ui/Button";
import SimpleJobSkeleton from "../components/common/JobSkeleton";
const CandidateJobs = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);
    const [pageSize] = useState(12);
    const jobTypes = ["All", "Full-time", "Remote", "Part-time", "Contract"];
    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/jobs", {
                params: {
                    search,
                    status: "active",
                    page: currentPage,
                    pageSize,
                },
            });
            // Sort jobs by createdAt date (newest first)
            const jobsData = response.data?.data || [];
            const sortedJobs = jobsData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setJobs(sortedJobs);
            setTotalJobs(response.data.total);
        }
        catch (error) {
            console.error("Error fetching jobs:", error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchJobs();
    }, [search, currentPage, pageSize]);
    const filteredJobs = selectedType === "All"
        ? jobs
        : jobs.filter((job) => job.jobType === selectedType);
    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };
    const handleTypeFilter = (type) => {
        setSelectedType(type);
        setCurrentPage(1);
    };
    const handleApplyToJob = (jobId) => {
        // Navigate to job details page or open application modal
        navigate(`/jobs/${jobId}`);
    };
    const totalPages = Math.ceil(totalJobs / pageSize);
    if (loading && jobs.length === 0) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsx(SimpleJobSkeleton, {}) }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "bg-white shadow-sm border-b", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold mb-2 text-emerald-600", children: "Available Jobs" }), _jsx("p", { className: "text-emerald-600/90", children: "Find your next career opportunity" })] }), _jsxs(Button, { variant: "outline", onClick: () => navigate("/"), className: "flex items-center space-x-2 hover:bg-gray-100 hover:text-emerald-600", children: [_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }), _jsx("span", { children: "Back" })] })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6", children: _jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [_jsx("div", { className: "flex-1", children: _jsx("input", { type: "text", placeholder: "Search jobs by title or tags...", value: search, onChange: (e) => handleSearch(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" }) }), _jsx("div", { className: "lg:w-48", children: _jsx("select", { value: selectedType, onChange: (e) => handleTypeFilter(e.target.value), className: "cursor-pointer w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent", children: jobTypes.map((type) => (_jsx("option", { value: type, children: type }, type))) }) })] }) }), _jsx("div", { className: "mb-6", children: _jsxs("p", { className: "text-gray-600", children: ["Showing ", filteredJobs.length, " of ", totalJobs, " jobs", search && ` for "${search}"`, selectedType !== "All" && ` in ${selectedType}`] }) }), filteredJobs.length === 0 ? (_jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200", children: _jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx("svg", { className: "w-8 h-8 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V8m8 0V6a2 2 0 00-2-2H10a2 2 0 00-2 2v2m8 0v8a2 2 0 01-2 2H10a2 2 0 01-2-2v-8" }) }) }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "No jobs found" }), _jsx("p", { className: "text-gray-600", children: "Try adjusting your search criteria or filters." })] }) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8", children: filteredJobs.map((job) => (_jsxs("div", { className: "relative flex flex-col justify-between", children: [_jsx(JobCard, { job: job }), _jsx("div", { className: "mt-4 flex justify-center", children: _jsx(Button, { variant: "default", size: "sm", onClick: () => handleApplyToJob(job.id), className: "w-full bg-emerald-600 hover:bg-emerald-700 text-white", children: "Apply to Job" }) })] }, job.id))) }), totalPages > 1 && (_jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "text-sm text-gray-700", children: ["Showing ", (currentPage - 1) * pageSize + 1, " to", " ", Math.min(currentPage * pageSize, totalJobs), " of ", totalJobs, " ", "jobs"] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => setCurrentPage(Math.max(1, currentPage - 1)), disabled: currentPage === 1, className: "px-3 py-1 cursor-pointer text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed", children: "Previous" }), [...Array(totalPages)].map((_, i) => (_jsx("button", { onClick: () => setCurrentPage(i + 1), className: `px-3 py-1 cursor-pointer text-sm border rounded-md ${currentPage === i + 1
                                                        ? "bg-emerald-600 text-white border-emerald-600"
                                                        : "border-gray-300 hover:bg-gray-50"}`, children: i + 1 }, i + 1))), _jsx("button", { onClick: () => setCurrentPage(Math.min(totalPages, currentPage + 1)), disabled: currentPage === totalPages, className: "cursor-pointer px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed", children: "Next" })] })] }) }))] }))] })] }));
};
export default CandidateJobs;
