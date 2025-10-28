import { http, HttpResponse } from "msw";
import { getAllJobs, createJob, updateJob, reorderJob, deleteJob, jobsDb, } from "../db/jobsDb";
import { delay } from "../../utils/latency";
// ✅ Handlers for all /api/jobs endpoints
export const jobsHandlers = [
    // GET all jobs (with filters & pagination)
    http.get("/api/jobs", async ({ request }) => {
        await delay();
        const url = new URL(request.url);
        const search = url.searchParams.get("search") || "";
        const status = url.searchParams.get("status") || "";
        const jobType = url.searchParams.get("jobType") || "";
        const page = parseInt(url.searchParams.get("page") || "1");
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
        const result = await getAllJobs({
            search,
            status,
            jobType,
            page,
            pageSize,
        });
        return HttpResponse.json(result);
    }),
    // POST create new job
    http.post("/api/jobs", async ({ request }) => {
        await delay();
        const jobData = (await request.json());
        const newJob = await createJob(jobData);
        return HttpResponse.json(newJob, { status: 201 });
    }),
    // PATCH update a specific job
    http.patch("/api/jobs/:id", async ({ params, request }) => {
        await delay();
        const updates = (await request.json());
        const updatedJob = await updateJob(params.id, updates);
        return HttpResponse.json(updatedJob);
    }),
    // PATCH reorder job
    http.patch("/api/jobs/:id/reorder", async ({ params, request }) => {
        await delay();
        const reorderData = (await request.json());
        const updatedJob = await reorderJob(params.id, reorderData);
        return HttpResponse.json(updatedJob);
    }),
    // GET a specific job by ID
    http.get("/api/jobs/:id", async ({ params }) => {
        await delay();
        const job = await jobsDb.jobs.get(params.id);
        if (!job) {
            return new HttpResponse(null, { status: 404 });
        }
        return HttpResponse.json(job);
    }),
    // DELETE a job
    http.delete("/api/jobs/:id", async ({ params }) => {
        await delay();
        await deleteJob(params.id);
        return new HttpResponse(null, { status: 204 });
    }),
];
