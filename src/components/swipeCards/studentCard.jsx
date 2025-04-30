import React, { useEffect, useState } from "react";
import {
  PencilLine,
  SearchCheck,
  Code,
  Mail,
  CircleUserRound,
  Briefcase,
  Calendar,
  GraduationCap,
} from "lucide-react";
import { fetchExperienceByUser } from "../../db/firebaseService";
import ActionButtons from "./actionButtons";

const StudentCard = ({ student, matchScore, onAccept, onReject }) => {
  const [experiences, setExperiences] = useState([]);

  // Fetch experiences when the component mounts
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const userExperiences = await fetchExperienceByUser(student.id);
        setExperiences(userExperiences);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();
  }, [student.id]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-scroll flex flex-col h-full border border-gray-100">
      {/* Header with student info and match score */}
      <div className="bg-violet-50 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-violet-100 rounded-full flex items-center justify-center">
              <CircleUserRound className="w-8 h-8 text-violet-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {student.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <GraduationCap className="w-4 h-4 text-violet-600" />
                <span className="text-sm text-gray-600">{student.major}</span>
              </div>
            </div>
          </div>

          {matchScore !== undefined && (
            <div className="flex flex-col items-center sm:items-end">
              <div className="px-4 py-2 bg-violet-100 text-violet-800 rounded-full text-sm font-medium">
                {Math.round(matchScore * 100)}% Match
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="p-4 sm:p-6 border-b border-gray-100 space-y-4">
        {/* About */}
        <div className="flex items-start gap-3">
          <PencilLine className="w-5 h-5 text-violet-600 mt-0.5" />
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-gray-800 mb-1">About</h2>
            <p className="text-sm text-gray-700">{student.bio}</p>
          </div>
        </div>

        {/* Looking For */}
        <div className="flex items-start gap-3">
          <SearchCheck className="w-5 h-5 text-violet-600 mt-0.5" />
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-gray-800 mb-1">
              Looking For
            </h2>
            <p className="text-sm text-gray-700">{student.lookingFor}</p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      {student.skills && student.skills.length > 0 && (
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Code className="w-5 h-5 text-violet-600" />
            <h2 className="font-semibold text-gray-800">Skills</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {student.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-violet-600" />
            <h2 className="font-semibold text-gray-800">Experience</h2>
          </div>
          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h3 className="font-bold text-violet-700">
                    {exp.jobTitle} • {exp.company}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Calendar className="w-3 h-3" />
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{exp.jobDescription}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-5 h-5 text-violet-600" />
          <h2 className="font-semibold text-gray-800">Contact</h2>
        </div>
        <p className="text-violet-600 font-medium flex items-center gap-1">
          {student.email}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto">
        <ActionButtons onAccept={onAccept} onReject={onReject} />
      </div>
    </div>
  );
};

export default StudentCard;
