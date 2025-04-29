import React, { createContext, useState, useContext, useEffect } from "react";
import { set } from "firebase/database";
import {
  getProfile,
  updateStudentProfile,
  updateCompanyProfile,
} from "../db/firebaseService";
import { mapSkills, mapDescriptors } from "../db/mappingIds";
import { useAuth } from "./authContext";

const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const { authUser, setIsLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [profileType, setProfileType] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [userDescriptors, setUserDescriptors] = useState([]);

  useEffect(() => {
    const initializeProfile = async () => {
      if (!authUser) {
        setProfile(null);
        setProfileType(null);
        setUserSkills([]);
        setUserDescriptors([]);
        return;
      }

      try {
        const userInfo = await getProfile(
          authUser.uid,
          authUser.displayName,
          authUser.email
        );
        if (userInfo) {
          setProfile(userInfo);
          const type = userInfo.major !== undefined ? "student" : "company";
          setProfileType(type);
          console.log("Profile type:", type);

          // Map skills for student profiles
          if (userInfo.skills) {
            const mappedSkills = await mapSkills(userInfo);
            setUserSkills(mappedSkills);
          }
          if (userInfo.descriptors) {
            const mappedDescriptors = await mapDescriptors(userInfo);
            setUserDescriptors(mappedDescriptors);
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeProfile();
  }, [authUser]);

  // for users to edit their profiles (dependent on company/stude)
  const updateProfile = async (profileData) => {
    if (!authUser) throw new Error("Not authenticated");
    if (!profileType) throw new Error("Profile type not determined");

    try {
      const updateFn =
        profileType === "student" ? updateStudentProfile : updateCompanyProfile;
      const updatedProfile = await updateFn(authUser.uid, profileData);
      setProfile(updatedProfile);
      setUserSkills(await mapSkills(updatedProfile));

      if (profileType === "company") {
        setUserDescriptors(await mapDescriptors(updatedProfile));
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
        userSkills,
        userDescriptors: profileType === "company" ? userDescriptors : [],
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
