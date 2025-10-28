// src/mirage/server.ts
import { createServer, Model, Factory, Response } from "miragejs";
import { faker } from "@faker-js/faker";
// ---------- Mirage Server ----------
export function makeServer({ environment = "development" } = {}) {
    const server = createServer({
        environment,
        models: {
            job: Model.extend({}),
            candidate: Model.extend({}),
            assessment: Model.extend({}),
        },
        // ---------- Factories ----------
        factories: {
            job: Factory.extend({
                title() {
                    return faker.person.jobTitle();
                },
                slug(i) {
                    return `job-${i}`;
                },
                status() {
                    return faker.helpers.arrayElement(["active", "archived"]);
                },
                tags() {
                    return faker.helpers.arrayElements(["Engineering", "Marketing", "Sales", "Design", "HR"], 2);
                },
                order(i) {
                    return i;
                },
            }),
            candidate: Factory.extend({
                name() {
                    return faker.person.fullName();
                },
                email() {
                    return faker.internet.email();
                },
                stage() {
                    return faker.helpers.arrayElement([
                        "applied",
                        "screen",
                        "tech",
                        "offer",
                        "hired",
                        "rejected",
                    ]);
                },
                jobId() {
                    return faker.number.int({ min: 1, max: 25 });
                },
            }),
            assessment: Factory.extend({
                jobId(i) {
                    return i + 1;
                },
                title() {
                    return faker.company.catchPhrase();
                },
                questions() {
                    return Array.from({ length: 10 }, () => ({
                        id: faker.string.uuid(),
                        text: faker.lorem.sentence(),
                        type: faker.helpers.arrayElement([
                            "single",
                            "multi",
                            "short",
                            "long",
                            "numeric",
                            "file",
                        ]),
                        required: faker.datatype.boolean(),
                    }));
                },
            }),
        },
        // ---------- Seeds ----------
        seeds(server) {
            server.createList("job", 25);
            server.createList("candidate", 1000);
            server.createList("assessment", 3);
        },
        // ---------- Routes ----------
        routes() {
            this.namespace = "api";
            const simulateDelay = async () => new Promise((r) => setTimeout(r, faker.number.int({ min: 200, max: 1200 })));
            // --- JOB ROUTES ---
            this.get("/jobs", async (schema, request) => {
                await simulateDelay();
                let jobs = schema.all("job").models;
                const { search = "", status = "", page = 1, pageSize = 10 } = request.queryParams;
                if (search) {
                    jobs = jobs.filter((j) => j.title.toLowerCase().includes(search.toLowerCase()));
                }
                if (status) {
                    jobs = jobs.filter((j) => j.status === status);
                }
                const start = (page - 1) * pageSize;
                const paginated = jobs.slice(start, start + Number(pageSize));
                return {
                    data: paginated,
                    total: jobs.length,
                    page: Number(page),
                    pageSize: Number(pageSize),
                };
            });
            this.post("/jobs", async (schema, request) => {
                await simulateDelay();
                if (Math.random() < 0.1)
                    return new Response(500, {}, { error: "Random error" });
                const attrs = JSON.parse(request.requestBody);
                return schema.create("job", attrs);
            });
            this.patch("/jobs/:id", async (schema, request) => {
                await simulateDelay();
                const id = request.params.id;
                const attrs = JSON.parse(request.requestBody);
                return schema.find("job", id)?.update(attrs);
            });
            this.patch("/jobs/:id/reorder", async (schema, request) => {
                await simulateDelay();
                if (Math.random() < 0.1)
                    return new Response(500, {}, { error: "Reorder failed" });
                const { fromOrder, toOrder } = JSON.parse(request.requestBody);
                const jobs = schema.all("job").models;
                const job = jobs.find((j) => j.order === fromOrder);
                if (job)
                    job.update({ order: toOrder });
                return { success: true };
            });
            // --- CANDIDATE ROUTES ---
            this.get("/candidates", async (schema, request) => {
                await simulateDelay();
                let candidates = schema.all("candidate").models;
                const { search = "", stage = "", page = 1, pageSize = 20 } = request.queryParams;
                if (search) {
                    candidates = candidates.filter((c) => [c.name, c.email].some((val) => val.toLowerCase().includes(search.toLowerCase())));
                }
                if (stage) {
                    candidates = candidates.filter((c) => c.stage === stage);
                }
                const start = (page - 1) * pageSize;
                const paginated = candidates.slice(start, start + Number(pageSize));
                return {
                    data: paginated,
                    total: candidates.length,
                    page: Number(page),
                    pageSize: Number(pageSize),
                };
            });
            this.patch("/candidates/:id", async (schema, request) => {
                await simulateDelay();
                const id = request.params.id;
                const attrs = JSON.parse(request.requestBody);
                return schema.find("candidate", id)?.update(attrs);
            });
            this.get("/candidates/:id/timeline", async (_schema, request) => {
                await simulateDelay();
                const id = request.params.id;
                return {
                    id,
                    timeline: [
                        { date: faker.date.past(), event: "Applied" },
                        { date: faker.date.past(), event: "Screening" },
                        { date: faker.date.past(), event: "Tech Round" },
                    ],
                };
            });
            // --- ASSESSMENT ROUTES ---
            this.get("/assessments/:jobId", async (schema, request) => {
                await simulateDelay();
                const jobId = Number(request.params.jobId);
                return schema.findBy("assessment", { jobId });
            });
            this.put("/assessments/:jobId", async (schema, request) => {
                await simulateDelay();
                const jobId = Number(request.params.jobId);
                const attrs = JSON.parse(request.requestBody);
                const existing = schema.findBy("assessment", { jobId });
                if (existing) {
                    existing.update(attrs);
                    return existing;
                }
                return schema.create("assessment", { jobId, ...attrs });
            });
            this.post("/assessments/:jobId/submit", async (_schema, request) => {
                await simulateDelay();
                const data = JSON.parse(request.requestBody);
                localStorage.setItem(`assessment-response-${data.jobId}-${data.candidateId}`, JSON.stringify(data.responses));
                return { success: true };
            });
        },
    });
    return server;
}
