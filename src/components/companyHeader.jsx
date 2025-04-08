import { Star } from "lucide-react";

const CompanyHeader = ({ companyName, roleName }) => {
  return (
    <div className="px-8 py-6 md:px-12 md:py-8 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 md:w-16 md:h-16 bg-violet-50 rounded-lg flex items-center justify-center">
          <Star className="w-8 h-8 text-violet-700" />
        </div>
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
  );
};

export default CompanyHeader;
