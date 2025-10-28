import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JobModal from "../components/Jobs/JobModal";
import { DeleteConfirmationModal } from "../components/Jobs/DeleteConfirmationModal";
import { toast } from "react-hot-toast";
const Jobs = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sortOption, setSortOption] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);
    const [pageSize] = useState(10);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [draggedJob, setDraggedJob] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);
    const [selectedJobs, setSelectedJobs] = useState([]);
    // Fetch Jobs
    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/jobs", {
                params: {
                    search,
                    status: statusFilter,
                    sort: sortOption,
                    page: currentPage,
                    pageSize,
                },
            });
            setJobs(response.data.data);
            setTotalJobs(response.data.total);
        }
        catch (error) {
            console.error("Error fetching jobs:", error);
        }
        finally {
            setLoading(false);
        }
    };
    // Fetch Candidates
    const fetchCandidates = async () => {
        try {
            const response = await axios.get("/candidates");
            setCandidates(response.data.data || []);
        }
        catch (error) {
            console.error("Error fetching candidates:", error);
            setCandidates([]);
        }
    };
    useEffect(() => {
        fetchJobs();
        fetchCandidates();
    }, [search, statusFilter, sortOption, currentPage, pageSize]);
    // Handlers
    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };
    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        setCurrentPage(1);
    };
    const handleArchive = async (job) => {
        try {
            await axios.patch(`/jobs/${job.id}`, {
                status: job.status === "active" ? "archived" : "active",
            });
            toast.success(`Job ${job.status === "active" ? "archived" : "unarchived"}`);
            fetchJobs();
        }
        catch (error) {
            console.error("Error updating job status:", error);
            toast.error("Error updating job");
        }
    };
    const handleDelete = async (jobId) => {
        try {
            await axios.delete(`/jobs/${jobId}`);
            toast.success("Job deleted successfully");
            fetchJobs();
            setShowDeleteModal(false);
            setJobToDelete(null);
        }
        catch (error) {
            console.error("Error deleting job:", error);
            toast.error("Error deleting job");
        }
    };
    const handleDuplicate = async (job) => {
        try {
            const newJob = { ...job, id: undefined, title: `${job.title} (Copy)` };
            await axios.post("/jobs", newJob);
            toast.success("Job duplicated successfully");
            fetchJobs();
        }
        catch (error) {
            console.error("Error duplicating job:", error);
            toast.error("Error duplicating job");
        }
    };
    const getApplicationsForJob = (jobId) => {
        return candidates.filter((candidate) => candidate.jobId === jobId);
    };
    // Drag & Drop
    const handleReorder = async (fromIndex, toIndex) => {
        const newJobs = [...jobs];
        const [movedJob] = newJobs.splice(fromIndex, 1);
        newJobs.splice(toIndex, 0, movedJob);
        setJobs(newJobs);
        try {
            await axios.patch(`/jobs/${movedJob.id}/reorder`, {
                fromOrder: fromIndex,
                toOrder: toIndex,
            });
        }
        catch (error) {
            console.error("Error reordering jobs:", error);
            fetchJobs();
        }
    };
    const handleDragStart = (e, job) => {
        setDraggedJob(job);
        e.dataTransfer.effectAllowed = "move";
    };
    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        if (!draggedJob)
            return;
        const draggedIndex = jobs.findIndex((job) => job.id === draggedJob.id);
        if (draggedIndex === -1 || draggedIndex === targetIndex)
            return;
        handleReorder(draggedIndex, targetIndex);
        setDraggedJob(null);
    };
    // Bulk Selection
    const toggleSelectJob = (jobId) => {
        setSelectedJobs((prev) => prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]);
    };
    const selectAll = () => {
        if (selectedJobs.length === jobs.length)
            setSelectedJobs([]);
        else
            setSelectedJobs(jobs.map((job) => job.id));
    };
    const handleBulkDelete = async () => {
        try {
            await Promise.all(selectedJobs.map((id) => axios.delete(`/jobs/${id}`)));
            toast.success("Selected jobs deleted");
            setSelectedJobs([]);
            fetchJobs();
        }
        catch (error) {
            console.error("Error bulk deleting:", error);
            toast.error("Failed to delete selected jobs");
        }
    };
    const handleBulkArchive = async (toStatus) => {
        try {
            await Promise.all(selectedJobs.map((id) => axios.patch(`/jobs/${id}`, { status: toStatus })));
            toast.success(`Selected jobs marked as ${toStatus}`);
            setSelectedJobs([]);
            fetchJobs();
        }
        catch (error) {
            console.error("Error bulk archive:", error);
            toast.error("Failed to update jobs");
        }
    };
    // Export CSV
    const handleExportCSV = () => {
        const headers = ["Title", "Location", "Status", "Tags", "Description"];
        const csvRows = [
            headers.join(","),
            ...jobs.map((j) => [j.title, j.location, j.status, j.tags.join(" "), `"${j.description}"`].join(",")),
        ];
        const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "jobs_export.csv";
        a.click();
    };
    const totalPages = Math.ceil(totalJobs / pageSize);
    if (loading && jobs.length === 0) {
        return (_jsx("div", { className: "max-w-7xl mx-auto px-4 py-8", children: _jsxs("div", { className: "animate-pulse space-y-4", children: [_jsx("div", { className: "h-8 bg-gray-200 rounded w-48" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-64" }), [...Array(5)].map((_, i) => (_jsx("div", { className: "h-16 bg-gray-200 rounded" }, i)))] }) }));
    }
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [_jsxs("div", { className: "mb-8 flex justify-between items-center flex-wrap gap-3", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-emerald-600 mb-1", children: "Jobs" }), _jsx("p", { className: "text-emerald-700", children: "Create and manage job postings" })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx("button", { onClick: () => navigate("/dashboard/candidates"), className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700", children: "View Candidates" }), _jsx("button", { onClick: () => setShowCreateModal(true), className: "bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700", children: "Create" }), _jsx("button", { onClick: handleExportCSV, className: "bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200", children: "Export CSV" })] })] }), _jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6", children: _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("input", { type: "text", placeholder: "Search jobs by title or tags...", value: search, onChange: (e) => handleSearch(e.target.value), className: "flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" }), _jsxs("select", { value: statusFilter, onChange: (e) => handleStatusFilter(e.target.value), className: "sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500", children: [_jsx("option", { value: "", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "archived", children: "Archived" })] }), _jsxs("select", { value: sortOption, onChange: (e) => setSortOption(e.target.value), className: "sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500", children: [_jsx("option", { value: "newest", children: "Newest First" }), _jsx("option", { value: "oldest", children: "Oldest First" }), _jsx("option", { value: "title-asc", children: "Title (A\u2013Z)" }), _jsx("option", { value: "title-desc", children: "Title (Z\u2013A)" })] })] }) }), selectedJobs.length > 0 && (_jsxs("div", { className: "bg-yellow-50 border border-yellow-200 p-4 mb-4 rounded-lg flex justify-between items-center", children: [_jsxs("p", { className: "text-yellow-800 font-medium", children: [selectedJobs.length, " job(s) selected"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => handleBulkArchive("archived"), className: "text-orange-600 hover:underline", children: "Archive" }), _jsx("button", { onClick: () => handleBulkArchive("active"), className: "text-green-600 hover:underline", children: "Unarchive" }), _jsx("button", { onClick: handleBulkDelete, className: "text-red-600 hover:underline", children: "Delete" })] })] })), _jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200", children: jobs.length === 0 ? (_jsx("div", { className: "text-center py-12 text-gray-500", children: "No jobs found" })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "divide-y divide-gray-200", children: jobs.map((job, index) => (_jsxs("div", { draggable: true, onDragStart: (e) => handleDragStart(e, job), onDragOver: handleDragOver, onDrop: (e) => handleDrop(e, index), className: `p-6 flex justify-between items-start ${draggedJob?.id === job.id ? "opacity-50" : ""}`, children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("input", { type: "checkbox", checked: selectedJobs.includes(job.id), onChange: () => toggleSelectJob(job.id) }), _jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold text-gray-900 flex items-center gap-2", children: [job.title, _jsx("span", { className: `text-xs px-2 py-1 rounded-full ${job.status === "active"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-gray-100 text-gray-600"}`, children: job.status })] }), _jsx("p", { className: "text-sm text-gray-500", children: job.location }), _jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [job.description.substring(0, 100), "..."] }), _jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: job.tags.map((t) => (_jsx("span", { className: "px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded", children: t }, t))) }), _jsxs("p", { className: "text-xs text-gray-500 mt-2", children: [getApplicationsForJob(job.id).length, " applications"] })] })] }), _jsxs("div", { className: "flex flex-col gap-1 text-sm", children: [_jsx("button", { onClick: () => navigate(`/dashboard/candidates?job=${job.id}`), className: "text-emerald-600 hover:underline", children: "View" }), _jsx("button", { onClick: () => setEditingJob(job), className: "text-blue-600 hover:underline", children: "Edit" }), _jsx("button", { onClick: () => handleDuplicate(job), className: "text-purple-600 hover:underline", children: "Duplicate" }), _jsx("button", { onClick: () => handleArchive(job), className: "text-orange-600 hover:underline", children: job.status === "active" ? "Archive" : "Unarchive" }), _jsx("button", { onClick: () => {
                                                    setShowDeleteModal(true);
                                                    setJobToDelete(job);
                                                }, className: "text-red-600 hover:underline", children: "Delete" })] })] }, job.id))) }), totalPages > 1 && (_jsxs("div", { className: "px-6 py-4 border-t border-gray-200 flex justify-between items-center", children: [_jsxs("span", { className: "text-sm text-gray-700", children: ["Showing ", (currentPage - 1) * pageSize + 1, "\u2013", Math.min(currentPage * pageSize, totalJobs), " of ", totalJobs] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => setCurrentPage(Math.max(1, currentPage - 1)), disabled: currentPage === 1, className: "px-3 py-1 border rounded disabled:opacity-50", children: "Prev" }), [...Array(totalPages)].map((_, i) => (_jsx("button", { onClick: () => setCurrentPage(i + 1), className: `px-3 py-1 border rounded ${currentPage === i + 1
                                                ? "bg-emerald-600 text-white"
                                                : "hover:bg-gray-100"}`, children: i + 1 }, i))), _jsx("button", { onClick: () => setCurrentPage(Math.min(totalPages, currentPage + 1)), disabled: currentPage === totalPages, className: "px-3 py-1 border rounded disabled:opacity-50", children: "Next" })] })] }))] })) }), (showCreateModal || editingJob) && (_jsx(JobModal, { job: editingJob, onClose: () => {
                    setShowCreateModal(false);
                    setEditingJob(null);
                }, onSave: () => {
                    fetchJobs();
                    setShowCreateModal(false);
                    setEditingJob(null);
                } })), showDeleteModal && jobToDelete && (_jsx(DeleteConfirmationModal, { isOpen: showDeleteModal, onClose: () => setShowDeleteModal(false), onConfirm: () => handleDelete(jobToDelete.id), jobTitle: jobToDelete.title }))] }));
};
export default Jobs;
