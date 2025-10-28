import Dexie from "dexie";
export class TalentFlowDB extends Dexie {
    jobs;
    candidates;
    constructor() {
        super("talentflowDB");
        this.version(1).stores({
            jobs: "++id, title, status, order",
            candidates: "++id, name, email, jobId, stage",
        });
    }
}
export const db = new TalentFlowDB();
