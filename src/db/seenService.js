import { db } from "./firebaseConfig";
import { ref, get, update } from "firebase/database";

// For when a student has seen a company
export const seenCompany = async (studentId, companyId) => {
  try {
    const studentRef = ref(db, `users/${studentId}`);

    const studentSnapshot = await get(studentRef);
    const studentData = studentSnapshot.val() || {};
    const studentSeen = studentData.seen || [];

    if (!studentSeen.includes(companyId)) {
      studentSeen.push(companyId);
      await update(studentRef, {
        seen: studentSeen,
      });
    }

    return true;
  } catch (error) {
    console.error("Failed to add company to student's seen field", error);
    throw error;
  }
};

// For when a company has seen a student
export const seenStudent = async (studentId, companyId) => {
  try {
    const companyRef = ref(db, `companies/${companyId}`);
    2;
    const companySnapshot = await get(companyRef);
    const companyData = companySnapshot.val() || {};
    const companySeen = companyData.seen || [];

    if (!companySeen.includes(studentId)) {
      companySeen.push(studentId);
      await update(companyRef, {
        seen: companySeen,
      });
    }

    return true;
  } catch (error) {
    console.error("Failed to add student to company's seen field", error);
    throw error;
  }
};
