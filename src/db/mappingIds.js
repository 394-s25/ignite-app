import { getDatabase, ref, get, set, update } from "firebase/database";
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
export async function getPref(prefType, prefId) {
  const prefRef = ref(db, `preferences/${prefType}/${prefId}`);
  try {
    const snapshot = await get(prefRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log(`No ${prefType} pref found with that ID`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching ${prefType} pref:`, error);
    return null;
  }
}

// map ids to actual preferences
export const mapPrefs = async (user) => {
  if (!user?.preferences) return;
  try {
    const prefs = {};

    for (const [prefType, prefIds] of Object.entries(user.preferences)) {
      if (!Array.isArray(prefIds)) continue;

      prefs[prefType] = [];
      for (const id of prefIds) {
        const name = await getPref(prefType, id);
        prefs[prefType].push(name);
      }
    }
    return prefs;
  } catch (error) {
    console.error("Error loading preferences:", error);
    return {};
  }
};
