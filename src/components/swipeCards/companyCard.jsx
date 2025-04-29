import React from "react";
import { Building, Briefcase, Code, Mail, Star } from "lucide-react";

const CompanyCard = ({ company, matchScore }) => {
  return (
    <div className="h-full bg-white rounded-lg shadow-xs overflow-hidden flex flex-col">
      {/* Company Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* Company Info */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-violet-50 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-violet-700" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                {company.role}
              </h1>
              <h3 className="text-sm font-medium text-violet-600">
                {company.name}
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

      {/* Company Content */}
      <section className="flex-1 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 overflow-y-auto">
        {/* Company Description */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-violet-600" />
            <h2 className="text-sm font-medium uppercase text-violet-600">
              About
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-700 line-clamp-3">
            {company.bio}
          </p>
          {company.descriptors && company.descriptors.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {company.descriptors.map((descriptor, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-violet-50 text-violet-900 rounded-md text-xs sm:text-sm font-medium"
                >
                  {descriptor}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Role Description */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-violet-600" />
            <h2 className="text-sm font-medium uppercase text-violet-600">
              Role
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-700 line-clamp-3">
            {company.roleDescription}
          </p>
        </div>

        {/* Skills if available */}
        {company.skills && company.skills.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-violet-600" />
              <h2 className="text-sm font-medium uppercase text-violet-600">
                Skills
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {company.skills.map((skill, idx) => (
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

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-violet-600" />
            <h2 className="text-sm font-medium uppercase text-violet-600">
              Contact Information
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-700">{company.email}</p>
        </div>
      </section>
    </div>
  );
};

export default CompanyCard;
