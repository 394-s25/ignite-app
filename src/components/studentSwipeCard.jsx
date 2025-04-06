import React from "react";
import { CircleUserRound, Check, X } from "lucide-react";

const StudentSwipeCard = ({
  studentName,
  studentMajor,
  studentBio,
  studentSkills = [],
  contactInfo,
}) => {
  return (
    <div className="w-full max-w-5xl flex flex-col pt-12 p-8 gap-10 bg-white rounded-lg ">
      {/* name + logo + desc*/}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <CircleUserRound className="h-24 w-24 text-violet-700" />
          <h3 className="text-left text-black text-2xl font-bold">
            {studentName}
          </h3>
        </div>

        <p className="text-gray-600 text-left">{studentBio}</p>
      </div>

      {/* role skills */}
      <div className="flex flex-col gap-3">
        <p className="text-left text-violet-600 text-sm font-medium uppercase">
          Student Skills
        </p>
        <div className="flex flex-wrap gap-2">
          {studentSkills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-violet-100 text-violet-900 rounded-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* contact information*/}
      <div className="flex flex-col gap-2">
        <p className="text-left text-violet-600 text-sm font-medium uppercase">
          Contact Information
        </p>
        <p className="text-left text-black">{contactInfo}</p>
      </div>

      {/* yes + no buttons */}
      <div className="mt-12 flex flex-row justify-between">
        <button className="h-16 w-16 bg-white hover:bg-gray-100 text-black border-1 border-gray-300 shadow-sm rounded-full flex items-center justify-center transition-colors">
          <X className="w-8 h-8" />
        </button>
        <button className="h-16 w-16 bg-violet-100 hover:bg-violet-300 hover:text-violet-700 text-violet-900 shadow-sm rounded-full flex items-center justify-center transition-colors">
          <Check className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default StudentSwipeCard;
