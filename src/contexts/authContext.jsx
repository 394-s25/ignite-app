import React, { createContext, useState, useContext, useEffect } from "react";
import { handleGoogleLogin, handleGoogleLogout } from "../db/firebaseAuth";
import { auth } from "../db/firebaseConfig";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isNorthwesternEmail = (email) => {
    return (
      email.endsWith("@u.northwestern.edu") ||
      email.endsWith("@northwestern.edu")
    );
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setAuthUser(firebaseUser);
      if (!firebaseUser) setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

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

  const logout = async () => {
    try {
      await handleGoogleLogout();
      setAuthUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isLoading,
        setIsLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
