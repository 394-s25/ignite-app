import { db } from "./firebaseConfig";
import { ref, get, update } from "firebase/database";

// For when a student likes a company
export const likeCompany = async (studentId, companyId) => {
  try {
    const studentRef = ref(db, `users/${studentId}`);

    const studentSnapshot = await get(studentRef);
    const studentData = studentSnapshot.val() || {};
    const likes = studentData.likes || [];

    if (!likes.includes(companyId)) {
      likes.push(companyId);

      await update(ref(db, `users/${studentId}`), {
        likes: likes,
      });
    }

    return checkForMatch(studentId, companyId);
  } catch (error) {
    console.error("Error liking company", error);
    throw error;
  }
};

// For when a company likes a student
export const likeStudent = async (studentId, companyId) => {
  try {
    const companyRef = ref(db, `companies/${companyId}`);

    const companySnapshot = await get(companyRef);
    const companyData = companySnapshot.val() || {};
    const likes = companyData.likes || [];

    if (!likes.includes(studentId)) {
      likes.push(studentId);

      await update(ref(db, `companies/${companyId}`), {
        likes: likes,
      });
    }

    return checkForMatch(studentId, companyId);
  } catch (error) {
    console.error("Liking student failed", error);
    throw error;
  }
};

// Check if student and company liked each other
export const checkForMatch = async (studentId, companyId) => {
  try {
    const companyRef = ref(db, `companies/${companyId}`);
    const studentRef = ref(db, `users/${studentId}`);

    const companySnapshot = await get(companyRef);
    const studentSnapshot = await get(studentRef);

    if (!companySnapshot.exists() || !studentSnapshot.exists()) {
      return false;
    }

    const companyData = companySnapshot.val();
    const studentData = studentSnapshot.val();

    const companyLikedStudent =
      companyData.likes && companyData.likes.includes(studentId);

    const studentLikedCompany =
      studentData.likes && studentData.likes.includes(companyId);

    if (companyLikedStudent && studentLikedCompany) {
      return createMatch(studentId, companyId);
    }

    return false;
  } catch (error) {
    console.error("Matching failed", error);
    throw error;
  }
};

export const createMatch = async (studentId, companyId) => {
  try {
    const studentRef = ref(db, `users/${studentId}`);
    const companyRef = ref(db, `companies/${companyId}`);

    // Add company to student's matches
    const studentSnapshot = await get(studentRef);
    const studentData = studentSnapshot.val() || {};
    const studentMatches = studentData.matches || [];

    if (!studentMatches.includes(companyId)) {
      studentMatches.push(companyId);
      await update(studentRef, {
        matches: studentMatches,
      });
    }

    // Add student to company's matches
    const companySnapshot = await get(companyRef);
    const companyData = companySnapshot.val() || {};
    const companyMatches = companyData.matches || [];

    if (!companyMatches.includes(studentId)) {
      companyMatches.push(studentId);
      await update(companyRef, {
        matches: companyMatches,
      });
    }

    return true;
  } catch (error) {
    console.error("Create match failed", error);
    throw error;
  }
};
