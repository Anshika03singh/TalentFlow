import Dexie, { type Table } from "dexie";

export interface Job {
  id?: number;
  title: string;
  slug: string;
  status: "active" | "archived";
  tags: string[];
  order: number;
}

export interface Candidate {
  id?: number;
  name: string;
  email: string;
  jobId: number;
  stage: "applied" | "screen" | "tech" | "offer" | "hired" | "rejected";
}

export class TalentFlowDB extends Dexie {
  jobs!: Table<Job, number>;
  candidates!: Table<Candidate, number>;

  constructor() {
    super("talentflowDB");
    this.version(1).stores({
      jobs: "++id, title, status, order",
      candidates: "++id, name, email, jobId, stage",
    });
  }
}

export const db = new TalentFlowDB();
