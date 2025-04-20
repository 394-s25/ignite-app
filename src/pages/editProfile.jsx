import UserProfile from "../components/userProfile/UserProfile";
import { auth } from "../db/firebaseAuth";
import { readUserDataByUserId } from "../db/firebaseService";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const EditProfile = () => {
    const { user } = useUser();
    const [ userData, setUserData ] = useState(null);
    useEffect(
        () => {
            const fetchData = async() => {
                if (user?.uid) {
                    const data = await readUserDataByUserId(user.uid)
                    setUserData(data)
                }
            }
            fetchData();
        }, [user?.uid]
    )
    // Waiting for async function to finish
    if (!userData) {
        return <div>Loading profile...</div>;
    }
    console.log(userData)
    return (
        <div>
            <NavBar></NavBar>
            <UserProfile 
                key={userData.uid}
                studentName={userData.username}
                studentMajor={userData.studentMajor}
                studentBio={userData.studentBio}
                lookingFor={userData.lookingFor}
                studentSkills={userData.studentSkills}
                contactInfo={userData.email}
            />
        </div>
    );
}

export default EditProfile;
