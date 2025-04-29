import React from "react";
import { Building, Briefcase, Code, Mail, Star } from "lucide-react";

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Company Header */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-violet-50 rounded-lg flex items-center justify-center">
            <Star className="w-6 h-6 text-violet-700" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{company.role}</h1>
            <h3 className="text-sm font-medium text-violet-600">
              {company.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Company Content */}
      <section className="p-8 flex flex-col gap-8">
        {/* Company Description */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-violet-600" />
            <h2 className="text-sm font-medium uppercase text-violet-600">
              About
            </h2>
          </div>
          <p className="text-gray-700">{company.bio}</p>
          {company.descriptors && company.descriptors.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {company.descriptors.map((descriptor, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-violet-50 text-violet-900 rounded-md text-sm font-medium"
                >
                  {descriptor}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Role Description */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-violet-600" />
            <h2 className="text-sm font-medium uppercase text-violet-600">
              Role
            </h2>
          </div>
          <p className="text-gray-700">{company.roleDescription}</p>
        </div>

        {/* Skills if available */}
        {company.skills && company.skills.length > 0 && (
          <div className="flex flex-col gap-3">
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
                  className="px-3 py-1 bg-violet-50 text-violet-900 rounded-md text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-violet-600" />
            <h2 className="text-sm font-medium uppercase text-violet-600">
              Contact Information
            </h2>
          </div>
          <p className="text-gray-700">{company.email}</p>
        </div>
      </section>
    </div>
  );
};

export default CompanyCard;
