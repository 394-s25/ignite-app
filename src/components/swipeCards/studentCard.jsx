import React, { useEffect, useState } from "react";
import {
  PencilLine,
  SearchCheck,
  Code,
  Mail,
  CircleUserRound,
  Briefcase,
} from "lucide-react";
import { fetchExperienceByUser } from "../../db/firebaseService";

const StudentCard = ({ student, matchScore }) => {
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
    <div className="h-full bg-white rounded-lg shadow-xs overflow-hidden flex flex-col">
      {/* Student Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* Student Info */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-violet-50 rounded-lg flex items-center justify-center">
              <CircleUserRound className="w-5 h-5 sm:w-6 sm:h-6 text-violet-700" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                {student.name}
              </h1>
              <h3 className="text-sm font-medium text-violet-600">
                {student.major}
              </h3>
            </div>
          </div>
          {/* Match Score */}
          {matchScore !== undefined && (
            <div className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm font-medium">
              {Math.round(matchScore * 100)}% Match
            </div>
          )}
        </div>
      </div>

      {/* Student Content */}
      <section className="flex-1 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 overflow-y-auto">
        {/* Student Description */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <PencilLine className="w-4 h-4 text-violet-600" />
            <h2 className="text-sm font-medium uppercase text-violet-600">
              About
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-700 line-clamp-3">
            {student.bio}
          </p>
        </div>

        {/* Looking For */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <SearchCheck className="w-4 h-4 text-violet-600" />
            <h2 className="text-sm font-medium uppercase text-violet-600">
              Looking For
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-700 line-clamp-3">
            {student.lookingFor}
          </p>
        </div>

        {/* Skills if available */}
        {student.skills && student.skills.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-violet-600" />
              <h2 className="text-sm font-medium uppercase text-violet-600">
                Skills
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-violet-50 text-violet-900 rounded-md text-xs sm:text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experiences */}
        {experiences.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-violet-600" />
              <h2 className="text-sm font-medium uppercase text-violet-600">
                Experiences
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-violet-50 rounded-md shadow-sm border border-violet-100"
                >
                  <h3 className="text-sm font-bold text-violet-800">
                    {exp.company}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-sm text-gray-700">{exp.jobTitle}</p>
                  <p className="text-sm text-gray-700">{exp.jobDescription}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-violet-600" />
            <h2 className="text-sm font-medium uppercase text-violet-600">
              Contact Information
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-700">{student.email}</p>
        </div>
      </section>
    </div>
  );
};

export default StudentCard;