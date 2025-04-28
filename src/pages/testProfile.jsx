import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { useProfile } from "../contexts/profileContext";
import NavBar from "../components/NavBar";
import { ref, get } from "firebase/database";
import { db } from "../db/firebaseConfig";

const TestProfile = () => {
  const { isLoading } = useAuth();
  const { profile, profileType, userSkills, userDescriptors, updateProfile } =
    useProfile();

  // State for available options
  const [availableSkills, setAvailableSkills] = useState([]);
  const [availableDescriptors, setAvailableDescriptors] = useState({});

  // State for edit mode
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    // student
    lookingFor: "",
    major: "",
    // company
    role: "",
    roleDesciption: "",
    descriptors: [],
    // both
    name: "",
    bio: "",
    contact: "",
    skills: [],
  });

  // fetch all skills + descriptors
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const skillsSnapshot = await get(ref(db, "skills"));
        if (skillsSnapshot.exists()) {
          setAvailableSkills(skillsSnapshot.val());
        }

        // fetch descriptors (only for companies)
        if (profileType === "company") {
          const descriptorsSnapshot = await get(ref(db, "descriptors"));
          if (descriptorsSnapshot.exists()) {
            setAvailableDescriptors(descriptorsSnapshot.val());
          }
        }
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    if (profileType) {
      fetchOptions();
    }
  }, [profileType]);

  // Initialize edit data when profile changes
  useEffect(() => {
    if (profile) {
      if (profileType === "student") {
        setEditData({
          name: profile.name || "",
          bio: profile.bio || "",
          major: profile.major || "",
          skills: profile.skills || [],
        });
      } else {
        setEditData({
          name: profile.name || "",
          bio: profile.bio || "",
          descriptors: profile.descriptors || [],
          skills: profile.skills || [], // Add skills for company
        });
      }
    }
  }, [profile, profileType]);

  // Handle skill selection
  const handleSkillToggle = (skillId) => {
    setEditData((prev) => {
      const skills = prev.skills.includes(skillId)
        ? prev.skills.filter((id) => id !== skillId)
        : [...prev.skills, skillId];
      return { ...prev, skills };
    });
  };

  // Handle descriptor selection for companies
  const handleDescriptorToggle = (descriptorId) => {
    setEditData((prev) => {
      const descriptors = prev.descriptors.includes(descriptorId)
        ? prev.descriptors.filter((id) => id !== descriptorId)
        : [...prev.descriptors, descriptorId];
      return { ...prev, descriptors };
    });
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(editData);
      setEditMode(false);
    } catch (error) {
      console.error("Profile update failed:", error);
      alert(error.message);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      {profile && (
        <section className="p-8">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {profileType === "student"
                  ? "Student Profile"
                  : "Company Profile"}
              </h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                {editMode ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {!editMode ? (
              // View Mode
              <>
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                {profileType === "student" ? (
                  <>
                    <p className="mt-2">Bio: {profile.bio}</p>
                    <p className="mt-2">Major: {profile.major}</p>
                    <div className="mt-4">
                      <h3 className="font-semibold">Skills:</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {userSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  // Company View
                  <>
                    <p className="mt-2">Bio: {profile.bio}</p>
                    <div className="mt-4">
                      <h3 className="font-semibold">Company Descriptors:</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {userDescriptors.map((descriptor, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {descriptor}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-semibold">Required Skills:</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {userSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              // Edit Mode
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block mb-2">Name:</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  />
                </div>

                {profileType === "student" ? (
                  <>
                    <div>
                      <label className="block mb-2">Bio:</label>
                      <textarea
                        value={editData.bio}
                        onChange={(e) =>
                          setEditData({ ...editData, bio: e.target.value })
                        }
                        className="border p-2 w-full rounded"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Major:</label>
                      <input
                        type="text"
                        value={editData.major}
                        onChange={(e) =>
                          setEditData({ ...editData, major: e.target.value })
                        }
                        className="border p-2 w-full rounded"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Skills:</label>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(availableSkills).map(([id, name]) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => handleSkillToggle(id)}
                            className={`px-3 py-1 rounded-full text-sm ${
                              editData.skills.includes(id)
                                ? "bg-purple-600 text-white"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  // Company Edit Fields
                  <>
                    <div>
                      <label className="block mb-2">Bio:</label>
                      <textarea
                        value={editData.bio}
                        onChange={(e) =>
                          setEditData({ ...editData, bio: e.target.value })
                        }
                        className="border p-2 w-full rounded"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Company Descriptors:</label>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(availableDescriptors).map(
                          ([id, name]) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() => handleDescriptorToggle(id)}
                              className={`px-3 py-1 rounded-full text-sm ${
                                editData.descriptors.includes(id)
                                  ? "bg-green-600 text-white"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {name}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2">Required Skills:</label>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(availableSkills).map(([id, name]) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => handleSkillToggle(id)}
                            className={`px-3 py-1 rounded-full text-sm ${
                              editData.skills.includes(id)
                                ? "bg-purple-600 text-white"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </form>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default TestProfile;
