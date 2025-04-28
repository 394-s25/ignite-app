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

// see if user is company/user, then fetch their profile
const checkProfile = async (uid, name) => {
  try {
    const studentRef = ref(db, `users/${uid}`);
    const studentSnapshot = await get(studentRef);
    const companyRef = ref(db, `companies/${uid}`);
    const companySnapshot = await get(companyRef);

    if (studentSnapshot.exists()) {
      console.log(`accessed student profile for ${name} with id ${uid}`);
      return studentSnapshot.val();
    } else if (companySnapshot.exists()) {
      console.log(`accessed company profile for ${name} with id ${uid}`);
      return companySnapshot.val();
    } else {
      console.log("new user");
      return;
    }
  } catch (error) {
    console.error("Error getting profile", error);
    throw error;
  }
};

// create new profile given type (company/user)
const makeNewProfile = async (uid, name, type) => {
  console.log(type);
  try {
    if (type == "student") {
      const studentRef = ref(db, `users/${uid}`);
      const newStudent = {
        uid: uid,
        name: name || "Unknown Northwestern Student",
        bio: "",
        major: "",
        skills: [],
      };
      await set(studentRef, newStudent);
      console.log(`created new student profile for ${name} with id ${uid}`);
      return newStudent;
    } else if (type == "company") {
      const companyRef = ref(db, `companies/${uid}`);
      const newCompany = {
        uid: uid,
        name: `${name}'s Startup` || "Unknown Northwestern Startup",
        about: "",
        descriptors: [],
        skills: [],
      };
      await set(companyRef, newCompany);
      console.log(`created new company profile for ${name} with id ${uid}`);
      return newCompany;
    } else {
      throw new Error("Invalid type. Has to be either user or company.");
    }
  } catch (error) {
    console.error("Error creating new profile:", error);
    throw error;
  }
};

// consolidated get/create profile upon login, given type (company/user)
export const getProfile = async (uid, displayName, type = null) => {
  try {
    const existingProfile = await checkProfile(uid, displayName);
    if (existingProfile) {
      return existingProfile;
    }

    if (type === "student" || type === "company") {
      return await makeNewProfile(uid, displayName, type);
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

export const updateStudentProfile = async (uid, profileData) => {
  try {
    const studentRef = ref(db, `users/${uid}`);
    const snapshot = await get(studentRef);

    if (!snapshot.exists()) {
      throw new Error("student profile not found");
    }

    const updatedProfile = {
      ...snapshot.val(),
      name: profileData.name || snapshot.val().name,
      bio: profileData.bio || snapshot.val().about,
      major: profileData.major || snapshot.val().major,
      skills: profileData.skills || [],
    };

    await set(studentRef, updatedProfile);
    console.log(`Updated student profile for ${updatedProfile.name}`);
    return updatedProfile;
  } catch (error) {
    console.error("Error updating student profile:", error);
    throw error;
  }
};

// Update company profile with validation
export const updateCompanyProfile = async (uid, profileData) => {
  try {
    const companyRef = ref(db, `companies/${uid}`);
    const snapshot = await get(companyRef);

    if (!snapshot.exists()) {
      throw new Error("Company profile not found");
    }

    const updatedProfile = {
      ...snapshot.val(),
      name: profileData.name || snapshot.val().name,
      bio: profileData.bio || snapshot.val().bio,
      descriptors: profileData.descriptors || [],
      skills: profileData.skills || [],
    };

    await set(companyRef, updatedProfile);
    console.log(`Updated company profile for ${updatedProfile.name}`);
    return updatedProfile;
  } catch (error) {
    console.error("Error updating company profile:", error);
    throw error;
  }
};
