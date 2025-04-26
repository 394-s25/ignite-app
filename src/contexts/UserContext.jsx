import React, { createContext, useState, useContext, useEffect } from "react";
import {
  handleGoogleLogin,
  handleGoogleLogout,
  getUserProfile,
  updateUserProfile,
} from "../db/firebaseAuth";
import { mapPrefs, mapSkills } from "../db/mappingIds";
import { auth } from "../db/firebaseConfig";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [userPrefs, setUserPrefs] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const isNorthwesternEmail = (email) => {
    return (
      email.endsWith("@u.northwestern.edu") ||
      email.endsWith("@northwestern.edu")
    );
  };

  // listen for auth state change (user change)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setAuthUser(firebaseUser);
      if (!firebaseUser) setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // initialize data upon login
  useEffect(() => {
    const initializeUser = async () => {
      if (!authUser) {
        setProfile(null);
        setUserPrefs({});
        setUserSkills([]);
        return;
      }
      // prevent non-northwestern
      if (!isNorthwesternEmail(authUser.email)) {
        handleGoogleLogout();
        setAuthUser(null);
        throw new Error("Please use a Northwestern email to login");
      }
      try {
        const userInfo = await getUserProfile(
          authUser.uid,
          authUser.displayName
        );
        setProfile(userInfo);
        const mappedPrefs = await mapPrefs(userInfo);
        const mappedSkills = await mapSkills(userInfo);
        setUserPrefs(mappedPrefs);
        setUserSkills(mappedSkills);
        console.log(`initialized user: ${userInfo.name}`);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeUser();
  }, [authUser]);

  // login
  const login = async () => {
    try {
      const { uid, name, email } = await handleGoogleLogin();
      if (!isNorthwesternEmail(email)) {
        await logout();
        throw new Error("Please use a Northwestern email to login");
      }
      return { uid, name, email };
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  // logout
  const logout = async () => {
    try {
      await handleGoogleLogout();
      setAuthUser(null);
      return;
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  // update profile (for edits)
  const updateUser = async (profileData) => {
    if (!authUser) throw new Error("Not authenticated");

    try {
      const updatedProfile = await updateUserProfile(authUser.uid, profileData);
      setProfile(updatedProfile);
      setUserPrefs(mapPrefs(updatedProfile));
      setUserSkills(mapSkills(updatedProfile));
      return updatedProfile;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const user = profile || authUser;

  return (
    <UserContext.Provider
      value={{
        user,
        userSkills,
        userPrefs,
        login,
        logout,
        updateUser,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
