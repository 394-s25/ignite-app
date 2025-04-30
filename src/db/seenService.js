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

export const seenStudent = async (studentId, companyId, status) => {
  try {
    const companyRef = ref(db, `companies/${companyId}`);
    const companySnapshot = await get(companyRef);
    const companyData = companySnapshot.val() || {};
    const companySeen = companyData.seen || {};

    companySeen[studentId] = { status };
    await update(companyRef, {
      seen: companySeen,
    });

    console.log("Company seen field updated successfully", companySeen);
    return true;
  } catch (error) {
    console.error("Failed to add student to company's seen field", error);
    throw error;
  }
};
