import UserProfile from "../components/userProfile/UserProfile";
import { auth } from "../db/firebaseAuth";
import { readUserDataByUserId, getSkillById } from "../db/firebaseService";
import { getStudentSkills } from "../utility/sorting";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const EditProfile = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [currentSkill, setCurrentSkill] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.uid) {
        const data = await readUserDataByUserId(user.uid);
        setUserData(data);
      }
    };
    fetchData();
  }, [user?.uid]);
  // Waiting for async function to finish
  if (!userData) {
    return <div>Loading profile...</div>;
  }
  console.log(userData);

  const checkSkill = async (e) => {
    e.preventDefault();
    const skill = await getSkillById(skillInput);
    setCurrentSkill(skill);
  };

  const checkStudentSkills = async (uid) => {
    try {
      const skillIds = await getStudentSkills(uid);
      for (const id of skillIds) {
        const skillData = await getSkillById(id); // Assume skillData is an object
        await setUserSkills((prevSkills) => [...prevSkills, skillData]); // Append the object
      }
    } catch (error) {
      console.error("Error in checkStudentSkills:", error);
      throw error;
    }
  };

  console.log(userSkills);

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
};

export default EditProfile;
