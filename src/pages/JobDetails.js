import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/Button";
import ApplicationModal from "../components/Jobs/ApplicationModal";
import { toast } from "react-hot-toast";
const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/jobs/${id}`);
                setJob(response.data);
            }
            catch (error) {
                console.error("Error fetching job:", error);
                navigate("/jobs");
            }
            finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchJob();
        }
    }, [id, navigate]);
    const handleApply = () => {
        setShowApplicationModal(true);
    };
    const handleApplicationSuccess = () => {
        toast.success(`Application submitted successfully for ${job?.title}!`);
        navigate("/jobs");
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-8 bg-gray-200 rounded w-3/4 mb-4" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-1/2 mb-8" }), _jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-8", children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "h-4 bg-gray-200 rounded w-full" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-5/6" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-4/6" })] }) })] }) }) }));
    }
    if (!job) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Job Not Found" }), _jsx("p", { className: "text-gray-600 mb-8", children: "The job you're looking for doesn't exist or has been removed." }), _jsx(Button, { variant: "default", className: "bg-emerald-600 hover:bg-emerald-700 text-white", onClick: () => navigate("/jobs"), children: "Browse All Jobs" })] }) }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "bg-white shadow-sm border-b", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: _jsx("div", { className: "flex justify-between items-center", children: _jsxs(Button, { variant: "outline", onClick: () => navigate("/jobs"), className: "flex items-center space-x-2 hover:bg-gray-100 hover:text-emerald-600", children: [_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }), _jsx("span", { children: "Back" })] }) }) }) }), _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden", children: [_jsx("div", { className: "p-8 border-b border-gray-200", children: _jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: job.title }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 text-gray-600 mb-4", children: [_jsxs("span", { className: "flex items-center", children: [_jsx("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }), job.jobType || "Job"] }), _jsxs("span", { className: "flex items-center", children: [_jsxs("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })] }), job.location] }), _jsxs("span", { className: "flex items-center", children: [_jsx("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" }) }), job.salary] })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx("span", { className: "px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full", children: job.jobType || "Job" }), job.tags.map((tag) => (_jsx("span", { className: "px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full", children: tag }, tag)))] })] }), _jsx("div", { className: "lg:w-48", children: _jsx(Button, { variant: "default", size: "lg", onClick: handleApply, className: "w-full bg-emerald-600 hover:bg-emerald-700", children: "Apply Now" }) })] }) }), _jsx("div", { className: "p-8", children: _jsxs("div", { className: "prose max-w-none", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-4", children: "Job Description" }), _jsx("div", { className: "text-gray-700 whitespace-pre-wrap mb-8", children: job.description }), _jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-4", children: "Requirements" }), _jsx("ul", { className: "list-disc list-inside space-y-2 text-gray-700 mb-8", children: job.requirements.map((requirement, index) => (_jsx("li", { children: requirement }, index))) }), _jsxs("div", { className: "bg-gray-50 rounded-lg p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Ready to Apply?" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Click the \"Apply Now\" button above to submit your application for this position." }), _jsx(Button, { variant: "default", onClick: handleApply, className: "bg-emerald-600 hover:bg-emerald-700", children: "Submit Application" })] })] }) })] }) }), showApplicationModal && job && (_jsx(ApplicationModal, { job: job, onClose: () => setShowApplicationModal(false), onSuccess: handleApplicationSuccess }))] }));
};
export default JobDetails;
