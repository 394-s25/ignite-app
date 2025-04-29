import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  query,
  orderByChild,
  equalTo,
  onValue,
  remove,
} from "firebase/database";
import { update } from "firebase/database";
import SHA256 from "crypto-js/sha256";
import { db } from "./firebaseConfig";
// import { L } from "vitest/dist/chunks/reporters.d.CqBhtcTq";

// helper for clearing any field
export function clearField(path) {
  const fieldRef = ref(db, path);
  remove(fieldRef)
    .then(() => {
      console.log("Field removed successfully");
    })
    .catch((error) => {
      console.error("Error removing field:", error);
    });
}

// initialize skills
export async function initializeSkills(skillsArray) {
  const skillsRef = ref(db, "skills/");

  skillsArray.forEach((skill) => {
    const newSkillRef = push(skillsRef);
    set(newSkillRef, skill)
      .then(() => {
        console.log(`${skill} written successfully.`);
      })
      .catch((error) => {
        console.error(`Could not write ${skill} to database: ${error}`);
      });
  });
}

// initialize skills
export async function initializeDescriptors(descriptorsArray) {
  const descriptorRef = ref(db, "descriptors/");

  descriptorsArray.forEach((desc) => {
    const newDescriptorRef = push(descriptorRef);
    set(newDescriptorRef, desc)
      .then(() => {
        console.log(`${desc} written successfully.`);
      })
      .catch((error) => {
        console.error(`Could not write ${desc} to database: ${error}`);
      });
  });
}

export async function getSkillById(skillId) {
  const skillRef = ref(db, `skills/${skillId}`);

  try {
    const snapshot = await get(skillRef);
    if (snapshot.exists()) {
      // console.log(snapshot.val()); // Returns the skill name (e.g., "Full-stack development")
      return snapshot.val();
    } else {
      console.log("No skill found with that ID");
      return null;
    }
  } catch (error) {
    console.error("Error fetching skill:", error);
    return null;
  }
}

export async function getDescriptorById(descriptorId) {
  const descriptorRef = ref(db, `descriptors/${descriptorId}`);

  try {
    const snapshot = await get(descriptorRef);
    if (snapshot.exists()) {
      // console.log(snapshot.val()); // Returns the skill name (e.g., "Full-stack development")
      return snapshot.val();
    } else {
      console.log("No descriptor found with that ID");
      return null;
    }
  } catch (error) {
    console.error("Error fetching skill:", error);
    return null;
  }
}

// see if user is company/user, then fetch their profile
const checkProfile = async (uid, name) => {
  try {
    const studentRef = ref(db, `users/${uid}`);
    const studentSnapshot = await get(studentRef);
    const companyRef = ref(db, `companies/${uid}`);
    const companySnapshot = await get(companyRef);

    if (studentSnapshot.exists()) {
      console.log(`accessed student profile for ${name} with id ${uid}`);
      return studentSnapshot.val();
    } else if (companySnapshot.exists()) {
      console.log(`accessed company profile for ${name} with id ${uid}`);
      return companySnapshot.val();
    } else {
      console.log("new user");
      return;
    }
  } catch (error) {
    console.error("Error getting profile", error);
    throw error;
  }
};

// create new profile given type (company/user)
const makeNewProfile = async (uid, name, email, type) => {
  console.log(type);
  try {
    if (type == "student") {
      const studentRef = ref(db, `users/${uid}`);
      const newStudent = {
        uid: uid,
        name: name || "Unknown Northwestern Student",
        email: email,
        bio: "",
        major: "",
        lookingFor: "",
        skills: [],
      };
      await set(studentRef, newStudent);
      console.log(`created new student profile for ${name} with id ${uid}`);
      return newStudent;
    } else if (type == "company") {
      const companyRef = ref(db, `companies/${uid}`);
      const newCompany = {
        uid: uid,
        name: `${name}'s Startup` || "Unknown Northwestern Startup",
        email: email,
        bio: "",
        descriptors: [],
        role: "New Role",
        roleDescription: `A new role has opened under ${name}`,
        skills: [],
      };
      await set(companyRef, newCompany);
      console.log(`created new company profile for ${name} with id ${uid}`);
      return newCompany;
    } else {
      throw new Error("Invalid type. Has to be either user or company.");
    }
  } catch (error) {
    console.error("Error creating new profile:", error);
    throw error;
  }
};

