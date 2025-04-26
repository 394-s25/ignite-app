import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useUser } from "../contexts/UserContext";

const TestProfile = () => {
  const { user, userSkills, userPrefs, isLoading } = useUser();
  // const [jobs, setJobs] = useState([]);

  if (isLoading || !user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="m-20 space-y-8">
        <div className="space-y-4">
          <h1>Name: {user.name}</h1>
          <p>UID: {user.uid || user.userId}</p>
          <p>Major: {user.major}</p>
          <p>Bio: {user.bio}</p>
          <p>Skills: {userSkills.map((skill) => skill + ", ")}</p>
          <p>Email: {user.email}</p>

          {Object.entries(userPrefs).map(([prefType, prefNames]) => (
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
