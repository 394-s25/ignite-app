import React from "react";
import { Check, X } from "lucide-react";

const CompanySwipeCard = ({
  companyName,
  companyDescription,
  roleName,
  roleDescription,
  roleSkills = [],
  contactInfo,
}) => {
  return (
    <div className="w-full max-w-5xl flex flex-col pt-12 p-8 gap-10 bg-white rounded-lg ">
      {/* name + logo + desc*/}
      <div className="flex flex-col gap-3">
        <div className="gap-2">
          <p className="text-left text-violet-600 text-sm font-medium uppercase">
            Company Description
          </p>
          <h3 className="text-left text-black text-2xl font-bold">
            {companyName}
          </h3>
        </div>

        <p className="text-gray-600 text-left">{companyDescription}</p>
      </div>

      {/* role description*/}
      <div className="flex flex-col gap-3">
        <div className="gap-2">
          <p className="text-left text-violet-600 text-sm font-medium uppercase">
            Role Description
          </p>
          <h2 className="text-left text-gray-900 text-2xl font-bold">
            {roleName}
          </h2>
        </div>
        <div className="space-y-2">
          <p className="text-left text-black">{roleDescription}</p>
        </div>
      </div>

      {/* role skills */}
      <div className="flex flex-col gap-3">
        <p className="text-left text-violet-600 text-sm font-medium uppercase">
          Required Skills
        </p>
        <div className="flex flex-wrap gap-2">
          {roleSkills.map((skill, index) => (
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

export default CompanySwipeCard;