// consolidated get/create profile upon login, given type (company/user)
export const getProfile = async (uid, displayName, email, type = null) => {
  try {
    const existingProfile = await checkProfile(uid, displayName);
    if (existingProfile) {
      return existingProfile;
    }

    if (type === "student" || type === "company") {
      console.log("making new", type);
      return await makeNewProfile(uid, displayName, email, type);
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

export const updateStudentProfile = async (uid, profileData) => {
  try {
    const studentRef = ref(db, `users/${uid}`);
    const snapshot = await get(studentRef);

    if (!snapshot.exists()) {
      throw new Error("student profile not found");
    }

    const updatedProfile = {
      ...snapshot.val(),
      name: profileData.name || snapshot.val().name,
      bio: profileData.bio || snapshot.val().about,
      major: profileData.major || snapshot.val().major,
      skills: profileData.skills || [],
    };

    await set(studentRef, updatedProfile);
    console.log(`Updated student profile for ${updatedProfile.name}`);
    return updatedProfile;
  } catch (error) {
    console.error("Error updating student profile:", error);
    throw error;
  }
};

// Update company profile with validation
export const updateCompanyProfile = async (uid, profileData) => {
  try {
    const companyRef = ref(db, `companies/${uid}`);
    const snapshot = await get(companyRef);

    if (!snapshot.exists()) {
      throw new Error("Company profile not found");
    }

    const updatedProfile = {
      ...snapshot.val(),
      name: profileData.name || snapshot.val().name,
      bio: profileData.bio || snapshot.val().bio,
      descriptors: profileData.descriptors || [],
      skills: profileData.skills || [],
    };

    await set(companyRef, updatedProfile);
    console.log(`Updated company profile for ${updatedProfile.name}`);
    return updatedProfile;
  } catch (error) {
    console.error("Error updating company profile:", error);
    throw error;
  }
};

export const fetchAllCompanies = async () => {
  try {
    const companiesRef = ref(db, "companies");
    const snapshot = await get(companiesRef);

    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    }
  } catch (error) {
    console.error("Error fetching companies");
  }
};

export const fetchAllStudents = async () => {
  try {
    const studentsRef = ref(db, "users");
    const snapshot = await get(studentsRef);

    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    }
  } catch (error) {
    console.error("Error fetching students");
  }
};

export const fetchExperienceByUser = async (uid) => {
  try {
    const experienceRef = ref(db, "experience");
    const snapshot = await get(experienceRef);
    if (snapshot.exists()) {
      const allExperiences = snapshot.val();
      // Map to include the experience id
      const userExperiences = Object.entries(allExperiences)
        .filter(([_, exp]) => exp.userId === uid)
        .map(([id, exp]) => ({ ...exp, id }));
      console.log(userExperiences);
      return userExperiences;
    } else {
      console.log("No experiences found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching experience:", error);
    throw error;
  }
};

export async function addExperience({
  userId,
  company,
  startDate,
  endDate,
  jobTitle,
  jobDescription,
}) {
  try {
    const experiencesRef = ref(db, "experience");
    const newExpRef = push(experiencesRef);
    const experienceId = newExpRef.key;

    await set(newExpRef, {
      userId,
      startDate,
      endDate,
      jobTitle,
      jobDescription,
      company,
    });

    console.log(`Experience added with ID: ${experienceId}`);
    return experienceId;
  } catch (error) {
    console.error("Error adding experience:", error);
    throw error;
  }
}

export const deleteExperience = async (experienceId) => {
  try {
    const experienceRef = ref(db, `experience/${experienceId}`);
    await remove(experienceRef);
    console.log(`Experience with ID ${experienceId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting experience with ID ${experienceId}:`, error);
    throw error;
  }
};

// export async function getSkillIdByName(skillName) {
//   const skillsRef = ref(db, "skills/");
//   const skillQuery = query(
//     skillsRef,
//     orderByChild("skill"),
//     equalTo(skillName)
//   );
//   return get(skillQuery)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const skill = snapshot.val();
//         const skillId = Object.keys(skill)[0];
//         console.log(`Retrieved ID for skill ${skillName}: ${skillId}`);
//         return skillId;
//       } else {
//         console.log(`No ID found for skill ${skillName}.`);
//         return null;
//       }
//     })
//     .catch((error) => {
//       console.error(`Error in retrieving ID for skill ${skillName}: ${error}`);
//     });
// }

// // initialize prefs, given preftype
// export async function initializePrefs(prefArray, prefType) {
//   const prefsRef = ref(db, `preferences/${prefType}`);
//   prefArray.forEach((pref) => {
//     const newPrefRef = push(prefsRef);
//     set(newPrefRef, pref)
//       .then(() => {
//         console.log(`${pref} written successfully.`);
//       })
//       .catch((error) => {
//         console.error(`Could not write ${pref} to database: ${error}`);
//       });
//   });
// }

// export async function readCompanyDataByCompanyId(companyId) {
//   const companyRef = ref(db, "companies/" + companyId);
//   return get(companyRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const company = snapshot.val();
//         console.log("Retrieved company data: ", company);
//         return company;
//       } else {
//         console.log("Company does not exist");
//         return null;
//       }
//     })
//     .catch((error) => {
//       console.error("Error reading data: ", error);
//     });
// }

// // Company Post Jobs
// export async function postJob(
//   companyId,
//   jobTitle,
//   jobDescription,
//   jobSkills,
//   jobContacts
// ) {
//   const companyJobsRef = ref(db, `jobs`);
//   const newJobRef = push(companyJobsRef);
//   return set(newJobRef, {
//     companyId: companyId,
//     title: jobTitle,
//     description: jobDescription,
//     skills: jobSkills,
//     contacts: jobContacts,
//   })
//     .then(() => {
//       console.log("Job posted successfully.");
//     })
//     .catch((error) => {
//       console.error("Error posting job: ", error);
//     });
// }

// export async function getJobsByCompanyId(companyId) {
//   const jobsRef = ref(db, "jobs");
//   const jobsQuery = query(
//     jobsRef,
//     orderByChild("companyId"),
//     equalTo(companyId)
//   );
//   return get(jobsQuery)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const jobs = snapshot.val();
//         console.log("Retrieved jobs: ", jobs);
//         return jobs;
//       } else {
//         console.log("No jobs found for this company.");
//         return null;
//       }
//     })
//     .catch((error) => {
//       console.error("Error retrieving jobs: ", error);
//     });
// }

// export function listenToAllJobs(callback) {
//   const jobsRef = ref(db, "jobs");

//   onValue(
//     jobsRef,
//     (snapshot) => {
//       if (snapshot.exists()) {
//         const jobs = snapshot.val();
//         console.log("Retrieved all jobs: ", jobs);
//         const jobsList = Object.values(jobs);
//         callback(jobsList);
//       } else {
//         console.log("No jobs found.");
//         callback([]);
//       }
//     },
//     (error) => {
//       console.error("Error retrieving jobs: ", error);
//     }
//   );
// }

// export async function getPrefIdByName(prefName) {
//   const prefsRef = ref(db, "preferences/");
//   const prefQuery = query(prefsRef, orderByChild("pref"), equalTo(prefName));
//   return get(prefQuery)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const pref = snapshot.val();
//         const prefId = Object.keys(pref)[0];
//         console.log(`Retrieved ID for preference ${prefName}: ${prefId}`);
//         return prefId;
//       } else {
//         console.log(`No ID found for preference ${prefName}.`);
//         return null;
//       }
//     })
//     .catch((error) => {
//       console.error(
//         `Error in retrieving ID for preference ${prefName}: ${error}`
//       );
//     });
// }

// export async function getPrefNameById(prefType, prefId) {
//   const prefRef = ref(db, `preferences/${prefType}/${prefId}`);
//   return get(prefRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log();
//         return snapshot.val();
//       } else {
//         console.log(`No prefence ${prefType} found for ID ${prefId}.`);
//         return null;
//       }
//     })
//     .catch((error) => {
//       console.error(
//         `Error in retrieving preference ${prefType} for ID ${prefId}: ${error}`
//       );
//     });
// }

// export async function userFirstWrite(name, email, phoneNumber, userId) {
//   try {
//     const userRef = ref(db, "users/" + userId);
//     await set(userRef, {
//       username: name,
//       email: email,
//       phoneNumber: phoneNumber || "",
//       userId: userId,
//     });
//   } catch (error) {
//     console.error("Error writing data: ", error);
//   }
// }

// export async function userSecondWrite(userId, major, bio, skills) {
//   const userRef = ref(db, "users/" + userId);

//   return update(userRef, {
//     major: major,
//     bio: bio,
//     skills: skills,
//   })
//     .then(() => {
//       console.log("User second write successful.");
//     })
//     .catch((error) => {
//       console.error(`Error writing data: ${error}`);
//     });
// }

// export async function writeUserData(
//   name,
//   email,
//   phoneNumber,
//   major,
//   bio,
//   lookingFor,
//   skills,
//   preferences
// ) {
//   const hashedEmail = SHA256(email).toString();

//   return get(ref(db, "metadata/userCounter"))
//     .then((snapshot) => {
//       let userId = 80000;

//       if (snapshot.exists()) {
//         userId = snapshot.val();
//       }

//       return set(ref(db, "users/" + userId), {
//         username: name,
//         email: email,
//         phoneNumber: phoneNumber,
//         major: major,
//         bio: bio,
//         skills: skills,
//         preferences: preferences,
//         lookingFor: lookingFor,
//         userId: userId,
//       })
//         .then(() => {
//           return set(ref(db, "metadata/userCounter"), userId + 1);
//         })
//         .then(() => {
//           console.log("Data written successfully.");
//         });
//     })
//     .catch((error) => {
//       console.error("Error writing data: ", error);
//     });
// }

// export async function writeCompanyData(
//   name,
//   introduction,
//   email,
//   matchedSkills
// ) {
//   const hashedEmail = SHA256(email).toString();

//   // initialize the first ID as 1000
//   return get(ref(db, "metadata/companyCounter"))
//     .then((snapshot) => {
//       let companyId = 1000; // default starting value

//       // if already initialized, get the last one
//       if (snapshot.exists()) {
//         companyId = snapshot.val();
//       }

//       //return set(ref(db, 'companies/' + hashedEmail), {  // hashed email is key
//       return set(ref(db, "companies/" + companyId), {
//         // company id is key
//         name: name,
//         introduction: introduction,
//         email: email,
//         matchedSkills: matchedSkills,
//         companyId: companyId, // incremental ID calculated for each new company
//       })
//         .then(() => {
//           // increment counter for next company
//           return set(ref(db, "metadata/companyCounter"), companyId + 1);
//         })
//         .then(() => {
//           console.log("Data written successfully.");
//           //return companyId;
//         });
//     })
//     .catch((error) => {
//       console.error("Error writing data: ", error);
//     });
// }

// export async function readUserDataByEmail(email) {
//   const hashedEmail = SHA256(email).toString();
//   const userRef = ref(db, "users/" + hashedEmail);
//   return get(userRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const user = snapshot.val();
//         console.log("Retrieved user data: ", user);
//         return user;
//       } else {
//         console.log("User does not exist");
//         return null;
//       }
//     })
//     .catch((error) => {
//       console.error("Error reading data: ", error);
//     });
// }

// export async function readUserDataByUserId(userId) {
//   const userRef = ref(db, "users/" + userId);
//   return get(userRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const user = snapshot.val();
//         console.log("Retrieved user data: ", user);
//         return user;
//       } else {
//         console.log("User does not exist");
//         return null;
//       }
//     })
//     .catch((error) => {
//       console.error("Error reading data: ", error);
//     });
// }

// export async function readCompanyDataByEmail(email) {
//   const hashedEmail = SHA256(email).toString();
//   const companyRef = ref(db, "companies/" + hashedEmail);
//   return get(companyRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const company = snapshot.val();
//         console.log("Retrieved company data: ", company);
//         return company;
//       } else {
//         console.log("Company does not exist");
//         return null;
//       }
//     })
//     .catch((error) => {
//       console.error("Error reading data: ", error);
//     });
// }

// export async function getDescriptorNameById(descriptorType, descriptorId) {
//   const descriptorRef = ref(
//     db,
//     `descriptors/${descriptorType}/${descriptorId}`
//   );
//   return get(descriptorRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         return snapshot.val();
//       } else {
//         console.log(
//           `No descriptor ${descriptorType} found for ID ${descriptorId}.`
//         );
//         return null;
//       }
//     })
//     .catch((error) => {
//       console.error(
//         `Error in retrieving descriptor ${descriptorType} for ID ${descriptorId}: ${error}`
//       );
//     });
// }
