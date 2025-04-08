import { CircleUserRound } from "lucide-react";

const StudentHeader = ({ studentName, studentMajor, studentPhoto }) => {
  return (
    <div className="px-8 py-6 md:px-12 md:py-8 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        {studentPhoto ? (
          <img
            src={studentPhoto}
            className="h-12 w-12 md:w-16 md:h-16 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 md:w-16 md:h-16 bg-violet-50 rounded-lg flex items-center justify-center">
            <CircleUserRound className="w-8 h-8 text-violet-700" />
          </div>
        )}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            {studentName}
          </h1>
          <h3 className="text-sm md:text-base font-medium text-violet-600 mb-1">
            {studentMajor}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;
