import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";

const CompanyProfile = ({ profile, onUpdate }) => {
  const { authUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(editedProfile);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              value={editedProfile.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              About
            </label>
            <textarea
              name="about"
              value={editedProfile.about}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Description
            </label>
            <textarea
              name="description"
              value={editedProfile.description}
              onChange={handleInputChange}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Tell us about your company, culture, and what you're looking for..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Descriptors
            </label>
            <div className="mt-2">
              {Object.entries(editedProfile.descriptors || {}).map(
                ([category, values]) => (
                  <div key={category} className="mt-2">
                    <h4 className="text-sm font-medium capitalize">
                      {category}:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {values.map((descriptorId, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {descriptorId}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-medium text-gray-900">
              {profile.name}
            </h2>
            <p className="text-sm text-gray-500">{authUser.email}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">About</h3>
            <p className="mt-1 text-gray-600">{profile.about}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Company Description
            </h3>
            <div className="mt-2 prose prose-sm max-w-none text-gray-600">
              {profile.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
