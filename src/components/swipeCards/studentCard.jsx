import React from "react";
import {
  PencilLine,
  SearchCheck,
  Code,
  Mail,
  CircleUserRound,
} from "lucide-react";

const StudentCard = ({ student }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Student Header */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-violet-50 rounded-lg flex items-center justify-center">
            <CircleUserRound className="w-6 h-6 text-violet-700" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{student.major}</h1>
            <h3 className="text-sm font-medium text-violet-600">
              {student.name}
            </h3>
          </div>
        </div>
      </div>

      {/* student Content */}
      <section className="p-8 flex flex-col gap-8">
        {/* student Description */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <PencilLine className="w-4 h-4 text-violet-600" />
            <h2 className="text-sm font-medium uppercase text-violet-600">
              About
            </h2>
          </div>
          <p className="text-gray-700">{student.bio}</p>
        </div>

        {/* looking for */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <SearchCheck className="w-4 h-4 text-violet-600" />
            <h2 className="text-sm font-medium uppercase text-violet-600">
              Looking For
            </h2>
          </div>
          <p className="text-gray-700">{student.lookingFor}</p>
        </div>

        {/* Skills if available */}
        {student.skills && student.skills.length > 0 && (
          <div className="flex flex-col gap-3">
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
          <p className="text-gray-700">{student.email}</p>
        </div>
      </section>
    </div>
  );
};

export default StudentCard;
