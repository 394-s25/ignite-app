import { db } from "./firebaseConfig.js";
import { ref, get, child } from "firebase/database";

// Gets students that the company has been matched with
export const getCompanyMatches = async (companyId) => {
  try {
    const companyRef = ref(db, `companies/${companyId}`);
    const companySnapshot = await get(companyRef);

    if (!companySnapshot.exists()) {
      throw new Error("Company not found");
    }

    const companyData = companySnapshot.val();

    if (!companyData.matches) {
      return [];
    }

    const matchesArray = Array.isArray(companyData.matches)
      ? companyData.matches.filter((id) => id !== null)
      : Object.keys(companyData.matches);

    if (matchesArray.length === 0) {
      return [];
    }

    const matchesWithDetails = await Promise.all(
      matchesArray.map(async (studentId) => {
        const studentRef = ref(db, `users/${studentId}`);
        const studentSnapshot = await get(studentRef);

        if (!studentSnapshot.exists()) {
          return null; // Skip if student doesn't exist
        }

        const studentData = studentSnapshot.val();

        return {
          studentId: studentId,
          studentName: studentData.username,
          studentEmail: studentData.email,
          studentPhoneNumber: studentData.phoneNumber,
        };
      })
    );

    return matchesWithDetails.filter((match) => match !== null);
  } catch (error) {
    console.error("Get company matches failed", error);
    throw error;
  }
};

// Gets companies that the student has been matched with
export const getStudentMatches = async (studentId) => {
  try {
    const studentRef = ref(db, `users/${studentId}`);
    const studentSnapshot = await get(studentRef);

    if (!studentSnapshot.exists()) {
      throw new Error("Student not found");
    }

    const studentData = studentSnapshot.val();

    if (!studentData.matches) {
      return [];
    }

    const matchesArray = Array.isArray(studentData.matches)
      ? studentData.matches.filter((id) => id !== null)
      : Object.keys(studentData.matches);

    if (matchesArray.length === 0) {
      return [];
    }

    const matchesWithDetails = await Promise.all(
      matchesArray.map(async (companyId) => {
        const companyRef = ref(db, `companies/${companyId}`);
        const companySnapshot = await get(companyRef);

        if (!companySnapshot.exists()) {
          return null; // Skip if company doesn't exist
        }

        const companyData = companySnapshot.val();

        return {
          companyId: companyId,
          companyName: companyData.companyName,
        };
      })
    );

    return matchesWithDetails.filter((match) => match !== null);
  } catch (error) {
    console.error("Get student matches failed", error);
    throw error;
  }
};
