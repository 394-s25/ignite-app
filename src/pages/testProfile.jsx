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
  const { profile, profileType, userSkills, updateProfile } = useProfile();

  // State for available options
  const [availableSkills, setAvailableSkills] = useState([]);
  const [availableDescriptors, setAvailableDescriptors] = useState({}); // Changed to flat object

  // State for edit mode
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    bio: "",
    major: "",
    skills: [],
    about: "",
    descriptors: [], // Changed to array since it's just a list of descriptor IDs
  });

  // Fetch available skills and descriptors from the database
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch skills (only for applicants)
        if (profileType === "applicant") {
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
        }

        // Fetch descriptors (only for companies)
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
      if (profileType === "applicant") {
        setEditData({
          name: profile.name || "",
          bio: profile.bio || "",
          major: profile.major || "",
          skills: profile.skills || [],
        });
      } else {
        setEditData({
          name: profile.name || "",
          about: profile.about || "",
          descriptors: profile.descriptors || [], // Changed to array
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

  if (authLoading) {
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
                {profileType === "applicant"
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
                {profileType === "applicant" ? (
                  // Applicant View
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
                    <p className="mt-2">About: {profile.about}</p>
                    <div className="mt-4">
                      <h3 className="font-semibold">Company Descriptors:</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(profile.descriptors || []).map((descriptorId) => (
                          <span
                            key={descriptorId}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {availableDescriptors[descriptorId] || descriptorId}
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

                {profileType === "applicant" ? (
                  // Applicant Edit Fields
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
                  </>
                ) : (
                  // Company Edit Fields
                  <>
                    <div>
                      <label className="block mb-2">About:</label>
                      <textarea
                        value={editData.about}
                        onChange={(e) =>
                          setEditData({ ...editData, about: e.target.value })
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
