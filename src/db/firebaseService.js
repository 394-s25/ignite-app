import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

const firebaseConfig = {
    databaseURL: "https://ignite-app-red-default-rtdb.firebaseio.com"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function writeUserData(name, email) {
    const userId = push(ref(db, 'users')).key;
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email
    })
    .then(() => {
        console.log("Data written successfully.");
    })
    .catch((error) => {
        console.error("Error writing data: ", error);
    });
}

export function writeCompanyData(name, introduction, matchedSkills) {
    const companyId = push(ref(db, 'companies')).key;
    set(ref(db, 'companies/' + companyId), {
        name: name,
        introduction: introduction,
        matchedSkills: matchedSkills
    })
    .then(() => {
        console.log("Data written successfully.");
    })
    .catch((error) => {
        console.error("Error writing data: ", error);
    });   
}