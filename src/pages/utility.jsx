// testing page for front end to see functionality of backend
import { auth } from "../db/firebaseAuth";
import { readUserDataByUserId, getSkillById } from "../db/firebaseService";
import { getStudentSkills } from "../utility/sorting";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

// -OOYVAxO-PXgIrcafUzx; // react
// -OOYVAxP4cer63tyrcAq; // user research
// -OOYVAxO-PXgIrcafV-5; // uiux design

const UtilityPage = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [currentSkill, setCurrentSkill] = useState(null);

  const fetchData = async () => {
    if (user?.uid) {
      const data = await readUserDataByUserId(user.uid);
      setUserData(data);
    }
  };

  const checkStudentSkills = async () => {
    if (!userData?.skills) return; // Exit if no skills exist
    try {
      const skills = [];
      for (const id of userData.skills) {
        const skillData = await getSkillById(id);
        skills.push(skillData); // Collect all skills first
      }
      setUserSkills(skills); // Update state once at the end
    } catch (error) {
      console.error("Error in checkStudentSkills:", error);
    }
  };

  // Fetch user data on mount
  useEffect(() => {
    fetchData();
  }, [user?.uid]);

  // Load skills when userData changes
  useEffect(() => {
    if (userData) {
      checkStudentSkills();
    }
  }, [userData]); // Runs when userData updates

  if (!userData) {
    return <div>Loading profile...</div>;
  }

  const checkSkill = async (e) => {
    e.preventDefault();
    const skill = await getSkillById(skillInput);
    setCurrentSkill(skill);
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className="m-20">
        <div className="space-y-4">
          <h1>name: {userData.username}</h1>
          <p>uid: {userData.userId}</p>
          <p>major: {userData.major}</p>
          <p>bio: {userData.bio}</p>
          <p>skills: {userSkills.map((skill) => skill).join(", ")}</p>
          <p>email: {userData.email}</p>
          <div>
            <h3>Preferences</h3>
            <ul>
              <li>
                <strong>Culture:</strong>{" "}
                {userData.preferences.culture || "Not specified"}
              </li>
              <li>
                <strong>Industry:</strong>{" "}
                {userData.preferences.industry || "Not specified"}
              </li>
              <li>
                <strong>Opportunities:</strong>{" "}
                {userData.preferences.opportunities || "Not specified"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityPage;
