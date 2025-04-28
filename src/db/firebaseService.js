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
} from "firebase/database";
import { update } from "firebase/database";
import SHA256 from "crypto-js/sha256";
import { app } from "./firebaseConfig";
// import { L } from "vitest/dist/chunks/reporters.d.CqBhtcTq";

// Initialize Firebase
const db = getDatabase(app);

// initialize skills and preferences dictionaries
// sample skills and preferences, longer list will be made later
const skillsArr = ["JavaScript", "Logo Design", "Product Management"];
const preferencesArr = [
  "1-10 Employees",
  "10-50 Employees",
  "Healthcare Sector",
];

export async function initializeSkillsPrefs(skillsArray, prefsArray) {
  const skillsRef = ref(db, "skills/");
  const prefsRef = ref(db, "preferences/");
  skillsArray.forEach((skill) => {
    const newSkillRef = push(skillsRef);
    set(newSkillRef, { skill: skill })
      .then(() => {
        console.log(`${skill} written successfully.`);
      })
      .catch((error) => {
        console.error(`Could not write ${skill} to database: ${error}`);
      });
  });

  prefsArray.forEach((pref) => {
    const newPrefRef = push(prefsRef);
    set(newPrefRef, { pref: pref })
      .then(() => {
        console.log(`${pref} written successfully.`);
      })
      .catch((error) => {
        console.error(`Could not write ${pref} to database: ${error}`);
      });
  });
}

export async function getSkillIdByName(skillName) {
  const skillsRef = ref(db, "skills/");
  const skillQuery = query(
    skillsRef,
    orderByChild("skill"),
    equalTo(skillName)
  );
  return get(skillQuery)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const skill = snapshot.val();
        const skillId = Object.keys(skill)[0];
        console.log(`Retrieved ID for skill ${skillName}: ${skillId}`);
        return skillId;
      } else {
        console.log(`No ID found for skill ${skillName}.`);
        return null;
      }
    })
    .catch((error) => {
      console.error(`Error in retrieving ID for skill ${skillName}: ${error}`);
    });
}

export async function getSkillNameById(skillId) {
  const skillRef = ref(db, `skills/${skillId}`);
  return get(skillRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const skillRet = snapshot.val();
        const skillName = skillRet.skill;
        console.log(`Retrieved skill for ID ${skillId}: ${skillName}`);
        return skillName;
      } else {
        console.log(`No skill found for ID ${skillId}.`);
        return null;
      }
    })
    .catch((error) => {
      console.error(`Error in retrieving skill for ID ${skillId}: ${error}`);
    });
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

export async function getPrefNameById(prefId) {
  const prefRef = ref(db, `preferences/${prefId}`);
  return get(prefRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const prefRet = snapshot.val();
        const prefName = prefRet.pref;
        console.log(`Retrieved preference for ID ${prefId}: ${prefName}`);
        return prefName;
      } else {
        console.log(`No prefence found for ID ${prefId}.`);
        return null;
      }
    })
    .catch((error) => {
      console.error(
        `Error in retrieving preference for ID ${prefId}: ${error}`
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

export function listenToStudents(callback) {
  const usersRef = ref(db, "users");

  onValue(
    usersRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        console.log("Retrieved all students: ", users);

        const studentsList = Object.keys(users).map((userId) => ({
          studentId: userId,
          ...users[userId],
        }));

        callback(studentsList);
      } else {
        console.log("No students found.");
        callback([]);
      }
    },
    (error) => {
      console.error("Error retrieving students: ", error);
    }
  );
}

export function listenToCompanies(callback) {
  const companiesRef = ref(db, "companies");

  onValue(
    companiesRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const companies = snapshot.val();
        console.log("Retrieved all companies: ", companies);

        const companiesList = Object.keys(companies).map((companyId) => ({
          companyId: companyId,
          ...companies[companyId],
        }));

        callback(companiesList);
      } else {
        console.log("No companies found.");
        callback([]);
      }
    },
    (error) => {
      console.error("Error retrieving companies: ", error);
    }
  );
}
