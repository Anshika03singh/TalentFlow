import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NotesWithMentions from "../components/NotesWithMentions";
const CandidateProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [candidate, setCandidate] = useState(null);
    const [job, setJob] = useState(null);
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState("");
    const [newNote, setNewNote] = useState("");
    const stages = [
        { id: "applied", name: "Applied", color: "bg-blue-100 text-blue-800" },
        { id: "screening", name: "Screening", color: "bg-yellow-100 text-yellow-800" },
        { id: "interview", name: "Interview", color: "bg-purple-100 text-purple-800" },
        { id: "offer", name: "Offer", color: "bg-green-100 text-green-800" },
        { id: "rejected", name: "Rejected", color: "bg-red-100 text-red-800" },
        { id: "hired", name: "Hired", color: "bg-emerald-100 text-emerald-800" },
    ];
    useEffect(() => {
        fetchData();
    }, [id]);
    const fetchData = async () => {
        try {
            setLoading(true);
            const [candidateResponse, timelineResponse] = await Promise.all([
                axios.get(`/candidates/${id}`),
                axios.get(`/candidates/${id}/timeline`),
            ]);
            setCandidate(candidateResponse.data);
            setTimeline(timelineResponse.data || []);
            if (candidateResponse.data.jobId) {
                const jobResponse = await axios.get(`/jobs/${candidateResponse.data.jobId}`);
                setJob(jobResponse.data);
            }
            const savedNotes = localStorage.getItem(`candidate-notes-${id}`);
            if (savedNotes)
                setNotes(savedNotes);
        }
        catch (error) {
            console.error("Error fetching candidate data:", error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleStageChange = async (newStage) => {
        if (!candidate)
            return;
        try {
            await axios.patch(`/candidates/${candidate.id}`, {
                stage: newStage,
                updatedAt: new Date(),
            });
            setCandidate((prev) => prev ? { ...prev, stage: newStage } : null);
            const newTimelineEvent = {
                stage: newStage,
                date: new Date(),
                note: `Moved to ${stages.find((s) => s.id === newStage)?.name || newStage}`,
            };
            setTimeline((prev) => [newTimelineEvent, ...prev]);
            const timelineResponse = await axios.get(`/candidates/${id}/timeline`);
            setTimeline(timelineResponse.data || []);
        }
        catch (error) {
            console.error("Error updating candidate stage:", error);
        }
    };
    const handleAddNote = () => {
        if (!newNote.trim())
            return;
        const noteWithTimestamp = `[${new Date().toLocaleString()}] ${newNote}`;
        const updatedNotes = notes ? `${notes}\n\n${noteWithTimestamp}` : noteWithTimestamp;
        setNotes(updatedNotes);
        setNewNote("");
        localStorage.setItem(`candidate-notes-${id}`, updatedNotes);
    };
    const getStageInfo = (stageId) => {
        return (stages.find((s) => s.id === stageId) || {
            name: stageId,
            color: "bg-gray-100 text-gray-800",
        });
    };
    if (loading) {
        return (_jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-8 bg-gray-200 rounded w-48 mb-2" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-64 mb-8" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsx("div", { className: "h-96 bg-gray-200 rounded" }), _jsx("div", { className: "h-96 bg-gray-200 rounded" })] })] }) }));
    }
    if (!candidate) {
        return (_jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Candidate not found" }), _jsx("button", { onClick: () => navigate("/dashboard/candidates"), className: "bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700", children: "Back" })] }));
    }
    const currentStageInfo = getStageInfo(candidate.stage);
    return (_jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "mb-8 flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: candidate.name }), _jsx("p", { className: "text-gray-600 mb-2", children: candidate.email }), job && (_jsxs("p", { className: "text-gray-500", children: ["Applied for: ", _jsx("span", { className: "font-medium", children: job.title })] }))] }), _jsx("button", { onClick: () => navigate("/dashboard/candidates"), className: "px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-emerald-500", children: "Back" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [_jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Current Status" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: `px-3 py-1 text-sm font-medium rounded-full ${currentStageInfo.color}`, children: currentStageInfo.name }), _jsxs("span", { className: "text-sm text-gray-500", children: ["Since ", new Date(candidate.updatedAt).toLocaleDateString()] })] }), _jsx("select", { value: candidate.stage, onChange: (e) => handleStageChange(e.target.value), className: "px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500", children: stages.map((stage) => (_jsx("option", { value: stage.id, children: stage.name }, stage.id))) })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [_jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Application Details" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("p", { children: [_jsx("span", { className: "font-medium text-gray-500", children: "Applied Date:" }), " ", new Date(candidate.appliedAt).toLocaleDateString()] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium text-gray-500", children: "Last Updated:" }), " ", new Date(candidate.updatedAt).toLocaleDateString()] }), candidate.phone && _jsxs("p", { children: [_jsx("span", { className: "font-medium text-gray-500", children: "Phone:" }), " ", candidate.phone] }), candidate.experience && _jsxs("p", { children: [_jsx("span", { className: "font-medium text-gray-500", children: "Experience:" }), " ", candidate.experience] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [_jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Notes" }), _jsx(NotesWithMentions, { value: newNote, onChange: setNewNote, placeholder: "Add a note... (use @ to mention)", rows: 3 }), _jsx("button", { onClick: handleAddNote, className: "mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm", children: "Add Note" }), notes && (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-sm font-medium text-gray-700 mb-2", children: "Previous Notes:" }), _jsx("div", { className: "bg-gray-50 p-3 rounded-md", children: _jsx("pre", { className: "text-sm text-gray-900 whitespace-pre-wrap", children: notes }) })] }))] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-3", children: "Completed Assessments" }), loading ? (_jsx("p", { children: "Loading assessments..." })) : job?.assessments && job.assessments.length > 0 ? (_jsx("ul", { className: "space-y-3", children: job.assessments.map((assessment) => (_jsx("li", { className: "p-4 border rounded-lg shadow-sm hover:shadow-md transition", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: assessment.title }), _jsxs("p", { className: "text-sm text-gray-500", children: ["Score: ", _jsx("strong", { children: assessment.score ?? "Not evaluated" })] })] }), _jsx("button", { className: "text-blue-600 hover:underline", onClick: () => window.location.assign(`/assessment-results/${assessment.id}`), children: "View Results" })] }) }, assessment.id))) })) : (_jsx("p", { className: "text-gray-500", children: "No assessments completed yet." }))] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [_jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Timeline" }), timeline.length === 0 ? (_jsx("p", { className: "text-sm text-gray-500", children: "No timeline events yet." })) : (_jsx("div", { className: "space-y-4", children: timeline.map((event, index) => {
                                    const stageInfo = getStageInfo(event.stage);
                                    return (_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: `w-3 h-3 rounded-full ${stageInfo.color
                                                        .replace("text-", "bg-")
                                                        .replace("100", "500")}` }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: `px-2 py-1 text-xs font-medium rounded-full ${stageInfo.color}`, children: stageInfo.name }), _jsx("span", { className: "text-xs text-gray-500", children: new Date(event.date).toLocaleDateString() })] }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: event.note })] })] }, index));
                                }) }))] })] })] }));
};
export default CandidateProfile;
