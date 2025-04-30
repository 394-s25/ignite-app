import React, { useState } from "react";
import { addExperience } from "../../db/firebaseService";
import { useAuth } from "../../contexts/authContext";

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => String(currentYear - i));

const ExperienceInput = ({ onAdd }) => {
  const { authUser } = useAuth();
  const [exp, setExp] = useState({
    company: "",
    role: "",
    details: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
  });

  const handleAddExperience = async () => {
    try {
      if (
        exp.company &&
        exp.role &&
        exp.details &&
        exp.startMonth &&
        exp.startYear &&
        exp.endMonth &&
        exp.endYear
      ) {
        const newExp = {
          company: exp.company,
          role: exp.role,
          details: exp.details,
          startDate: `${exp.startMonth}/${exp.startYear}`,
          endDate: `${exp.endMonth}/${exp.endYear}`,
        };
        // Save to experience table in Firebase
        if (authUser?.uid) {
          await addExperience({
            userId: authUser.uid,
            jobTitle: exp.role,
            jobDescription: exp.details,
            startDate: newExp.startDate,
            endDate: newExp.endDate,
            company: exp.company,
          });
        }
        onAdd(newExp);
        setExp({
          company: "",
          role: "",
          details: "",
          startMonth: "",
          startYear: "",
          endMonth: "",
          endYear: "",
        });
      } else {
        alert("Please fill in all fields.");
      }
    } catch (error) {
      console.error("Error adding experience:", error);
      alert("Failed to add experience. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-violet-500"
          placeholder="Company Name"
          value={exp.company}
          onChange={(e) => setExp({ ...exp, company: e.target.value })}
        />

        <input
          className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-violet-500"
          placeholder="Role"
          value={exp.role}
          onChange={(e) => setExp({ ...exp, role: e.target.value })}
        />
      </div>

      <textarea
        className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-violet-500 min-h-24"
        placeholder="Job Details"
        value={exp.details}
        onChange={(e) => setExp({ ...exp, details: e.target.value })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-2">From:</span>
          <select
            value={exp.startMonth}
            onChange={(e) => setExp({ ...exp, startMonth: e.target.value })}
            className="bg-white border border-gray-300 rounded px-2 py-1 mr-2 focus:outline-none focus:border-violet-500"
          >
            <option value="">MM</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={exp.startYear}
            onChange={(e) => setExp({ ...exp, startYear: e.target.value })}
            className="bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-violet-500"
          >
            <option value="">YYYY</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-2">To:</span>
          <select
            value={exp.endMonth}
            onChange={(e) => setExp({ ...exp, endMonth: e.target.value })}
            className="bg-white border border-gray-300 rounded px-2 py-1 mr-2 focus:outline-none focus:border-violet-500"
          >
            <option value="">MM</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={exp.endYear}
            onChange={(e) => setExp({ ...exp, endYear: e.target.value })}
            className="bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-violet-500"
          >
            <option value="">YYYY</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        className="bg-violet-200 text-violet-900 px-4 py-2 rounded-lg hover:bg-violet-300 focus:outline-none"
        onClick={handleAddExperience}
      >
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceInput;
