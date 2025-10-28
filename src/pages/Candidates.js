import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import NotesWithMentions from "../components/NotesWithMentions";
import { toast } from "react-hot-toast";
const Candidates = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const jobFilter = searchParams.get("job");
    const [candidates, setCandidates] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [draggedCandidate, setDraggedCandidate] = useState(null);
    const [search, setSearch] = useState("");
    const [stageFilter, setStageFilter] = useState("");
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [quickNote, setQuickNote] = useState("");
    const stages = [
        { id: "applied", name: "Applied", color: "bg-blue-100 text-blue-800" },
        {
            id: "screening",
            name: "Screening",
            color: "bg-yellow-100 text-yellow-800",
        },
        {
            id: "interview",
            name: "Interview",
            color: "bg-purple-100 text-purple-800",
        },
        { id: "offer", name: "Offer", color: "bg-green-100 text-green-800" },
        { id: "rejected", name: "Rejected", color: "bg-red-100 text-red-800" },
        { id: "hired", name: "Hired", color: "bg-emerald-100 text-emerald-800" },
    ];
    const fetchCandidates = async () => {
        try {
            setLoading(true);
            // Build URL with filters
            let url = "/candidates";
            const params = new URLSearchParams();
            if (jobFilter) {
                params.append("jobId", jobFilter);
            }
            if (search) {
                params.append("search", search);
            }
            if (stageFilter) {
                params.append("stage", stageFilter);
            }
            if (params.toString()) {
                url += `?${params.toString()}`;
            }
            const response = await axios.get(url);
            let filteredCandidates = response.data.data;
            setCandidates(filteredCandidates);
        }
        catch (error) {
            console.error("Error fetching candidates:", error);
        }
        finally {
            setLoading(false);
        }
    };
    const fetchJobs = async () => {
        try {
            const response = await axios.get("/jobs");
            setJobs(response.data.data);
        }
        catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };
    useEffect(() => {
        fetchJobs();
    }, []);
    useEffect(() => {
        if (jobs && jobs.length > 0) {
            fetchCandidates();
        }
    }, [jobFilter, jobs, search, stageFilter]);
    const getCandidatesByStage = (stageId) => {
        return candidates.filter((candidate) => candidate.stage === stageId);
    };
    const getJobTitle = (jobId) => {
        const job = jobs.find((j) => j.id === jobId);
        return job ? job.title : "Unknown Job";
    };
    const handleDeleteCandidate = async (candidateId) => {
        try {
            await axios.delete(`/applications/${candidateId}`);
            toast.success("Candidate deleted successfully");
            fetchCandidates();
        }
        catch (error) {
            console.error("Error deleting candidate:", error);
            toast.error("Error deleting candidate");
        }
    };
    const handleDragStart = (e, candidate) => {
        setDraggedCandidate(candidate);
        e.dataTransfer.effectAllowed = "move";
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };
    const handleDrop = async (e, targetStage) => {
        e.preventDefault();
        if (!draggedCandidate || draggedCandidate.stage === targetStage) {
            return;
        }
        try {
            await axios.patch(`/applications/${draggedCandidate.id}/status`, {
                status: targetStage,
            });
            // Update local state
            setCandidates((prev) => prev.map((candidate) => candidate.id === draggedCandidate.id
                ? { ...candidate, stage: targetStage }
                : candidate));
        }
        catch (error) {
            console.error("Error updating candidate status:", error);
        }
        setDraggedCandidate(null);
    };
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };
    const handleAddNote = (candidate) => {
        setSelectedCandidate(candidate);
        setQuickNote("");
        setShowNotesModal(true);
    };
    const handleSaveNote = () => {
        if (!selectedCandidate || !quickNote.trim())
            return;
        const noteWithTimestamp = `[${new Date().toLocaleString()}] ${quickNote}`;
        const existingNotes = localStorage.getItem(`candidate-notes-${selectedCandidate.id}`) || "";
        const updatedNotes = existingNotes
            ? `${existingNotes}\n\n${noteWithTimestamp}`
            : noteWithTimestamp;
        localStorage.setItem(`candidate-notes-${selectedCandidate.id}`, updatedNotes);
        setShowNotesModal(false);
        setSelectedCandidate(null);
        setQuickNote("");
    };
    if (loading) {
        return (_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-8 bg-gray-200 rounded w-48 mb-8" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6", children: [...Array(6)].map((_, i) => (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "h-6 bg-gray-200 rounded" }), _jsx("div", { className: "space-y-3", children: [...Array(3)].map((_, j) => (_jsx("div", { className: "h-32 bg-gray-200 rounded" }, j))) })] }, i))) })] }) }));
    }
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsx("div", { className: "mb-8", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl text-emerald-600 font-bold mb-2", children: "Candidates" }), _jsx("p", { className: "text-emerald-600/90", children: jobFilter
                                        ? `Applications for ${getJobTitle(jobFilter)}`
                                        : "Manage candidate applications" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [jobFilter && (_jsx("button", { onClick: () => navigate("/dashboard/candidates"), className: "text-gray-600 hover:text-gray-900 text-sm font-medium cursor-pointer", children: "View All Applications" })), _jsxs("div", { className: "text-sm text-emerald-600 font-bold", children: ["Total: ", candidates.length, " candidates"] })] })] }) }), _jsx("div", { className: "mb-6", children: _jsx("div", { className: "bg-white rounded-lg shadow-sm border border-emerald-400 p-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Search Candidates" }), _jsx("input", { type: "text", placeholder: "Search by name or email...", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Filter by Stage" }), _jsxs("select", { value: stageFilter, onChange: (e) => setStageFilter(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500", children: [_jsx("option", { value: "", children: "All Stages" }), stages.map((stage) => (_jsx("option", { value: stage.id, children: stage.name }, stage.id)))] })] }), _jsx("div", { className: "flex items-end", children: _jsx("button", { onClick: () => {
                                        setSearch("");
                                        setStageFilter("");
                                    }, className: "px-4 py-2 cursor-pointer text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50", children: "Clear Filters" }) })] }) }) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4", children: stages.map((stage) => {
                    const stageCandidates = getCandidatesByStage(stage.id);
                    return (_jsxs("div", { className: "bg-gray-50 border border-emerald-400 rounded-lg p-3 min-h-[600px] flex flex-col", onDragOver: handleDragOver, onDrop: (e) => handleDrop(e, stage.id), children: [_jsxs("div", { className: "flex items-center justify-between mb-3 flex-shrink-0", children: [_jsx("h3", { className: "font-semibold text-gray-900 text-sm", children: stage.name }), _jsx("span", { className: `px-2 py-1 text-xs font-medium rounded-full ${stage.color}`, children: stageCandidates.length })] }), _jsxs("div", { className: "flex-1 overflow-y-auto space-y-2", children: [stageCandidates.map((candidate) => (_jsxs("div", { draggable: true, onDragStart: (e) => handleDragStart(e, candidate), className: "flex flex-col justify-between gap-1 bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-move mb-3", children: [_jsxs("div", { className: "mb-2", children: [_jsx("h4", { className: "font-medium text-gray-900 text-sm truncate", children: candidate.name }), _jsx("p", { className: "text-xs text-gray-600 truncate", children: candidate.email })] }), _jsxs("div", { className: "mb-2", children: [_jsx("p", { className: "text-xs text-gray-700 font-medium truncate", children: getJobTitle(candidate.jobId) }), _jsxs("p", { className: "text-xs text-gray-500", children: ["Applied: ", formatDate(candidate.appliedAt)] })] }), candidate.skills && candidate.skills.length > 0 && (_jsx("div", { className: "mb-2", children: _jsxs("div", { className: "flex flex-wrap gap-1", children: [candidate.skills.slice(0, 2).map((skill, index) => (_jsx("span", { className: "px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded truncate max-w-[80px]", title: skill, children: skill }, index))), candidate.skills.length > 2 && (_jsxs("span", { className: "text-xs text-gray-500", children: ["+", candidate.skills.length - 2] }))] }) })), candidate.experience && (_jsx("div", { className: "mb-3", children: _jsx("p", { className: "text-xs text-gray-600 leading-tight overflow-hidden", style: {
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                        maxHeight: "2.4em",
                                                        lineHeight: "1.2em",
                                                    }, title: candidate.experience, children: candidate.experience }) })), _jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-gray-100", children: [_jsx("button", { onClick: () => {
                                                            navigate(`/candidates/${candidate.id}`);
                                                        }, className: "cursor-pointer border border-emerald-500 text-xs text-emerald-600 hover:text-emerald-700 font-medium px-2 py-1 rounded hover:bg-emerald-50", children: "View" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => handleAddNote(candidate), className: "cursor-pointer text-xs text-emerald-600 hover:text-emerald-700 p-1 rounded hover:bg-gray-100", title: "Add Notes", children: _jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }) }), _jsx("button", { onClick: () => handleDeleteCandidate(candidate.id), className: "cursor-pointer text-xs text-red-600 hover:text-red-700 p-1 rounded hover:bg-gray-100", title: "Delete", children: _jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }) })] })] })] }, candidate.id))), stageCandidates.length === 0 && (_jsx("div", { className: "text-center py-6 text-gray-500 text-xs", children: "No candidates" }))] })] }, stage.id));
                }) }), showNotesModal && selectedCandidate && (_jsx("div", { className: "fixed inset-0 bg-emerald-50 bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white border border-emerald-400 rounded-lg p-6 w-full max-w-md mx-4", children: [_jsxs("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: ["Add Note for ", selectedCandidate.name] }), _jsx(NotesWithMentions, { value: quickNote, onChange: setQuickNote, placeholder: "Add a quick note... (use @ to mention team members)", rows: 4 }), _jsxs("div", { className: "flex justify-end space-x-3 mt-4", children: [_jsx("button", { onClick: () => {
                                        setShowNotesModal(false);
                                        setSelectedCandidate(null);
                                        setQuickNote("");
                                    }, className: "px-4 py-2 cursor-pointer text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50", children: "Cancel" }), _jsx("button", { onClick: handleSaveNote, className: "px-4 py-2 cursor-pointer bg-emerald-600 text-white rounded-lg hover:bg-emerald-700", children: "Save Note" })] })] }) }))] }));
};
export default Candidates;
