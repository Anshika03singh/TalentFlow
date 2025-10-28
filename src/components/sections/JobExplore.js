import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { fetchJobs } from "../../services/api/jobsApi";
export default function JobExplore() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        const loadJobs = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await fetchJobs({ search, status, page: 1, pageSize: 10 });
                setJobs(data.data);
            }
            catch (err) {
                console.error(err);
                setError("Failed to load jobs.");
            }
            finally {
                setLoading(false);
            }
        };
        loadJobs();
    }, [search, status]);
    return (_jsxs("section", { className: "px-8 py-12 max-w-5xl mx-auto", children: [_jsx("h2", { className: "text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100", children: "Explore Open Positions" }), _jsxs("div", { className: "flex flex-wrap gap-4 mb-6", children: [_jsx("input", { type: "text", placeholder: "Search by job title...", value: search, onChange: (e) => setSearch(e.target.value), className: "px-4 py-2 border rounded-lg w-64 dark:bg-gray-800 dark:text-gray-100" }), _jsxs("select", { value: status, onChange: (e) => setStatus(e.target.value), className: "px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-gray-100", children: [_jsx("option", { value: "", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "archived", children: "Archived" })] })] }), loading && _jsx("p", { className: "text-gray-500", children: "Loading jobs..." }), error && _jsx("p", { className: "text-red-500", children: error }), !loading && !error && (_jsx("ul", { className: "space-y-4", children: jobs.map((job) => (_jsxs("li", { className: "border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-800 dark:text-gray-100", children: job.title }), _jsx("p", { className: "text-sm text-gray-500 mb-2", children: job.status }), _jsx("div", { className: "flex flex-wrap gap-2", children: job.tags.map((tag) => (_jsx("span", { className: "bg-gray-100 dark:bg-gray-700 text-sm px-2 py-1 rounded-md text-gray-700 dark:text-gray-200", children: tag }, tag))) })] }, job.id))) }))] }));
}
