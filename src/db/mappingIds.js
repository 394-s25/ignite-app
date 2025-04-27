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

// map ids to actual descriptors
export const mapDescriptors = async (company) => {
  if (!company?.descriptors) return {};
  try {
    const descriptors = {};

    for (const [descriptorType, descriptorIds] of Object.entries(
      company.descriptors
    )) {
      if (!Array.isArray(descriptorIds)) continue;

      descriptors[descriptorType] = [];
      for (const id of descriptorIds) {
        const name = await getDescriptorNameById(descriptorType, id);
        if (name) {
          descriptors[descriptorType].push(name);
        }
      }
    }
    return descriptors;
  } catch (error) {
    console.error("Error loading descriptors:", error);
    return {};
  }
};

async function migrateDatabase() {
  try {
    // 1. Get all companies
    const companiesSnapshot = await get(ref(db, "companies"));
    if (!companiesSnapshot.exists()) return;

    const companies = companiesSnapshot.val();

    // 2. Update each company
    for (const [companyId, company] of Object.entries(companies)) {
      const updatedCompany = {
        ...company,
        descriptors: company.description || {
          culture: [],
          opportunities: [],
          industry: [],
        },
      };
      delete updatedCompany.description;

      await set(ref(db, `companies/${companyId}`), updatedCompany);
    }

    // 3. Move preferences to descriptors
    const prefsSnapshot = await get(ref(db, "preferences"));
    if (prefsSnapshot.exists()) {
      const prefs = prefsSnapshot.val();
      await set(ref(db, "descriptors"), prefs);
      // Optionally remove the old preferences
      await set(ref(db, "preferences"), null);
    }

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}
