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

// see if user is company/user, then fetch their profile; if new user [TODO]
const checkProfile = async (uid, name) => {
  try {
    const applicantRef = ref(db, `users/${uid}`);
    const applicantSnapshot = await get(applicantRef);
    const companyRef = ref(db, `companies/${uid}`);
    const companySnapshot = await get(companyRef);

    if (applicantSnapshot.exists()) {
      console.log(`accessed user profile for ${name} with id ${uid}`);
      return applicantSnapshot.val();
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
  try {
    if (type == "user") {
      const applicantRef = ref(db, `users/${uid}`);
      const newApplicant = {
        uid: uid,
        name: name || "Unknown Northwestern Student",
        bio: "",
        major: "",
        skills: [],
        preferences: {},
      };
      await set(applicantRef, newApplicant);
      console.log(`created new applicant profile for ${name} with id ${uid}`);
      return newApplicant;
    } else if (type == "company") {
      const companyRef = ref(db, `companies/${uid}`);
      const newCompany = {
        uid: uid,
        name: `${name}'s Startup` || "Unknown Northwestern Startup",
        about: "",
        description: {},
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

    if (type === "applicant" || type === "company") {
      return await makeNewProfile(uid, displayName, type);
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Update applicant profile with validation
export const updateApplicantProfile = async (uid, profileData) => {
  try {
    const applicantRef = ref(db, `users/${uid}`);
    const snapshot = await get(applicantRef);

    if (!snapshot.exists()) {
      throw new Error("Applicant profile not found");
    }

    // Validate and process plain text fields
    const plainTextFields = {
      name: profileData.name || snapshot.val().name,
      bio: profileData.bio || snapshot.val().bio,
      major: profileData.major || snapshot.val().major,
    };

    // Validate skills - ensure they are valid IDs from the skills collection
    let skills = [];
    if (profileData.skills && Array.isArray(profileData.skills)) {
      // Assuming skills are already validated IDs
      skills = profileData.skills;
    } else {
      skills = snapshot.val().skills || [];
    }

    // Validate preferences - ensure they are valid IDs from the preferences collection
    // Preferences should be an object with keys: culture, opportunities, industry
    let preferences = {};
    if (profileData.preferences) {
      const validCategories = ["culture", "opportunities", "industry"];
      validCategories.forEach((category) => {
        if (
          profileData.preferences[category] &&
          Array.isArray(profileData.preferences[category])
        ) {
          preferences[category] = profileData.preferences[category];
        } else {
          preferences[category] = snapshot.val().preferences?.[category] || [];
        }
      });
    } else {
      preferences = snapshot.val().preferences || {};
    }

    const updatedProfile = {
      ...snapshot.val(),
      ...plainTextFields,
      skills,
      preferences,
    };

    await set(applicantRef, updatedProfile);
    console.log(`Updated applicant profile for ${updatedProfile.name}`);
    return updatedProfile;
  } catch (error) {
    console.error("Error updating applicant profile:", error);
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

    // Validate and process plain text fields
    const plainTextFields = {
      name: profileData.name || snapshot.val().name,
      about: profileData.about || snapshot.val().about,
    };

    // Validate description - ensure it contains valid subfields
    let description = {};
    if (profileData.description) {
      const validCategories = ["culture", "opportunities", "industry"];
      validCategories.forEach((category) => {
        if (
          profileData.description[category] &&
          Array.isArray(profileData.description[category])
        ) {
          description[category] = profileData.description[category];
        } else {
          description[category] = snapshot.val().description?.[category] || [];
        }
      });
    } else {
      description = snapshot.val().description || {};
    }

    const updatedProfile = {
      ...snapshot.val(),
      ...plainTextFields,
      description,
    };

    await set(companyRef, updatedProfile);
    console.log(`Updated company profile for ${updatedProfile.name}`);
    return updatedProfile;
  } catch (error) {
    console.error("Error updating company profile:", error);
    throw error;
  }
};
