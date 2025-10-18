import { useEffect, useState } from "react";
import { fetchJobs } from "../../services/api/jobsApi";



interface Job {
  id: string;
  title: string;
  slug: string;
  status: string;
  tags: string[];
}

export default function JobExplore() {
  const [jobs, setJobs] = useState<Job[]>([]);
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
      } catch (err) {
        console.error(err);
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [search, status]);

  return (
    <section className="px-8 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Explore Open Positions
      </h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-64 dark:bg-gray-800 dark:text-gray-100"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {loading && <p className="text-gray-500">Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {job.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{job.status}</p>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 dark:bg-gray-700 text-sm px-2 py-1 rounded-md text-gray-700 dark:text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
