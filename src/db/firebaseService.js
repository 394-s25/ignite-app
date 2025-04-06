import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, query, orderByChild, equalTo } from "firebase/database";

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

export function readUserDataByName(name) {
    const dbUsers = ref(db, 'users');
    const nameQuery = query(dbUsers, orderByChild('username'), equalTo(name));
    get(nameQuery)
    .then((snapshot) => {
        if (snapshot.exists()) {
            const usersFound = snapshot.val();
            for (const userId in usersFound) {
                const user = usersFound[userId];
                const email = user.email;
                console.log(`User email: ${email}`);
            }
        } else {
            console.log("User does not exist");
        }
    })
    .catch((error) => {
        console.error("Error reading data: ", error);
    })
}

export function readCompanyDataByName(name) {
    const dbCompanies = ref(db, 'companies');
    const nameQuery = query(dbCompanies, orderByChild('name'), equalTo(name));
    get(nameQuery)
    .then((snapshot) => {
        if (snapshot.exists()) {
            const companiesFound = snapshot.val();
            for (const companyId in companiesFound) {
                const company = companiesFound[companyId];
                const introduction = company.introduction;
                const skills = company.matchedSkills;
                console.log(`Company information: ${introduction}\nMatched skills: ${skills}`);
            }
        } else {
            console.log("Company does not exist");
        }
    })
    .catch((error) => {
        console.error("Error reading data: ", error);
    })
}