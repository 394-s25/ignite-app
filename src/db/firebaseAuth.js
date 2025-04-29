import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig";

// check login for nu email
export const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = result.user;

    const isNorthwesternEmail = (email) => {
      return (
        email.endsWith("@u.northwestern.edu") ||
        email.endsWith("@northwestern.edu")
      );
    };

    if (!isNorthwesternEmail(user.email)) {
      alert("Please use your Northwestern email to sign in.");
      await signOut(auth);
      console.error("Not a Northwestern email");
      return null;
    }
    return {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// sign out user
export const handleGoogleLogout = async () => {
  try {
    await signOut(auth);
    return;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
