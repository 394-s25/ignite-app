import { getDatabase, ref, get } from "firebase/database";
import { db } from "./firebaseConfig";
import { fetchAllCompanies, fetchAllStudents } from "./firebaseService";

// calculate score between two profiles
function calculateMatchScore(userSkills, targetSkills) {
  if (!userSkills?.length || !targetSkills?.length) return 0;

  // how many overlaps in skills
  let matchingSkills = 0;
  for (const skill of targetSkills) {
    if (userSkills.has(skill)) {
      matchingSkills++;
    }
  }
  // score is ratio of matched skills to target skills
  // if you have 5 skills and matched 3/3 to a target, you get 100 score essentially
  return matchingSkills / targetSkills.size;
}

// get sorted companies for students
export async function getCompaniesobs(studentId) {
  try {
    const studentRef = ref(db, `users/${studentId}`);
    const studentSnapshot = await get(studentRef);
    if (!studentSnapshot.exists()) {
      throw new Error("Student not found");
    }
    const studentSkills = studentSnapshot.val().skills || [];
    const allCompanies = await fetchAllCompanies();

    const companies = Object.entries(allCompanies).map(([id, company]) => ({
      id,
      ...company,
      matchScore: calculateMatchScore(studentSkills, company.skills || []),
    }));

    return companies.sort((a, b) => b.matchScore - a.matchScore);
  } catch (error) {
    console.error("Error getting sorted jobs:", error);
    return [];
  }
}

// get sorted students for companies
export async function getSortedStudents(companyId) {
  try {
    const companyRef = ref(db, `companies/${companyId}`);
    const companySnapshot = await get(companyRef);
    if (!companySnapshot.exists()) {
      throw new Error("Company not found");
    }
    const companySkills = companySnapshot.val().skills || [];

    const allStudents = await fetchAllStudents;
    const students = Object.entries(allStudents).map(([id, student]) => ({
      id,
      ...student,
      matchScore: calculateMatchScore(companySkills, student.skills || []),
    }));

    return students.sort((a, b) => b.matchScore - a.matchScore);
  } catch (error) {
    console.error("Error getting sorted students:", error);
    return [];
  }
}
