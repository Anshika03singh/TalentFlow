import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const AssessmentResults = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [assessment, setAssessment] = useState(null);
    const [responses, setResponses] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
        loadResponses();
    }, [jobId]);
    const fetchData = async () => {
        try {
            setLoading(true);
            const [jobResponse, assessmentResponse] = await Promise.all([
                axios.get(`/jobs/${jobId}`),
                axios.get(`/assessments?jobId=${jobId}`),
            ]);
            setJob(jobResponse.data);
            const assessments = assessmentResponse.data.data;
            if (assessments.length > 0) {
                setAssessment(assessments[0]);
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            setLoading(false);
        }
    };
    const loadResponses = () => {
        if (assessment) {
            const savedResponses = localStorage.getItem(`assessment-responses-${assessment.id}`);
            if (savedResponses) {
                setResponses(JSON.parse(savedResponses));
            }
        }
    };
    if (loading) {
        return (_jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-8 bg-gray-200 rounded w-48 mb-2" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-64 mb-8" }), _jsx("div", { className: "space-y-6", children: [...Array(3)].map((_, i) => (_jsx("div", { className: "h-32 bg-gray-200 rounded" }, i))) })] }) }));
    }
    if (!job || !assessment) {
        return (_jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsx("div", { className: "text-center", children: _jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Assessment not found" }) }) }));
    }
    return (_jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Assessment Results" }), _jsx("button", { onClick: () => navigate("/dashboard/assessments"), className: "px-4 py-2 text-gray-900 border cursor-pointer  border-gray-300 rounded-lg hover:bg-gray-50 hover:text-emerald-500 ", children: "Back" })] }), _jsxs("p", { className: "text-gray-600", children: [job.title, " \u2022 ", job.jobType, " \u2022 ", job.location] }), assessment.description && (_jsx("p", { className: "text-gray-500 mt-2", children: assessment.description }))] }), _jsx("div", { className: "space-y-8", children: assessment.sections.map((section, sectionIndex) => (_jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [_jsxs("h2", { className: "text-xl font-medium text-gray-900 mb-6", children: [sectionIndex + 1, ". ", section.title] }), _jsx("div", { className: "space-y-6", children: section.questions.map((question, questionIndex) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700", children: [questionIndex + 1, ". ", question.question, question.required && (_jsx("span", { className: "text-red-500 ml-1", children: "*" }))] }), _jsxs("div", { className: "bg-gray-50 p-3 rounded border", children: [question.type === "single-choice" && (_jsx("p", { className: "text-sm text-gray-900", children: responses[question.id] || "No response" })), question.type === "multi-choice" && (_jsx("div", { className: "text-sm text-gray-900", children: responses[question.id] &&
                                                    Array.isArray(responses[question.id]) ? (_jsx("ul", { className: "list-disc list-inside space-y-1", children: responses[question.id].map((option, index) => (_jsx("li", { children: option }, index))) })) : ("No response") })), (question.type === "short-text" ||
                                                question.type === "long-text") && (_jsx("p", { className: "text-sm text-gray-900 whitespace-pre-wrap", children: responses[question.id] || "No response" })), question.type === "numeric" && (_jsx("p", { className: "text-sm text-gray-900", children: responses[question.id] || "No response" })), question.type === "file-upload" && (_jsx("p", { className: "text-sm text-gray-900", children: responses[question.id] || "No file uploaded" }))] })] }, question.id))) })] }, section.id))) }), _jsx("div", { className: "mt-8 pt-6 border-t border-gray-200", children: _jsx("div", { className: "text-center", children: _jsxs("p", { className: "text-sm text-gray-500", children: ["Assessment completed on ", new Date().toLocaleDateString()] }) }) })] }));
};
export default AssessmentResults;
