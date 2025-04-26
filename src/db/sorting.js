import { getDatabase, ref, get, set, update } from "firebase/database";
import { app } from "./firebaseConfig";

const db = getDatabase(app);

export async function getStudentSkills(studentId) {
  try {
    const skillsSnapshot = await get(ref(db, `users/${studentId}/skills`));
    if (skillsSnapshot.exists()) {
      return skillsSnapshot.val();
    } else {
      console.log("no student skills found");
      return [];
    }
  } catch (error) {
    console.error("error fetching student skill:", error);
    return null;
  }
}

export async function getJobSkills(jobId) {
  const skillsSnapshot = await get(ref(db, `jobs/${jobId}/skills`));
  const jobSkills = skillsSnapshot.exists() ? skillsSnapshot.val() : [];
  return jobSkills;
}

async function getUnseenJobs(studentId) {
  const seenSnapshot = await get(ref(db, `seen/${studentId}`));
  const seenIds = seenSnapshot.exists() ? Object.keys(seenSnapshot.val()) : []; // Changed to Object.keys()

  const jobsSnapshot = await get(ref(db, "jobs/"));
  if (!jobsSnapshot.exists()) {
    return [];
  }

  let unseenJobs = [];
  jobsSnapshot.forEach((child) => {
    if (!seenIds.includes(child.key)) {
      unseenJobs.push({
        id: child.key,
        ...child.val(),
      });
    }
  });

  return unseenJobs;
}

async function calculateMatch(studentId, jobId) {
  // Made this async
  const studentSkills = await getStudentSkills(studentId); // Added await
  const jobSkills = await getJobSkills(jobId); // Added await

  if (!studentSkills || !jobSkills || jobSkills.length === 0) {
    // Added length check
    return 0;
  }

  const matchingSkills = studentSkills.filter((skill) =>
    jobSkills.includes(skill)
  );

  const irrelevantSkills = studentSkills.filter(
    (skill) => !jobSkills.includes(skill) // Simplified this check
  );

  // Avoid division by zero and use length property (not length())
  return irrelevantSkills.length > 0
    ? matchingSkills.length / irrelevantSkills.length
    : matchingSkills.length;
}

export async function getSortedJobs(studentId) {
  // Made this async
  const allJobs = await getUnseenJobs(studentId); // Added await

  // Need to use Promise.all for async operations in loop
  const jobsWithScores = await Promise.all(
    allJobs.map(async (job) => {
      const matchScore = await calculateMatch(studentId, job.id);
      return {
        id: job.id, // Fixed variable name (was companyId)
        matchScore,
        ...job, // Changed from companyData to job
      };
    })
  );

  return jobsWithScores.sort((a, b) => b.matchScore - a.matchScore);
}
