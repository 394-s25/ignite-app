import React from "react";
import { CakeSlice, BookOpen, Code } from "lucide-react";

const StudentCard = ({
  studentBio,
  lookingFor,
  studentSkills = [],
  contactInfo,
}) => {
  return (
    <section className="h-full bg-white overflow-y-auto p-8 md:px-12 flex flex-col gap-12">
      {/* about */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-violet-600" />
          <h2 className="text-sm font-medium uppercase text-violet-600">
            About
          </h2>
        </div>
        <p className="text-gray-700">{studentBio}</p>
      </div>

      {/* looking for */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <CakeSlice className="w-4 h-4 text-violet-600" />
          <h2 className="text-sm font-medium uppercase text-violet-600">
            Looking For
          </h2>
        </div>
        <p className="text-gray-700">{lookingFor}</p>
      </div>

      {/* skills */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-violet-600" />
          <h2 className="text-sm font-medium uppercase text-violet-600">
            Skills
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {studentSkills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-violet-50 text-violet-900 rounded-md text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium uppercase text-violet-600">
          Contact Information
        </h2>
        <p className="text-gray-700">{contactInfo}</p>
      </div>
    </section>
  );
};

export default StudentCard;
