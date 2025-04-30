import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../db/firebaseConfig";
import MatchedModal from "../matchedModal";
import { useProfile } from "../../contexts/profileContext";
import Confetti from "react-confetti";
import { likeCompany } from "../../db/matchService";

const CompanyProfileCard = ({ company, onRemove }) => {
  const [liked, setLiked] = useState(false);
  const [skillNames, setSkillNames] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const { profile, profileType, userSkills } = useProfile();

  const handleLike = () => {
    setLiked(true);
    setModalVisibility(true);
  };
  const handleDecline = () => onRemove(company);
  const handleCloseModal = () => setModalVisibility(false);
  const handleUnmatch = () => {
    setModalVisibility(false);
    onRemove(company);
  };

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
          <button
            onClick={handleLike}
            className="px-4 py-1 rounded-2xl bg-green-500 text-white hover:bg-green-600 transition"
          >
            Like
          </button>
          <button
            onClick={handleDecline}
            className="px-4 py-1 rounded-2xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            Decline
          </button>
        </div>

        {modalVisibility && (
          <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <Confetti
                className="z-40"
                confettiSource={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 6,
                  w: 0,
                  h: 0,
                }}
                width={window.innerWidth}
                height={window.innerHeight}
                numberOfPieces={30}
                recycle={false}
                tweenDuration={200}
                gravity={0.25}
              />

              <MatchedModal
                company={company}
                position="job placeholder"
                person={profile}
                onClose={handleCloseModal}
                onUnmatch={handleUnmatch}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyProfileCard;
