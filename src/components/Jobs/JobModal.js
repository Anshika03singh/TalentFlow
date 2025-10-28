import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
const JobModal = ({ job, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: job?.title || "",
        location: job?.location || "",
        jobType: job?.jobType,
        salary: job?.salary || "",
        description: job?.description || "",
        requirements: job?.requirements.join("\n") || "",
        tags: job?.tags.join(", ") || "",
        status: job?.status || "active",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }
        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm())
            return;
        setLoading(true);
        try {
            const jobData = {
                ...formData,
                requirements: formData.requirements.split("\n").filter((r) => r.trim()),
                tags: formData.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t),
            };
            if (job) {
                await axios.patch(`/jobs/${job.id}`, jobData);
            }
            else {
                await axios.post("/jobs", jobData);
            }
            toast.success("Job saved successfully");
            onSave();
        }
        catch (error) {
            console.error("Error saving job:", error);
            toast.error("Error saving job");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-emerald-50 bg-opacity-50 flex items-center justify-center z-50", children: _jsx("div", { className: "bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-xl font-bold text-gray-900", children: job ? "Edit Job" : "Create New Job" }), _jsx("button", { onClick: onClose, className: "text-gray-400  cursor-pointer hover:text-emerald-500", children: _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Job Title *" }), _jsx("input", { type: "text", value: formData.title, onChange: (e) => setFormData({ ...formData, title: e.target.value }), className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${errors.title ? "border-red-300" : "border-gray-300"}`, placeholder: "e.g., Senior React Developer" }), errors.title && (_jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.title }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Location" }), _jsx("input", { type: "text", value: formData.location, onChange: (e) => setFormData({ ...formData, location: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent", placeholder: "e.g., San Francisco, CA" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Job Type" }), _jsxs("select", { value: formData.jobType, onChange: (e) => setFormData({
                                                    ...formData,
                                                    jobType: e.target.value,
                                                }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent", children: [_jsx("option", { value: "Full-time", children: "Full-time" }), _jsx("option", { value: "Part-time", children: "Part-time" }), _jsx("option", { value: "Contract", children: "Contract" }), _jsx("option", { value: "Remote", children: "Remote" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Salary Range" }), _jsx("input", { type: "text", value: formData.salary, onChange: (e) => setFormData({ ...formData, salary: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent", placeholder: "e.g., $80K - $120K" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Status" }), _jsxs("select", { value: formData.status, onChange: (e) => setFormData({
                                                    ...formData,
                                                    status: e.target.value,
                                                }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent", children: [_jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "archived", children: "Archived" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description *" }), _jsx("textarea", { value: formData.description, onChange: (e) => setFormData({ ...formData, description: e.target.value }), rows: 4, className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${errors.description ? "border-red-300" : "border-gray-300"}`, placeholder: "Describe the role, responsibilities, and what makes this opportunity exciting..." }), errors.description && (_jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.description }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Requirements (one per line)" }), _jsx("textarea", { value: formData.requirements, onChange: (e) => setFormData({ ...formData, requirements: e.target.value }), rows: 4, className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent", placeholder: "3+ years of React experience\nStrong TypeScript skills\nExperience with testing frameworks" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tags (comma-separated)" }), _jsx("input", { type: "text", value: formData.tags, onChange: (e) => setFormData({ ...formData, tags: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent", placeholder: "React, TypeScript, Frontend, Remote" })] }), _jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [_jsx("button", { type: "button", onClick: onClose, className: "px-4 py-2 cursor-pointer text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200", children: "Cancel" }), _jsx("button", { type: "submit", disabled: loading, className: "px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors duration-200", children: loading ? "Saving..." : job ? "Update Job" : "Create Job" })] })] })] }) }) }));
};
export default JobModal;
