import { faker } from "@faker-js/faker";
import { db, type Job, type Candidate } from "./db";

const generateSlug = (title: string) =>
  title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export async function seedDatabase() {
  const jobCount = await db.jobs.count();
  if (jobCount > 0) {
    console.log("Database already seeded.");
    return;
  }

  console.log("Seeding database...");

  const jobsToSeed: Job[] = [];
  for (let i = 0; i < 25; i++) {
    const title = faker.person.jobTitle();
    jobsToSeed.push({
      title,
      slug: generateSlug(title),
      status: faker.helpers.arrayElement(["active", "archived"]),
      tags: faker.helpers.arrayElements(
        ["Full-time", "Remote", "Contract"],
        { min: 1, max: 2 }
      ),
      order: i,
    });
  }

  const candidatesToSeed: Candidate[] = [];
  const stages: Candidate["stage"][] = [
    "applied",
    "screen",
    "tech",
    "offer",
    "hired",
    "rejected",
  ];

  for (let i = 0; i < 1000; i++) {
    candidatesToSeed.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      jobId: faker.number.int({ min: 1, max: 25 }),
      stage: faker.helpers.arrayElement(stages),
    });
  }

  await db.jobs.bulkAdd(jobsToSeed);
  await db.candidates.bulkAdd(candidatesToSeed);

  console.log("Database seeded successfully!");
}
