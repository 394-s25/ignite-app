import { X, Check } from "lucide-react";

const ActionButtons = ({ onReject, onAccept }) => {
  return (
    <div className="p-8 md:p-12 border-t border-gray-200 bg-white flex justify-between">
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
  );
};

export default ActionButtons;
