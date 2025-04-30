import { X, Check } from "lucide-react";

const ActionButtons = ({ onReject, onAccept }) => {
  console.log("onAccept:", onAccept);
  return (
    <div className="p-4 sm:p-6 border-t border-gray-200 bg-white flex justify-between">
      <button
        className="h-14 w-14 sm:h-16 sm:w-16 bg-white hover:bg-gray-100 text-gray-500 border border-gray-200 shadow-sm rounded-full flex items-center justify-center transition-colors"
        onClick={onReject}
      >
        <X className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>
      <button
        className="h-14 w-14 sm:h-16 sm:w-16 bg-white hover:bg-violet-50 text-violet-700 border border-violet-200 shadow-sm rounded-full flex items-center justify-center transition-colors"
        onClick={onAccept}
      >
        <Check className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>
    </div>
  );
};

export default ActionButtons;
