import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, query, orderByChild, equalTo } from "firebase/database";
import { update } from "firebase/database";
import SHA256 from "crypto-js/sha256";
// import { L } from "vitest/dist/chunks/reporters.d.CqBhtcTq";

const firebaseConfig = {
    databaseURL: "https://ignite-app-red-default-rtdb.firebaseio.com"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// initialize skills and preferences dictionaries
// sample skills and preferences, longer list will be made later
const skillsArr = ['JavaScript', 'Logo Design', 'Product Management'];
const preferencesArr = ['1-10 Employees', '10-50 Employees', 'Healthcare Sector'];


export async function initializeSkillsPrefs(skillsArray, prefsArray) {
    const skillsRef = ref(db, 'skills/');
    const prefsRef = ref(db, 'preferences/');   
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

export async function userFirstWrite(name, email, phoneNumber) {
    const hashedEmail = SHA256(email).toString();
    
    // initialize the first ID as 80000
    return get(ref(db, 'metadata/userCounter'))
        .then((snapshot) => {
            let userId = 80000; // default starting value
            
            // if already initialized, get the last one
            if (snapshot.exists()) {
                userId = snapshot.val();
            }
            
            // make sure to add the entry with the same key as userSecondWrite
            //return set(ref(db, 'users/' + hashedEmail), {  // hashed email is key
            return set(ref(db, 'users/' + userId), {  // user id is key
                username: name,
                email: email,
                phoneNumber: phoneNumber,
                userId: userId  // incremental ID calculated for each new user
            })

            .then(() => {
                // increment counter for next user
                return set(ref(db, 'metadata/userCounter'), userId + 1);
            })
            .then(() => {
                console.log("Data written successfully.");
                //return userId;
            });
        })
        .catch((error) => {
            console.error("Error writing data: ", error);
        });
}

export async function userSecondWrite(userid, major, bio, skills, preferences) {
    // make sure to add the entry with the same key as userFirstWrite
    const userRef = ref(db, 'users/' + userid)  // user id is key
    //const userRef = ref(db, 'users/' + hashedEmail);  // hashed email is key
    
    return update(userRef, {  // update the existing entry
        major: major,
        bio: bio
    })
    .then(() => {
        console.log("User second write successful.")
    })
    .catch((error) => {
        console.error(`Error writing data: ${error}`)
    })
}

export async function writeCompanyData(name, introduction, email, matchedSkills) {
    const hashedEmail = SHA256(email).toString();
    
    // initialize the first ID as 1000
    return get(ref(db, 'metadata/companyCounter'))
        .then((snapshot) => {
            let companyId = 1000; // default starting value
            
            // if already initialized, get the last one
            if (snapshot.exists()) {
                companyId = snapshot.val();
            }
            
            //return set(ref(db, 'companies/' + hashedEmail), {  // hashed email is key
            return set(ref(db, 'companies/' + companyId), {  // company id is key
                name: name,
                introduction: introduction,
                email: email,
                matchedSkills: matchedSkills,
                companyId: companyId  // incremental ID calculated for each new company
            })

            .then(() => {
                // increment counter for next company
                return set(ref(db, 'metadata/companyCounter'), companyId + 1);
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
    const userRef = ref(db, 'users/' + hashedEmail);
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
    })
}

export async function readUserDataByUserId(userId) {
    const userRef = ref(db, 'users/' + userId);
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
    })
}

export async function readCompanyDataByEmail(email) {
    const hashedEmail = SHA256(email).toString();
    const companyRef = ref(db, 'companies/' + hashedEmail);
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
    })
}

export async function readCompanyDataByCompanyId(companyId) {
    const companyRef = ref(db, 'companies/' + companyId);
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
    })
}