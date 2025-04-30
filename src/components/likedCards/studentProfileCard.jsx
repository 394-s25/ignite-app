import React, { useState, useEffect } from "react";
import { addVisitedStudent, fetchExperienceByUser } from "../../db/firebaseService";
import { mapSkills } from "../../db/mappingIds";
import { useAuth } from "../../contexts/authContext";

const StudentProfileCard = ({ person, onRemove }) => {
  const [liked, setLiked] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const companyId = useAuth().authUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for:", person.name);
        console.log("Person:", person);
        const userExperiences = await fetchExperienceByUser(person.uid);
        console.log("Fetched experiences:", userExperiences);
        setExperiences(userExperiences);
        const mappedSkills = await mapSkills(person);
        setSkills(mappedSkills || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [person]);

  const handleLike = async () => {
    try {
      await addVisitedStudent(companyId, person.id, true);
      setLiked(true);
    } catch (error) {
      console.error("Error adding to visited list:", error);
    }
  };

  const handleDecline = async () => {
    try {
      await addVisitedStudent(companyId, person.id, false);
      onRemove(person);
    } catch (error) {
      console.error("Error adding to visited list:", error);
    }
  };

  return (
    <div className="flex flex-col bg-purple-100 rounded-xl p-6 max-w-2xl mx-auto shadow-md hover:shadow-xl transform transition duration-300">
      {/* Top: Profile Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={"https://randomuser.me/api/portraits/lego/1.jpg"}
          alt={person.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-purple-800">{person.name}</h2>
          <p className="text-sm text-purple-700">
            Major: {person.major || "Undeclared"}
          </p>
          {person.gradYear && (
            <p className="text-sm text-purple-700">Grad Year: {person.gradYear}</p>
          )}
          {person.email && (
            <p className="text-sm text-purple-700">Email: {person.email}</p>
          )}
          {person.link && (
            <a
              href={person.link.startsWith("http") ? person.link : `https://${person.link}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-700 underline hover:text-blue-900 transition"
            >
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Optional Bio Section */}
      {person.bio && (
        <div className="text-sm text-gray-700 mb-4">
          <p>{person.bio}</p>
        </div>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">Experience</h3>
          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500"
              >
                <h4 className="text-md font-bold text-purple-700">{exp.company}</h4>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">{exp.jobTitle}</span> ({exp.startDate} - {exp.endDate})
                </p>
                <p className="text-sm text-gray-700 mt-2">{exp.jobDescription}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom: Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        {liked ? (
          <a
            className="px-6 py-2 text-xl rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            href="https://calendly.com/sophiafresquez2026-u/30min?month=2025-04"
            target="_blank"
            rel="noreferrer"
          >
            Schedule Interview
          </a>
        ) : (
          <>
            <button
              onClick={handleLike}
              className="px-4 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              Like
            </button>
            <button
              onClick={handleDecline}
              className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Decline
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentProfileCard;