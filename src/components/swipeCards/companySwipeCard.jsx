import React from "react";
import { Code, Briefcase, Building } from "lucide-react";

const CompanySwipeCard = ({
  companyDescription,
  roleDescription,
  roleSkills = [],
  contactInfo,
}) => {
  return (
    <section className="h-full bg-white overflow-y-auto p-8 md:px-12 flex flex-col gap-12">
      {/* company desc */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-violet-600" />
          <h2 className="text-sm font-medium uppercase text-violet-600">
            Company
          </h2>
        </div>
        <p className="text-gray-700">{companyDescription}</p>
      </div>

      {/* role desc */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-violet-600" />
          <h2 className="text-sm font-medium uppercase text-violet-600">
            Role
          </h2>
        </div>
        <p className="text-gray-700">{roleDescription}</p>
      </div>

      {/* role skills */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-violet-600" />
          <h2 className="text-sm font-medium uppercase text-violet-600">
            Skills
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {roleSkills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-violet-50 text-violet-900 rounded-md text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* contact */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium uppercase text-violet-600">
          Contact Information
        </h2>
        <p className="text-gray-700">{contactInfo}</p>
      </div>
    </section>
  );
};

export default CompanySwipeCard;
