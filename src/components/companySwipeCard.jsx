import React from "react";
import { Code, Star, Briefcase, Building, Check, X } from "lucide-react";

const CompanySwipeCard = ({
  companyName,
  companyLogo,
  companyDescription,
  roleName,
  roleDescription,
  roleSkills = [],
  contactInfo,
  onAccept,
  onReject,
}) => {
  return (
    <div className="w-full h-screen md:max-w-5xl bg-white flex flex-col">
      {/* company + role + logo */}
      <div className="p-8 md:px-12 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-4">
          {companyLogo ? (
            <img
              src={companyLogo}
              className="h-12 w-12 md:w-16 md:h-16 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 md:w-16 md:h-16 bg-violet-50 rounded-lg flex items-center justify-center">
              <Star className="w-8 h-8 text-violet-700" />
            </div>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              {roleName}
            </h1>
            <h3 className="text-sm md:text-base font-medium text-violet-600 mb-1">
              {companyName}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-8 md:px-12">
        <section className="flex flex-col gap-12">
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
      </div>

      {/* yes + no */}
      <div className="p-8 md:px-12 border-t border-gray-200 bg-white flex justify-between">
        <button
          className="h-16 w-16 md:h-20 md:w-20 bg-white hover:bg-gray-100 text-gray-500 border border-gray-200 shadow-sm rounded-full flex items-center justify-center"
          onClick={onReject}
        >
          <X className="w-8 h-8" />
        </button>
        <button
          className="h-16 w-16 md:h-20 md:w-20 bg-white hover:bg-violet-50 text-violet-700 border border-violet-200 shadow-sm rounded-full flex items-center justify-center"
          onClick={onAccept}
        >
          <Check className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default CompanySwipeCard;
