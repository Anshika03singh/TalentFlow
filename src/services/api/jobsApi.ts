// src/services/api/jobsApi.ts
export async function fetchJobs({
  search = "",
  status = "",
  page = 1,
  pageSize = 10,
}: {
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}) {
  const params = new URLSearchParams({ search, status, page: String(page), pageSize: String(pageSize) });
  const response = await fetch(`/api/jobs?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return response.json();
}
