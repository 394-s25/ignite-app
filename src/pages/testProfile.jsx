import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { useProfile } from "../contexts/profileContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ref, get } from "firebase/database";
import { db } from "../db/firebaseConfig";

const TestProfile = () => {
  const navigate = useNavigate();
  const { authUser, login, logout, isLoading: authLoading } = useAuth();
  const { profile, profileType, userSkills, userPrefs, updateProfile } =
    useProfile();

  // State for available options
  const [availableSkills, setAvailableSkills] = useState([]);
  const [availablePrefs, setAvailablePrefs] = useState({
    culture: [],
    opportunities: [],
    industry: [],
  });

  // State for edit mode
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    bio: "",
    major: "",
    skills: [],
    preferences: {
      culture: [],
      opportunities: [],
      industry: [],
    },
    about: "",
    description: {
      culture: [],
      opportunities: [],
      industry: [],
    },
  });

  // Fetch available skills and preferences from the database
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch skills
        const skillsSnapshot = await get(ref(db, "skills"));
        if (skillsSnapshot.exists()) {
          const skillsData = skillsSnapshot.val();
          const formattedSkills = Object.entries(skillsData).map(
            ([id, name]) => ({
              id,
              name,
            })
          );
          setAvailableSkills(formattedSkills);
        }

        // Fetch preferences for each category
        const prefCategories = ["culture", "opportunities", "industry"];
        const prefsData = {};

        for (const category of prefCategories) {
          const prefSnapshot = await get(ref(db, `preferences/${category}`));
          if (prefSnapshot.exists()) {
            prefsData[category] = Object.entries(prefSnapshot.val()).map(
              ([id, name]) => ({
                id,
                name,
              })
            );
          }
        }

        setAvailablePrefs(prefsData);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  // Initialize edit data when profile changes
  useEffect(() => {
    if (profile) {
      setEditData({
        name: profile.name || "",
        bio: profile.bio || "",
        major: profile.major || "",
        skills: profile.skills || [],
        preferences: profile.preferences || {
          culture: [],
          opportunities: [],
          industry: [],
        },
        about: profile.about || "",
        description: profile.description || {
          culture: [],
          opportunities: [],
          industry: [],
        },
      });
    }
  }, [profile]);

  // Handle skill selection
  const handleSkillToggle = (skillId) => {
    setEditData((prev) => {
      const skills = prev.skills.includes(skillId)
        ? prev.skills.filter((id) => id !== skillId)
        : [...prev.skills, skillId];
      return { ...prev, skills };
    });
  };

  // Handle preference selection
  const handlePrefToggle = (category, prefId) => {
    setEditData((prev) => {
      const categoryPrefs = prev.preferences[category] || [];
      const updatedPrefs = categoryPrefs.includes(prefId)
        ? categoryPrefs.filter((id) => id !== prefId)
        : [...categoryPrefs, prefId];

      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          [category]: updatedPrefs,
        },
      };
    });
  };

  // Handle description selection for companies
  const handleDescriptionToggle = (category, prefId) => {
    setEditData((prev) => {
      const categoryDescs = prev.description[category] || [];
      const updatedDescs = categoryDescs.includes(prefId)
        ? categoryDescs.filter((id) => id !== prefId)
        : [...categoryDescs, prefId];

      return {
        ...prev,
        description: {
          ...prev.description,
          [category]: updatedDescs,
        },
      };
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

  if (authLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <NavBar />

      {/* Profile Information */}
      {authUser && (
        <section className="mb-8 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          {profile ? (
            <div>
              <p>Profile Type: {profileType}</p>
              <p>Name: {profile.name}</p>

              {/* Display Profile Information */}
              {profileType === "applicant" ? (
                <>
                  <p>Major: {profile.major}</p>
                  <p>Bio: {profile.bio}</p>
                  <div className="mt-2">
                    <h3 className="font-semibold">Skills:</h3>
                    <div className="flex flex-wrap gap-2">
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
                  <div className="mt-2">
                    <h3 className="font-semibold">Preferences:</h3>
                    {Object.entries(userPrefs).map(([category, values]) => (
                      <div key={category} className="mt-2">
                        <h4 className="text-sm font-medium capitalize">
                          {category}:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {values.map((pref, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {pref}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p>About: {profile.about}</p>
                  <div className="mt-2">
                    <h3 className="font-semibold">Company Description:</h3>
                    {Object.entries(profile.description || {}).map(
                      ([category, values]) => (
                        <div key={category} className="mt-2">
                          <h4 className="text-sm font-medium capitalize">
                            {category}:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {values.map((descId, index) => {
                              const desc = availablePrefs[category]?.find(
                                (p) => p.id === descId
                              )?.name;
                              return (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                                >
                                  {desc}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {/* Edit Profile Form */}
              <div className="mt-4">
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {editMode ? "Cancel Edit" : "Edit Profile"}
                </button>

                {editMode && (
                  <form
                    onSubmit={handleUpdateProfile}
                    className="mt-4 space-y-4"
                  >
                    {/* Common Fields */}
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

                    {/* Applicant-specific fields */}
                    {profileType === "applicant" ? (
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
                              setEditData({
                                ...editData,
                                major: e.target.value,
                              })
                            }
                            className="border p-2 w-full rounded"
                          />
                        </div>

                        {/* Skills Selection */}
                        <div>
                          <label className="block mb-2">Skills:</label>
                          <div className="flex flex-wrap gap-2">
                            {availableSkills.map((skill) => (
                              <button
                                key={skill.id}
                                type="button"
                                onClick={() => handleSkillToggle(skill.id)}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  editData.skills.includes(skill.id)
                                    ? "bg-purple-600 text-white"
                                    : "bg-purple-100 text-purple-800"
                                }`}
                              >
                                {skill.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Preferences Selection */}
                        <div>
                          <label className="block mb-2">Preferences:</label>
                          {Object.entries(availablePrefs).map(
                            ([category, prefs]) => (
                              <div key={category} className="mt-2">
                                <h4 className="text-sm font-medium capitalize">
                                  {category}:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {prefs.map((pref) => (
                                    <button
                                      key={pref.id}
                                      type="button"
                                      onClick={() =>
                                        handlePrefToggle(category, pref.id)
                                      }
                                      className={`px-3 py-1 rounded-full text-sm ${
                                        editData.preferences[
                                          category
                                        ]?.includes(pref.id)
                                          ? "bg-blue-600 text-white"
                                          : "bg-blue-100 text-blue-800"
                                      }`}
                                    >
                                      {pref.name}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Company-specific fields */}
                        <div>
                          <label className="block mb-2">About:</label>
                          <textarea
                            value={editData.about}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                about: e.target.value,
                              })
                            }
                            className="border p-2 w-full rounded"
                            rows={4}
                          />
                        </div>

                        {/* Company Description Selection */}
                        <div>
                          <label className="block mb-2">
                            Company Description:
                          </label>
                          {Object.entries(availablePrefs).map(
                            ([category, prefs]) => (
                              <div key={category} className="mt-2">
                                <h4 className="text-sm font-medium capitalize">
                                  {category}:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {prefs.map((pref) => (
                                    <button
                                      key={pref.id}
                                      type="button"
                                      onClick={() =>
                                        handleDescriptionToggle(
                                          category,
                                          pref.id
                                        )
                                      }
                                      className={`px-3 py-1 rounded-full text-sm ${
                                        editData.description[
                                          category
                                        ]?.includes(pref.id)
                                          ? "bg-green-600 text-white"
                                          : "bg-green-100 text-green-800"
                                      }`}
                                    >
                                      {pref.name}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )
                          )}
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
            </div>
          ) : (
            <p>No profile data available</p>
          )}
        </section>
      )}
    </div>
  );
};

export default TestProfile;
