import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { useProfile } from "../contexts/profileContext";
import ExperienceInput from "../components/userProfile/ExperienceInput";
import NavBar from "../components/NavBar";
import { ref, get } from "firebase/database";
import { db } from "../db/firebaseConfig";
import { deleteExperience } from "../db/firebaseService";
import {
  Building,
  Briefcase,
  Code,
  Mail,
  PencilLine,
  Video,
  GraduationCap,
  UserCircle,
  BookOpen,
  Search,
  TagIcon,
  Save,
  X,
  Plus,
  Calendar,
  Trash2,
} from "lucide-react";

const TestProfile = () => {
  const { isLoading } = useAuth();
  const {
    profile,
    profileType,
    userSkills,
    userDescriptors,
    updateProfile,
    userExperience,
  } = useProfile();

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
    email: "",
    skills: [],
    link: "",
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
          link: profile.link || "",
          experiences: userExperience || [],
        });
      } else {
        setEditData({
          name: profile.name || "",
          bio: profile.bio || "",
          descriptors: profile.descriptors || [],
          role: profile.role || "",
          roleDescription: profile.roleDescription || "",
          skills: profile.skills || [],
          email: profile.email || "",
          link: profile.link || "",
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
      console.log("edit data", editData);
      await updateProfile(editData);
      setEditMode(false);
    } catch (error) {
      console.error("Profile update failed:", error);
      alert(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-violet-700 font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      {profile && (
        <section className="max-w-5xl mx-auto py-8 px-4">
          <div className="bg-white rounded-xl shadow-xs overflow-hidden mb-6">
            {/* Header */}
            <div className="bg-violet-50 px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-violet-100">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="h-16 w-16 bg-violet-100 rounded-full flex items-center justify-center">
                  {profileType === "student" ? (
                    <UserCircle className="w-8 h-8 text-violet-700" />
                  ) : (
                    <Building className="w-8 h-8 text-violet-700" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profile.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    {profileType === "student" ? (
                      <>
                        <GraduationCap className="w-4 h-4 text-violet-600" />
                        <span className="text-sm text-gray-600">
                          {profile.major}
                        </span>
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-4 h-4 text-violet-600" />
                        <span className="text-sm text-gray-600">
                          {profile.role}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium ${
                  editMode
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-violet-600 text-white hover:bg-violet-700"
                } transition-colors`}
              >
                {editMode ? (
                  <>
                    <X className="w-4 h-4" /> Cancel Edit
                  </>
                ) : (
                  <>
                    <PencilLine className="w-4 h-4" /> Edit Profile
                  </>
                )}
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              {!editMode ? (
                // View Mode
                <div className="space-y-8">
                  {/* Basic Info Section */}
                  <div className="space-y-6">
                    {/* About Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <PencilLine className="w-5 h-5 text-violet-600" />
                        <h2 className="font-semibold text-gray-800">About</h2>
                      </div>
                      <p className="text-gray-700">{profile.bio}</p>
                    </div>

                    {/* Looking For / Company Type Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        {profileType === "student" ? (
                          <>
                            <Search className="w-5 h-5 text-violet-600" />
                            <h2 className="font-semibold text-gray-800">
                              Looking For
                            </h2>
                          </>
                        ) : (
                          <>
                            <TagIcon className="w-5 h-5 text-violet-600" />
                            <h2 className="font-semibold text-gray-800">
                              Company Type
                            </h2>
                          </>
                        )}
                      </div>
                      {profileType === "student" ? (
                        <p className="text-gray-700">{profile.lookingFor}</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {userDescriptors.map((descriptor, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-sm"
                            >
                              {descriptor}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Info - Email and Schedule Link */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                    <p className="text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-violet-500" />
                      <span>{profile.email}</span>
                    </p>
                    {profile.link && (
                      <p className="text-gray-700 flex items-center gap-2">
                        <Video className="w-4 h-4 text-violet-500" />
                        <a
                          href={profile.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-600 hover:underline"
                        >
                          {profile.link}
                        </a>
                      </p>
                    )}
                  </div>

                  {/* Profile Type Specific Information */}
                  {profileType === "student" ? (
                    // Student View
                    <div className="space-y-8 border-t border-gray-100 pt-6">
                      {/* Skills */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Code className="w-5 h-5 text-violet-600" />
                          <h2 className="font-semibold text-gray-800">
                            Skills
                          </h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {userSkills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Experiences */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Briefcase className="w-5 h-5 text-violet-600" />
                          <h2 className="font-semibold text-gray-800">
                            Experience
                          </h2>
                        </div>
                        {userExperience && userExperience.length > 0 ? (
                          <div className="space-y-4">
                            {userExperience.map((exp, idx) => (
                              <div
                                key={idx}
                                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                  <h3 className="font-bold text-violet-700">
                                    {exp.jobTitle || exp.role} • {exp.company}
                                  </h3>
                                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    {exp.startDate} - {exp.endDate}
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {exp.jobDescription || exp.details}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">
                            No experience added yet.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Company View
                    <div className="space-y-8 border-t border-gray-100 pt-6">
                      {/* Role Description */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Briefcase className="w-5 h-5 text-violet-600" />
                          <h2 className="font-semibold text-gray-800">
                            Role Description
                          </h2>
                        </div>
                        <p className="text-gray-700">
                          {profile.roleDescription}
                        </p>
                      </div>

                      {/* Required Skills */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Code className="w-5 h-5 text-violet-600" />
                          <h2 className="font-semibold text-gray-800">
                            Required Skills
                          </h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {userSkills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Edit Mode
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  {/* Basic Info Section */}
                  <div className="border-b border-gray-200 pb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <UserCircle className="w-5 h-5 text-violet-600" />
                      Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) =>
                            setEditData({ ...editData, email: e.target.value })
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Scheduling Link
                        </label>
                        <input
                          type="url"
                          value={editData.link}
                          onChange={(e) =>
                            setEditData({ ...editData, link: e.target.value })
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          value={editData.bio}
                          onChange={(e) =>
                            setEditData({ ...editData, bio: e.target.value })
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Profile Type Specific Fields */}
                  {profileType === "student" ? (
                    // Student Edit Fields
                    <>
                      <div className="border-b border-gray-200 pb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-violet-600" />
                          Student Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Major
                            </label>
                            <input
                              type="text"
                              value={editData.major}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  major: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Looking For
                            </label>
                            <textarea
                              value={editData.lookingFor}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  lookingFor: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-b border-gray-200 pb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Code className="w-5 h-5 text-violet-600" />
                          Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(availableSkills).map(([id, name]) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() => handleSkillToggle(id)}
                              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                editData.skills.includes(id)
                                  ? "bg-violet-200 text-violet-900"
                                  : "bg-violet-50 text-violet-700 hover:bg-violet-100"
                              }`}
                            >
                              {name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-violet-600" />
                          Experience
                        </h2>

                        {/* List existing experiences */}
                        {editData.experiences &&
                          editData.experiences.length > 0 && (
                            <div className="space-y-4 mb-6">
                              {editData.experiences.map((exp, idx) => (
                                <div className="flex flex-row gap-2">
                                  <div
                                    key={idx}
                                    className="flex-grow-1 p-4 bg-gray-50 rounded-lg border border-gray-200 relative"
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                      <h3 className="font-bold text-violet-700">
                                        {exp.jobTitle || exp.role} •{" "}
                                        {exp.company}
                                      </h3>
                                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                                        <Calendar className="w-4 h-4" />
                                        {exp.startDate} - {exp.endDate}
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                      {exp.jobDescription || exp.details}
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={async () => {
                                      if (exp.id) {
                                        await deleteExperience(exp.id);
                                      }
                                      setEditData((prev) => ({
                                        ...prev,
                                        experiences: prev.experiences.filter(
                                          (e, index) => index !== idx
                                        ),
                                      }));
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}

                        {/* Add new experience */}
                        <div className="bg-violet-50 rounded-lg p-4 border border-violet-100">
                          <h3 className="text-violet-700 font-medium mb-3 flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Add New Experience
                          </h3>
                          <ExperienceInput
                            onAdd={(exp) =>
                              setEditData((prev) => ({
                                ...prev,
                                experiences: [...(prev.experiences || []), exp],
                              }))
                            }
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    // Company Edit Fields
                    <>
                      <div className="border-b border-gray-200 pb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <TagIcon className="w-5 h-5 text-violet-600" />
                          Company Type
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(availableDescriptors).map(
                            ([id, name]) => (
                              <button
                                key={id}
                                type="button"
                                onClick={() => handleDescriptorToggle(id)}
                                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                  editData.descriptors.includes(id)
                                    ? "bg-violet-200 text-violet-900"
                                    : "bg-violet-50 text-violet-700 hover:bg-violet-100"
                                }`}
                              >
                                {name}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div className="border-b border-gray-200 pb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-violet-600" />
                          Open Role
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Role Title
                            </label>
                            <input
                              type="text"
                              value={editData.role}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  role: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Role Description
                            </label>
                            <textarea
                              value={editData.roleDescription}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  roleDescription: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Code className="w-5 h-5 text-violet-600" />
                          Required Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(availableSkills).map(([id, name]) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() => handleSkillToggle(id)}
                              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                editData.skills.includes(id)
                                  ? "bg-violet-200 text-violet-900"
                                  : "bg-violet-50 text-violet-700 hover:bg-violet-100"
                              }`}
                            >
                              {name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default TestProfile;
