import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../db/firebaseConfig";
import { useProfile } from "../../contexts/profileContext";

const CompanyProfileMatchedCard = ({ company }) => {
  // const [liked, setLiked] = useState(false);
  const [skillNames, setSkillNames] = useState([]);
  const { profile, profileType, userSkills } = useProfile();

  useEffect(() => {
    const fetchSkillNames = async () => {
      if (!company.skills || company.skills.length === 0) return;

      try {
        const fetchedSkills = await Promise.all(
          company.skills.map(async (skillId) => {
            const skillSnapshot = await get(ref(db, `skills/${skillId}`));
            console.log("Skill fetched:", skillSnapshot.val());

            if (skillSnapshot.exists()) {
              const skillData = skillSnapshot.val();
              return typeof skillData === "string"
                ? skillData
                : skillData.skill;
            } else {
              console.log("No skill found for id:", skillId);
              return null;
            }
          })
        );
        const validSkills = fetchedSkills.filter((s) => s !== null);
        setSkillNames(validSkills);
      } catch (error) {
        console.error("Error fetching skill names:", error);
      }
    };

    fetchSkillNames();
  }, [company.skills]);

  return (
    <div className="relative">
      <div className="flex flex-col bg-purple-100 rounded-xl p-6 max-w-2xl mx-auto shadow-md hover:shadow-xl transform transition duration-300">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={`https://picsum.photos/seed/${encodeURIComponent(
              company.companyName
            )}/200/300`}
            alt={`${company.companyName} logo`}
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
          />

          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-purple-800">
              {company.companyName}
            </h2>
            <p className="text-gray-700 mt-2">{company.bio}</p>

            {skillNames.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-purple-700 mb-2">
                  Required Skills:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillNames.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white text-purple-800 rounded-full text-sm border border-purple-300 hover:bg-purple-50 transition-transform transform hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <a
            className="px-6 py-2 text-xl rounded-2xl bg-purple-700 text-white active:bg-purple-700 hover:bg-purple-400 font-semibold"
            href={company.link || "https://calendly.com/sophiafresquez2026-u/30min?month=2025-04"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Schedule Interview
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileMatchedCard;
