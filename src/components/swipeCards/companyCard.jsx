import React from "react";
import {
  Building,
  Briefcase,
  Code,
  Mail,
  Star,
  PencilLine,
  SearchCheck,
} from "lucide-react";

const CompanyCard = ({ company, matchScore }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-scroll flex flex-col h-full border border-gray-100">
      {/* Header with company info and match score */}
      <div className="bg-violet-50 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-violet-100 rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-violet-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {company.role}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Building className="w-4 h-4 text-violet-600" />
                <span className="text-sm text-gray-600">{company.name}</span>
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
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* About */}
          <div className="flex items-start gap-3">
            <PencilLine className="w-5 h-5 text-violet-600 mt-0.5" />
            <div>
              <h2 className="text-sm font-semibold text-gray-800 mb-1">
                About
              </h2>
              <p className="text-sm text-gray-700">{company.bio}</p>
            </div>
          </div>

          {/* Company Descriptors */}
          <div className="flex items-start gap-3">
            <div>
              {company.descriptors && company.descriptors.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {company.descriptors.map((descriptor, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-medium"
                    >
                      {descriptor}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-700">
                  No descriptors available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Role Description Section */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-5 h-5 text-violet-600" />
          <h2 className="font-semibold text-gray-800">Role Description</h2>
        </div>
        <p className="text-sm text-gray-700 mb-4">{company.roleDescription}</p>

        {/* Skills Required */}
        {company.skills && company.skills.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {company.skills.map((skill, idx) => (
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
      </div>

      {/* Contact Section */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-5 h-5 text-violet-600" />
          <h2 className="font-semibold text-gray-800">Contact</h2>
        </div>
        <p className="text-violet-600 font-medium flex items-center gap-1">
          {company.email}
        </p>
      </div>
    </div>
  );
};

export default CompanyCard;
