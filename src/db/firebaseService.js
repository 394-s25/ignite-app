import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, query, orderByChild, equalTo } from "firebase/database";
import SHA256 from "crypto-js/sha256";

const firebaseConfig = {
    databaseURL: "https://ignite-app-red-default-rtdb.firebaseio.com"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function writeUserData(name, email) {
    const hashedEmail = SHA256(email).toString();
    return set(ref(db, 'users/' + hashedEmail), {
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

export async function writeCompanyData(name, introduction, email, matchedSkills) {
    const hashedEmail = SHA256(email).toString();
    return set(ref(db, 'companies/' + hashedEmail), {
        name: name,
        introduction: introduction,
        email: email,
        matchedSkills: matchedSkills
    })
    .then(() => {
        console.log("Data written successfully.");
    })
    .catch((error) => {
        console.error("Error writing data: ", error);
    });   
}

export function readUserDataByEmail(email) {
    const hashedEmail = SHA256(email).toString();
    const userRef = ref(db, 'users/' + hashedEmail);
    get(userRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            const user = snapshot.val();
            console.log(`User information: ${user.username}\nEmail: ${user.email}`);
        } else {
            console.log("User does not exist");
        }
    })
    .catch((error) => {
        console.error("Error reading data: ", error);
    })
}

export function readCompanyDataByEmail(email) {
    const hashedEmail = SHA256(email).toString();
    const companyRef = ref(db, 'companies/' + hashedEmail);
    get(companyRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            const company = snapshot.val();
            console.log(`Company information: ${company.name}\nIntroduction: ${company.introduction}\nEmail: ${company.email}\nMatched Skills: ${company.matchedSkills}`);
        } else {
            console.log("Company does not exist");
        }
    })
    .catch((error) => {
        console.error("Error reading data: ", error);
    })
}