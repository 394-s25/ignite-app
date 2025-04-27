import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getProfile,
  updateApplicantProfile,
  updateCompanyProfile,
} from "../db/firebaseAuth";
import { mapPrefs, mapSkills, mapDescriptors } from "../db/mappingIds";
import { useAuth } from "./authContext";

const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const { authUser, setIsLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [profileType, setProfileType] = useState(null);
  const [userSkills, setUserSkills] = useState([]);

  useEffect(() => {
    const initializeProfile = async () => {
      if (!authUser) {
        setProfile(null);
        setProfileType(null);
        setUserSkills([]);
        return;
      }

      try {
        const userInfo = await getProfile(authUser.uid, authUser.displayName);
        if (userInfo) {
          setProfile(userInfo);
          setProfileType(
            userInfo.hasOwnProperty("major") ? "applicant" : "company"
          );

          if (userInfo.hasOwnProperty("major")) {
            // Applicant-specific data - only map skills
            const mappedSkills = await mapSkills(userInfo);
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
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
