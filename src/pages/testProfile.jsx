// testing page for front end to see functionality of backend
import {
  readUserDataByUserId,
  getSkillById,
  getPrefNameById,
} from "../db/firebaseService";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const TestProfile = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [userPrefs, setUserPrefs] = useState({});

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

  const checkStudentPrefs = async () => {
    if (!userData?.preferences) return;
    try {
      const prefs = {};

      for (const [prefType, prefIds] of Object.entries(userData.preferences)) {
        if (!Array.isArray(prefIds)) continue;

        prefs[prefType] = [];
        for (const prefId of prefIds) {
          const name = await getPrefNameById(prefType, prefId);
          prefs[prefType].push(name);
        }
      }

      setUserPrefs(prefs);
    } catch (error) {
      console.error("Error loading preferences:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.uid]);

  useEffect(() => {
    if (userData) {
      checkStudentSkills();
      checkStudentPrefs();
    }
  }, [userData]);

  if (!userData) {
    return <div>Loading profile...</div>;
  }

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
          {userPrefs &&
            Object.entries(userPrefs).map(([prefType, prefNames]) => (
              <div key={prefType}>
                <h4>{prefType}:</h4>
                <ul>
                  {prefNames.map((name, i) => (
                    <li key={`${prefType}-${i}`}>{name}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TestProfile;
