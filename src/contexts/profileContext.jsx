import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getProfile,
  updateApplicantProfile,
  updateCompanyProfile,
} from "../db/firebaseAuth";
import { mapPrefs, mapSkills } from "../db/mappingIds";
import { useAuth } from "./authContext";

const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const { authUser, setIsLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [profileType, setProfileType] = useState(null); // 'applicant' or 'company'
  const [userSkills, setUserSkills] = useState([]);
  const [userPrefs, setUserPrefs] = useState({});

  // Initialize profile data upon login
  useEffect(() => {
    const initializeProfile = async () => {
      if (!authUser) {
        setProfile(null);
        setProfileType(null);
        setUserPrefs({});
        setUserSkills([]);
        return;
      }

      try {
        const userInfo = await getProfile(authUser.uid, authUser.displayName);
        if (userInfo) {
          setProfile(userInfo);
          // Determine profile type based on which database reference exists
          setProfileType(
            userInfo.hasOwnProperty("major") ? "applicant" : "company"
          );

          if (userInfo.hasOwnProperty("major")) {
            // Applicant-specific data
            const mappedPrefs = await mapPrefs(userInfo);
            const mappedSkills = await mapSkills(userInfo);
            setUserPrefs(mappedPrefs);
            setUserSkills(mappedSkills);
          }
        }
        console.log(`Initialized ${profileType} profile: ${userInfo?.name}`);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeProfile();
  }, [authUser]);

  // Update profile
  const updateProfile = async (profileData) => {
    if (!authUser) throw new Error("Not authenticated");
    if (!profileType) throw new Error("Profile type not determined");

    try {
      const updateFn =
        profileType === "applicant"
          ? updateApplicantProfile
          : updateCompanyProfile;
      const updatedProfile = await updateFn(authUser.uid, profileData);
      setProfile(updatedProfile);

      if (profileType === "applicant") {
        setUserPrefs(await mapPrefs(updatedProfile));
        setUserSkills(await mapSkills(updatedProfile));
      }

      return updatedProfile;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        profileType,
        userSkills: profileType === "applicant" ? userSkills : [],
        userPrefs: profileType === "applicant" ? userPrefs : {},
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
