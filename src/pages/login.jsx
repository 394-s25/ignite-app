import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useProfile } from "../contexts/profileContext";
import { getProfile } from "../db/firebaseAuth";

const LoginPage = () => {
  const { authUser, login } = useAuth();
  const { profile, profileType } = useProfile();
  const navigate = useNavigate();
  const [showProfileTypeSelect, setShowProfileTypeSelect] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // If user is logged in and has a profile type, redirect to appropriate page
    if (authUser && profile && profileType) {
      navigate("/editProfile");
    }
  }, [authUser, profile, profileType, navigate]);

  const handleLogin = async () => {
    try {
      setError("");
      const result = await login();
      if (result) {
        setShowProfileTypeSelect(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    }
  };

  const handleProfileTypeSelect = async (type) => {
    try {
      setError("");
      // The getProfile function will create a new profile if one doesn't exist
      await getProfile(authUser.uid, authUser.displayName, type);
      navigate("/editProfile");
    } catch (error) {
      console.error("Profile creation error:", error);
      setError("Failed to create profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Ignite
          </h1>
          <p className="text-gray-600 mb-8">
            Northwestern's Garage Job Matching Platform
          </p>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!showProfileTypeSelect ? (
          <button
            onClick={handleLogin}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Sign in with Google
          </button>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-gray-900">
              I am a...
            </h2>
            <button
              onClick={() => handleProfileTypeSelect("applicant")}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Northwestern Student
            </button>
            <button
              onClick={() => handleProfileTypeSelect("company")}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Startup/Company
            </button>
          </div>
        )}

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Only Northwestern email addresses (@u.northwestern.edu) are allowed
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
