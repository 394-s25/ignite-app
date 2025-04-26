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

// initialize prefs, given preftype
export async function initializePrefs(prefArray, prefType) {
  const prefsRef = ref(db, `preferences/${prefType}`);
  prefArray.forEach((pref) => {
    const newPrefRef = push(prefsRef);
    set(newPrefRef, pref)
      .then(() => {
        console.log(`${pref} written successfully.`);
      })
      .catch((error) => {
        console.error(`Could not write ${pref} to database: ${error}`);
      });
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

export async function getPrefIdByName(prefName) {
  const prefsRef = ref(db, "preferences/");
  const prefQuery = query(prefsRef, orderByChild("pref"), equalTo(prefName));
  return get(prefQuery)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const pref = snapshot.val();
        const prefId = Object.keys(pref)[0];
        console.log(`Retrieved ID for preference ${prefName}: ${prefId}`);
        return prefId;
      } else {
        console.log(`No ID found for preference ${prefName}.`);
        return null;
      }
    })
    .catch((error) => {
      console.error(
        `Error in retrieving ID for preference ${prefName}: ${error}`
      );
    });
}

export async function getPrefNameById(prefType, prefId) {
  const prefRef = ref(db, `preferences/${prefType}/${prefId}`);
  return get(prefRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log();
        return snapshot.val();
      } else {
        console.log(`No prefence ${prefType} found for ID ${prefId}.`);
        return null;
      }
    })
    .catch((error) => {
      console.error(
        `Error in retrieving preference ${prefType} for ID ${prefId}: ${error}`
      );
    });
}

export async function userFirstWrite(name, email, phoneNumber, userId) {
  try {
    const userRef = ref(db, "users/" + userId);
    await set(userRef, {
      username: name,
      email: email,
      phoneNumber: phoneNumber || "",
      userId: userId,
    });
  } catch (error) {
    console.error("Error writing data: ", error);
  }
}

export async function userSecondWrite(userId, major, bio, skills, preferences) {
  // make sure to add the entry with the same key as userFirstWrite
  const userRef = ref(db, "users/" + userId); // user id is key

  return update(userRef, {
    // update the existing entry
    major: major,
    bio: bio,
    skills: skills, // this is assuming that skills will be inputted into this function in index and not string format
    preferences: preferences, // same w prefs ^^
  })
    .then(() => {
      console.log("User second write successful.");
    })
    .catch((error) => {
      console.error(`Error writing data: ${error}`);
    });
}

export async function writeUserData(
  name,
  email,
  phoneNumber,
  major,
  bio,
  lookingFor,
  skills,
  preferences
) {
  const hashedEmail = SHA256(email).toString();

  return get(ref(db, "metadata/userCounter"))
    .then((snapshot) => {
      let userId = 80000;

      if (snapshot.exists()) {
        userId = snapshot.val();
      }

      return set(ref(db, "users/" + userId), {
        username: name,
        email: email,
        phoneNumber: phoneNumber,
        major: major,
        bio: bio,
        skills: skills,
        preferences: preferences,
        lookingFor: lookingFor,
        userId: userId,
      })
        .then(() => {
          return set(ref(db, "metadata/userCounter"), userId + 1);
        })
        .then(() => {
          console.log("Data written successfully.");
        });
    })
    .catch((error) => {
      console.error("Error writing data: ", error);
    });
}

export async function writeCompanyData(
  name,
  introduction,
  email,
  matchedSkills
) {
  const hashedEmail = SHA256(email).toString();

  // initialize the first ID as 1000
  return get(ref(db, "metadata/companyCounter"))
    .then((snapshot) => {
      let companyId = 1000; // default starting value

      // if already initialized, get the last one
      if (snapshot.exists()) {
        companyId = snapshot.val();
      }

      //return set(ref(db, 'companies/' + hashedEmail), {  // hashed email is key
      return set(ref(db, "companies/" + companyId), {
        // company id is key
        name: name,
        introduction: introduction,
        email: email,
        matchedSkills: matchedSkills,
        companyId: companyId, // incremental ID calculated for each new company
      })
        .then(() => {
          // increment counter for next company
          return set(ref(db, "metadata/companyCounter"), companyId + 1);
        })
        .then(() => {
          console.log("Data written successfully.");
          //return companyId;
        });
    })
    .catch((error) => {
      console.error("Error writing data: ", error);
    });
}

export async function readUserDataByEmail(email) {
  const hashedEmail = SHA256(email).toString();
  const userRef = ref(db, "users/" + hashedEmail);
  return get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const user = snapshot.val();
        console.log("Retrieved user data: ", user);
        return user;
      } else {
        console.log("User does not exist");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error reading data: ", error);
    });
}

export async function readUserDataByUserId(userId) {
  const userRef = ref(db, "users/" + userId);
  return get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const user = snapshot.val();
        console.log("Retrieved user data: ", user);
        return user;
      } else {
        console.log("User does not exist");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error reading data: ", error);
    });
}

export async function readCompanyDataByEmail(email) {
  const hashedEmail = SHA256(email).toString();
  const companyRef = ref(db, "companies/" + hashedEmail);
  return get(companyRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const company = snapshot.val();
        console.log("Retrieved company data: ", company);
        return company;
      } else {
        console.log("Company does not exist");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error reading data: ", error);
    });
}

export async function readCompanyDataByCompanyId(companyId) {
  const companyRef = ref(db, "companies/" + companyId);
  return get(companyRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const company = snapshot.val();
        console.log("Retrieved company data: ", company);
        return company;
      } else {
        console.log("Company does not exist");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error reading data: ", error);
    });
}

// Company Post Jobs
export async function postJob(
  companyId,
  jobTitle,
  jobDescription,
  jobSkills,
  jobContacts
) {
  const companyJobsRef = ref(db, `jobs`);
  const newJobRef = push(companyJobsRef);
  return set(newJobRef, {
    companyId: companyId,
    title: jobTitle,
    description: jobDescription,
    skills: jobSkills,
    contacts: jobContacts,
  })
    .then(() => {
      console.log("Job posted successfully.");
    })
    .catch((error) => {
      console.error("Error posting job: ", error);
    });
}

export async function getJobsByCompanyId(companyId) {
  const jobsRef = ref(db, "jobs");
  const jobsQuery = query(
    jobsRef,
    orderByChild("companyId"),
    equalTo(companyId)
  );
  return get(jobsQuery)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const jobs = snapshot.val();
        console.log("Retrieved jobs: ", jobs);
        return jobs;
      } else {
        console.log("No jobs found for this company.");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error retrieving jobs: ", error);
    });
}

export function listenToAllJobs(callback) {
  const jobsRef = ref(db, "jobs");

  onValue(
    jobsRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const jobs = snapshot.val();
        console.log("Retrieved all jobs: ", jobs);
        const jobsList = Object.values(jobs);
        callback(jobsList);
      } else {
        console.log("No jobs found.");
        callback([]);
      }
    },
    (error) => {
      console.error("Error retrieving jobs: ", error);
    }
  );
}
