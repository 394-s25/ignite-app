import { ref, get } from "firebase/database";
import { db } from "./firebaseConfig";

// get skill name given id
export async function getSkill(skillId) {
  const skillRef = ref(db, `skills/${skillId}`);
  try {
    const snapshot = await get(skillRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No skill found with that ID");
      return null;
    }
  } catch (error) {
    console.error("Error fetching skill:", error);
    return null;
  }
}

// map ids to actual skills
export const mapSkills = async (user) => {
  if (!user?.skills) return;
  try {
    const skillNames = await Promise.all(user.skills.map((id) => getSkill(id)));
    return skillNames;
  } catch (error) {
    console.error("Error in mapping skills:", error);
  }
};

// get pref name given id
export async function getDescriptor(descId) {
  const descRef = ref(db, `descriptors/${descId}`);
  try {
    const snapshot = await get(descRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log(`No descriptor found with that ID`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching descriptor:`, error);
    return null;
  }
}

// map ids to actual descriptors
export const mapDescriptors = async (user) => {
  if (!user?.descriptors) return;
  try {
    const descNames = await Promise.all(
      user.descriptors.map((id) => getDescriptor(id))
    );
    return descNames;
  } catch (error) {
    console.error("Error in mapping descriptors:", error);
  }
};
