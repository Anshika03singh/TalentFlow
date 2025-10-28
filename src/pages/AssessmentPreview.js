import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
const AssessmentPreview = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [responses, setResponses] = useState({});
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
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
    const handleResponseChange = (questionId, value) => {
        setResponses((prev) => ({
            ...prev,
            [questionId]: value,
        }));
        // Clear error for this question
        if (errors[questionId]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[questionId];
                return newErrors;
            });
        }
    };
    const validateQuestion = (question) => {
        const value = responses[question.id];
        if (question.required &&
            (!value || (Array.isArray(value) && value.length === 0))) {
            return "This question is required";
        }
        if (question.validation &&
            value !== undefined &&
            value !== null &&
            value !== "") {
            if (question.validation.minLength &&
                value.length < question.validation.minLength) {
                return `Minimum length is ${question.validation.minLength} characters`;
            }
            if (question.validation.maxLength &&
                value.length > question.validation.maxLength) {
                return `Maximum length is ${question.validation.maxLength} characters`;
            }
            if (question.validation.min && value < question.validation.min) {
                return `Minimum value is ${question.validation.min}`;
            }
            if (question.validation.max && value > question.validation.max) {
                return `Maximum value is ${question.validation.max}`;
            }
        }
        return null;
    };
    const validateForm = () => {
        if (!assessment)
            return false;
        const newErrors = {};
        let isValid = true;
        for (const section of assessment.sections) {
            for (const question of section.questions) {
                if (shouldShowQuestion(question)) {
                    const error = validateQuestion(question);
                    if (error) {
                        newErrors[question.id] = error;
                        isValid = false;
                    }
                }
            }
        }
        setErrors(newErrors);
        return isValid;
    };
    const shouldShowQuestion = (question) => {
        if (!question.conditionalOn)
            return true;
        const conditionalValue = responses[question.conditionalOn.questionId];
        if (Array.isArray(question.conditionalOn.value)) {
            return question.conditionalOn.value.includes(conditionalValue);
        }
        return conditionalValue === question.conditionalOn.value;
    };
    const handleSubmit = () => {
        if (validateForm()) {
            // Save responses to localStorage
            if (assessment) {
                localStorage.setItem(`assessment-responses-${assessment.id}`, JSON.stringify(responses));
                localStorage.setItem(`assessment-submitted-${assessment.id}`, "true");
            }
            setSubmitted(true);
            // Redirect to results after a short delay
            setTimeout(() => {
                navigate(`/assessments/results/${jobId}`);
            }, 2000);
        }
    };
    const saveDraft = () => {
        if (assessment) {
            localStorage.setItem(`assessment-responses-${assessment.id}`, JSON.stringify(responses));
            toast.success("Draft saved successfully!");
        }
    };
    if (loading) {
        return (_jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-8 bg-gray-200 rounded w-48 mb-2" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-64 mb-8" }), _jsx("div", { className: "space-y-6", children: [...Array(3)].map((_, i) => (_jsx("div", { className: "h-32 bg-gray-200 rounded" }, i))) })] }) }));
    }
    if (!job || !assessment) {
        return (_jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Assessment not found" }), _jsx("button", { onClick: () => navigate("/jobs"), className: "bg-emerald-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-emerald-700", children: "Back" })] }) }));
    }
    if (submitted) {
        return (_jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4", children: _jsx("svg", { className: "h-6 w-6 text-green-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }), _jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Assessment Submitted Successfully!" }), _jsxs("p", { className: "text-gray-600 mb-6", children: ["Thank you for completing the assessment for ", job.title, ". We will review your responses and get back to you soon."] }), _jsx("button", { onClick: () => navigate("/jobs"), className: "bg-emerald-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-emerald-700", children: "Back" })] }) }));
    }
    return (_jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsx("div", { className: "mb-8", children: _jsx("div", { className: "flex justify-between items-center", children: _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "md:text-3xl sm:text-2xl text-xl font-bold text-gray-900 mb-2", children: assessment.title }), _jsx("button", { onClick: () => navigate("/dashboard/assessments"), className: "px-4 sm:py-2 py-1 text-gray-900 border cursor-pointer  border-gray-300 rounded-lg hover:bg-gray-50 hover:text-emerald-500 ", children: "Back" })] }), _jsxs("p", { className: "sm:text-sm text-xs text-gray-600", children: [job.title, " \u2022 ", job.jobType, " \u2022 ", job.location] }), assessment.description && (_jsxs("p", { className: "text-black mt-2 sm:text-base text-sm", children: ["Description: ", assessment.description] }))] }) }) }), _jsx("div", { className: "space-y-8", children: assessment.sections.map((section, sectionIndex) => (_jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [_jsxs("h2", { className: "text-xl font-medium text-gray-900 mb-6", children: [sectionIndex + 1, ". ", section.title] }), _jsx("div", { className: "space-y-6", children: section.questions.map((question, questionIndex) => shouldShowQuestion(question) && (_jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700", children: [questionIndex + 1, ". ", question.question, question.required && (_jsx("span", { className: "text-red-500 ml-1", children: "*" }))] }), question.type === "single-choice" &&
                                        question.options && (_jsx("div", { className: "space-y-2", children: question.options.map((option, index) => (_jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "radio", name: question.id, value: option, checked: responses[question.id] === option, onChange: (e) => handleResponseChange(question.id, e.target.value), className: "mr-3" }), _jsx("span", { className: "text-sm text-gray-700", children: option })] }, index))) })), question.type === "multi-choice" && question.options && (_jsx("div", { className: "space-y-2", children: question.options.map((option, index) => (_jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: responses[question.id]?.includes(option) ||
                                                        false, onChange: (e) => {
                                                        const currentValues = responses[question.id] || [];
                                                        const newValues = e.target.checked
                                                            ? [...currentValues, option]
                                                            : currentValues.filter((v) => v !== option);
                                                        handleResponseChange(question.id, newValues);
                                                    }, className: "mr-3" }), _jsx("span", { className: "text-sm text-gray-700", children: option })] }, index))) })), question.type === "short-text" && (_jsx("input", { type: "text", value: responses[question.id] || "", onChange: (e) => handleResponseChange(question.id, e.target.value), className: `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors[question.id]
                                            ? "border-red-500"
                                            : "border-gray-300"}`, placeholder: "Enter your answer..." })), question.type === "long-text" && (_jsx("textarea", { value: responses[question.id] || "", onChange: (e) => handleResponseChange(question.id, e.target.value), rows: 4, className: `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors[question.id]
                                            ? "border-red-500"
                                            : "border-gray-300"}`, placeholder: "Enter your answer..." })), question.type === "numeric" && (_jsx("input", { type: "number", value: responses[question.id] || "", onChange: (e) => handleResponseChange(question.id, e.target.value), min: question.validation?.min, max: question.validation?.max, className: `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors[question.id]
                                            ? "border-red-500"
                                            : "border-gray-300"}`, placeholder: "Enter a number..." })), question.type === "file-upload" && (_jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors", children: [_jsx("svg", { className: "mx-auto h-12 w-12 text-gray-400", stroke: "currentColor", fill: "none", viewBox: "0 0 48 48", children: _jsx("path", { d: "M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }), _jsx("p", { className: "mt-2 text-sm text-gray-600", children: "Click to upload or drag and drop" }), _jsx("p", { className: "text-xs text-gray-500", children: "PNG, JPG, PDF up to 10MB" }), _jsx("input", { type: "file", className: "hidden", id: `file-${question.id}`, onChange: (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        handleResponseChange(question.id, file.name);
                                                    }
                                                } }), _jsx("label", { htmlFor: `file-${question.id}`, className: "mt-2 inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer", children: "Choose File" }), responses[question.id] && (_jsxs("p", { className: "mt-2 text-sm text-gray-600", children: ["Selected: ", responses[question.id]] }))] })), question.validation && (_jsxs("div", { className: "text-xs text-gray-500", children: [question.validation.minLength &&
                                                `Min Length: ${question.validation.minLength} `, question.validation.maxLength &&
                                                `Max Length: ${question.validation.maxLength} `, question.validation.min &&
                                                `Min Value: ${question.validation.min} `, question.validation.max &&
                                                `Max Value: ${question.validation.max}`] })), errors[question.id] && (_jsx("p", { className: "text-sm text-red-600", children: errors[question.id] }))] }, question.id))) })] }, section.id))) }), _jsx("div", { className: "mt-8 pt-6 border-t border-gray-200", children: _jsxs("div", { className: "flex sm:flex-row flex-col gap-5 justify-between items-center", children: [_jsx("div", { className: "text-sm text-gray-500", children: "All required questions must be answered before submission" }), _jsxs("div", { className: "flex space-x-3 text-nowrap", children: [_jsx("button", { onClick: saveDraft, className: "px-4 py-2 cursor-pointer text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50", children: "Save Draft" }), _jsx("button", { onClick: handleSubmit, className: "px-4 py-2 w-full cursor-pointer bg-emerald-600 text-white rounded-lg hover:bg-emerald-700", children: "Submit" })] })] }) })] }));
};
export default AssessmentPreview;
