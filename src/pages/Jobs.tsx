import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { Job } from "../services/seed/jobsSeed";
import JobModal from "../components/Jobs/JobModal";
import { DeleteConfirmationModal } from "../components/Jobs/DeleteConfirmationModal";
import { toast } from "react-hot-toast";

interface JobsResponse {
  data: Job[];
  total: number;
  page: number;
  pageSize: number;
}

const Jobs: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [pageSize] = useState(10);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [draggedJob, setDraggedJob] = useState<Job | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get<JobsResponse>("/jobs", {
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
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Candidates
  const fetchCandidates = async () => {
    try {
      const response = await axios.get("/candidates");
      setCandidates(response.data.data || []);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setCandidates([]);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchCandidates();
  }, [search, statusFilter, sortOption, currentPage, pageSize]);

  // Handlers
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleArchive = async (job: Job) => {
    try {
      await axios.patch(`/jobs/${job.id}`, {
        status: job.status === "active" ? "archived" : "active",
      });
      toast.success(`Job ${job.status === "active" ? "archived" : "unarchived"}`);
      fetchJobs();
    } catch (error) {
      console.error("Error updating job status:", error);
      toast.error("Error updating job");
    }
  };

  const handleDelete = async (jobId: string) => {
    try {
      await axios.delete(`/jobs/${jobId}`);
      toast.success("Job deleted successfully");
      fetchJobs();
      setShowDeleteModal(false);
      setJobToDelete(null);
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Error deleting job");
    }
  };

  const handleDuplicate = async (job: Job) => {
    try {
      const newJob = { ...job, id: undefined, title: `${job.title} (Copy)` };
      await axios.post("/jobs", newJob);
      toast.success("Job duplicated successfully");
      fetchJobs();
    } catch (error) {
      console.error("Error duplicating job:", error);
      toast.error("Error duplicating job");
    }
  };

  const getApplicationsForJob = (jobId: string) => {
    return candidates.filter((candidate) => candidate.jobId === jobId);
  };

  // Drag & Drop
  const handleReorder = async (fromIndex: number, toIndex: number) => {
    const newJobs = [...jobs];
    const [movedJob] = newJobs.splice(fromIndex, 1);
    newJobs.splice(toIndex, 0, movedJob);
    setJobs(newJobs);
    try {
      await axios.patch(`/jobs/${movedJob.id}/reorder`, {
        fromOrder: fromIndex,
        toOrder: toIndex,
      });
    } catch (error) {
      console.error("Error reordering jobs:", error);
      fetchJobs();
    }
  };

  const handleDragStart = (e: React.DragEvent, job: Job) => {
    setDraggedJob(job);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!draggedJob) return;
    const draggedIndex = jobs.findIndex((job) => job.id === draggedJob.id);
    if (draggedIndex === -1 || draggedIndex === targetIndex) return;
    handleReorder(draggedIndex, targetIndex);
    setDraggedJob(null);
  };

  // Bulk Selection
  const toggleSelectJob = (jobId: string) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const selectAll = () => {
    if (selectedJobs.length === jobs.length) setSelectedJobs([]);
    else setSelectedJobs(jobs.map((job) => job.id));
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedJobs.map((id) => axios.delete(`/jobs/${id}`)));
      toast.success("Selected jobs deleted");
      setSelectedJobs([]);
      fetchJobs();
    } catch (error) {
      console.error("Error bulk deleting:", error);
      toast.error("Failed to delete selected jobs");
    }
  };

  const handleBulkArchive = async (toStatus: "active" | "archived") => {
    try {
      await Promise.all(
        selectedJobs.map((id) =>
          axios.patch(`/jobs/${id}`, { status: toStatus })
        )
      );
      toast.success(`Selected jobs marked as ${toStatus}`);
      setSelectedJobs([]);
      fetchJobs();
    } catch (error) {
      console.error("Error bulk archive:", error);
      toast.error("Failed to update jobs");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["Title", "Location", "Status", "Tags", "Description"];
    const csvRows = [
      headers.join(","),
      ...jobs.map((j) =>
        [j.title, j.location, j.status, j.tags.join(" "), `"${j.description}"`].join(",")
      ),
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
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-emerald-600 mb-1">Jobs</h1>
          <p className="text-emerald-700">Create and manage job postings</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate("/dashboard/candidates")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            View Candidates
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            Create
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search jobs by title or tags..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title-asc">Title (A–Z)</option>
            <option value="title-desc">Title (Z–A)</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedJobs.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 mb-4 rounded-lg flex justify-between items-center">
          <p className="text-yellow-800 font-medium">
            {selectedJobs.length} job(s) selected
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkArchive("archived")}
              className="text-orange-600 hover:underline"
            >
              Archive
            </button>
            <button
              onClick={() => handleBulkArchive("active")}
              className="text-green-600 hover:underline"
            >
              Unarchive
            </button>
            <button
              onClick={handleBulkDelete}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Jobs List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {jobs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No jobs found
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, job)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`p-6 flex justify-between items-start ${
                    draggedJob?.id === job.id ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job.id)}
                      onChange={() => toggleSelectJob(job.id)}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        {job.title}
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            job.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {job.status}
                        </span>
                      </h3>
                      <p className="text-sm text-gray-500">{job.location}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {job.description.substring(0, 100)}...
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {job.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {getApplicationsForJob(job.id).length} applications
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1 text-sm">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/candidates?job=${job.id}`)
                      }
                      className="text-emerald-600 hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setEditingJob(job)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDuplicate(job)}
                      className="text-purple-600 hover:underline"
                    >
                      Duplicate
                    </button>
                    <button
                      onClick={() => handleArchive(job)}
                      className="text-orange-600 hover:underline"
                    >
                      {job.status === "active" ? "Archive" : "Unarchive"}
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setJobToDelete(job);
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-sm text-gray-700">
                  Showing {(currentPage - 1) * pageSize + 1}–
                  {Math.min(currentPage * pageSize, totalJobs)} of {totalJobs}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 border rounded ${
                        currentPage === i + 1
                          ? "bg-emerald-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {(showCreateModal || editingJob) && (
        <JobModal
          job={editingJob}
          onClose={() => {
            setShowCreateModal(false);
            setEditingJob(null);
          }}
          onSave={() => {
            fetchJobs();
            setShowCreateModal(false);
            setEditingJob(null);
          }}
        />
      )}
      {showDeleteModal && jobToDelete && (
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => handleDelete(jobToDelete.id)}
          jobTitle={jobToDelete.title}
        />
      )}
    </div>
  );
};

export default Jobs;

