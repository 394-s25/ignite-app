import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { useProfile } from "../contexts/profileContext";
import ExperienceInput from "../components/userProfile/ExperienceInput";
import NavBar from "../components/NavBar";
import { ref, get } from "firebase/database";
import { db } from "../db/firebaseConfig";
import { deleteExperience } from "../db/firebaseService";

const TestProfile = () => {
  const { isLoading } = useAuth();
  const { profile, profileType, userSkills, userDescriptors, updateProfile, userExperience } =
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
    experiences: [],
    // company
    role: "",
    roleDescription: "",
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
          email: profile.email || "",
          lookingFor: profile.lookingFor || "",
          experiences: userExperience || []
        });
      } else {
        setEditData({
          name: profile.name || "",
          bio: profile.bio || "",
          descriptors: profile.descriptors || [],
          role: profile.role || "",
          roleDescription: profile.roleDescription || "",
          skills: profile.skills || [],
        });
      }
    }
  }, [profile, profileType, userExperience]);


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
                    <p className="mt-2">Email: {profile.email}</p>
                    <p className="mt-2">Major: {profile.major}</p>
                    <p className="mt-2">Looking For: {profile.lookingFor}</p>
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
                    <h3 className="font-semibold">Experiences:</h3>
                    {userExperience && userExperience.length > 0 && (
                        <div className="space-y-4 mt-4">
                          {userExperience.map((exp, idx) => (
                            <div
                              key={idx}
                              className="border rounded-lg p-4 shadow-sm bg-gray-50"
                            >
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                                <span className="font-bold text-lg text-purple-800">{exp.company}</span>
                                <span className="text-sm text-gray-500">
                                  {exp.startDate} - {exp.endDate}
                                </span>
                              </div>
                              <div className="font-semibold text-purple-700 mb-1">{exp.jobTitle || exp.role}</div>
                              <div className="text-gray-700 text-sm">{exp.jobDescription || exp.details}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                ) : (
                  // Company View
                  <>
                    <p className="mt-2">Bio: {profile.bio}</p>
                    <p className="mt-2">Email: {profile.email}</p>
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
                    <div className="mt-10">
                      <h2 className="text-xl font-semibold">
                        Open Role: {profile.role}
                      </h2>
                      <p className="mt-2">
                        Role Description: {profile.roleDescription}
                      </p>
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
                    <div>
                      <label className="block mb-2">Experiences:</label>
                      {/* List existing experiences */}
                      {editData.experiences && editData.experiences.length > 0 && (
                        <ul className="mb-2">
                          {editData.experiences.map((exp, idx) => (
                            <li key={idx} className="mb-2 border-b pb-2">
                              <div>
                                <strong>{exp.company}</strong> — {exp.role} ({exp.startDate} - {exp.endDate})
                                <button
                                  type="button"
                                  className="ml-2 text-red-500"
                                  onClick={async() => {
                                    if (exp.id) {
                                      await deleteExperience(exp.id);
                                      setEditData((prev) => ({
                                        ...prev,
                                        experiences: prev.experiences.filter(
                                          (e) => e.id !== exp.id
                                        ),
                                      }));
                                    }
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                              <div className="text-sm">{exp.details}</div>
                            </li>
                          ))}
                        </ul>
                      )}
                      {/* Add new experience form */}
                      <ExperienceInput
                        onAdd={(exp) =>
                          setEditData((prev) => ({
                            ...prev,
                            experiences: [...(prev.experiences || []), exp],
                          }))
                        }
                      />
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
