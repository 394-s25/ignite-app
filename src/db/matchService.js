import { db } from "./firebaseConfig";
import { ref, get, update } from "firebase/database";

// For when a student likes a company
// export const likeCompany = async (studentId, companyId) => {
//   try {
//     const companyRef = ref(db, `companies/${companyId}`);

//     const companySnapshot = await get(companyRef);
//     const companyData = companySnapshot.val() || {};
//     const likes = companyData.likes || [];

//     if (!likes.includes(studentId)) {
//       likes.push(studentId);

//       await update(ref(db, `companies/${companyId}`), {
//         likes: likes,
//       });
//     }

//     return checkForMatch(studentId, companyId);
//   } catch (error) {
//     console.error("Liking company failed", error);
//     throw error;
//   }
// };

// For when a student likes a company. Adds the id of the student who liked the company to the company's likes field.
export const likeCompany = async (studentId, companyId) => {
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
    console.error("Liking company failed", error);
    throw error;
  }
};

// For when a company likes a student. Adds the id of the company who liked the student to the student's likes field.
export const likeStudent = async (studentId, companyId) => {
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
    console.error("Liking student failed", error);
    throw error;
  }
};

// Used specifically to remove like fields from both student and company upon matching
export const matchAndUnlike = async (studentId, companyId) => {
  try {
    const studentRef = ref(db, `users/${studentId}`);
    const companyRef = ref(db, `companies/${companyId}`);

    const studentSnapshot = await get(studentRef);
    const companySnapshot = await get(companyRef);

    if (!companySnapshot.exists() || !studentSnapshot.exists()) {
      return false;
    }

    const companyData = companySnapshot.val() || {};
    const studentData = studentSnapshot.val() || {};

    const companyLikes = companyData.likes || [];
    const studentLikes = studentData.likes || [];

    const updatedCompanyLikes = companyLikes.filter((id) => id !== studentId);
    const updatedStudentLikes = studentLikes.filter((id) => id !== companyId);

    await update(ref(db, `companies/${companyId}`), {
      likes: updatedCompanyLikes,
    });

    await update(ref(db, `users/${studentId}`), {
      likes: updatedStudentLikes,
    });

    return true;
  } catch (error) {
    console.error("Failed to match and unlike student and company:", error);
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

    // Remove each other from likes field
    matchAndUnlike(studentId, companyId);

    return true;
  } catch (error) {
    console.error("Create match failed", error);
    throw error;
  }
};

// Fetches student's matches
export const fetchStudentMatches = async (studentId) => {
  try {
    const studentRef = ref(db, `users/${studentId}`);

    const studentSnapshot = await get(studentRef);
    const studentData = studentSnapshot.val() || {};
    const studentMatches = studentData.matches || [];

    const matchesWithCompanyDetails = await Promise.all(
      studentMatches.map(async (companyId) => {
        const companyRef = ref(db, `companies/${companyId}`);
        const companySnapshot = await get(companyRef);
        const companyData = companySnapshot.val() || {};

        return {
          companyId: companyId,
          ...companyData,
        };
      })
    );
    return matchesWithCompanyDetails;
  } catch (error) {
    console.error("Fetching student matches failed:", error);
    throw error;
  }
};

// Fetches company's matches
export const fetchCompanyMatches = async (companyId) => {
  try {
    const companyRef = ref(db, `companies/${companyId}`);

    const companySnapshot = await get(companyRef);
    const companyData = companySnapshot.val() || {};
    const companyMatches = companyData.matches || [];

    const matchesWithStudentDetails = await Promise.all(
      companyMatches.map(async (studentId) => {
        const studentRef = ref(db, `users/${studentId}`);
        const studentSnapshot = await get(studentRef);
        const studentData = studentSnapshot.val() || {};
        console.log(studentData);

        return {
          studentId: studentId,
          ...studentData,
        };
      })
    );
    return matchesWithStudentDetails;
  } catch (error) {
    console.error("Fetching company matches failed:", error);
    throw error;
  }
};
