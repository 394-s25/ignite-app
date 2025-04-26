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
    console.log(user);
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

// get or create user profile
export const getUserProfile = async (uid, name) => {
  try {
    const userRef = ref(db, `users/${uid}`);
    const userSnapshot = await get(userRef);

    if (userSnapshot.exists()) {
      console.log(`accessed profile for ${name} with id ${uid}`);
      return userSnapshot.val();
    } else {
      const newUser = {
        uid: uid,
        name: name || "Unknown Northwestern Student",
        bio: "",
        major: "",
        skills: [],
        preferences: {},
      };
      await set(userRef, newUser);
      console.log(`created new profile for ${name} with id ${uid}`);
      return newUser;
    }
  } catch (error) {
    console.error("Error getting/creating profile:", error);
    throw error;
  }
};

// update user profile
export const updateUserProfile = async (uid, profile) => {
  try {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const updatedProfile = {
        ...snapshot.val(),
        ...profile,
      };

      await set(userRef, updatedProfile);
      console.log(`updated user profile with ${profile}`);
      return updatedProfile;
    } else {
      throw new Error("User profile not found");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
