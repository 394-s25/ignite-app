import React, { useState } from "react";
import { addExperience } from "../../db/firebaseService";
import { useAuth } from "../../contexts/authContext";

const months = [
  "01", "02", "03", "04", "05", "06",
  "07", "08", "09", "10", "11", "12"
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
        exp.company && exp.role && exp.details &&
        exp.startMonth && exp.startYear &&
        exp.endMonth && exp.endYear
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
    <div className="flex flex-col gap-2 mb-4">
      <input
        className="border p-1 rounded"
        placeholder="Company Name"
        value={exp.company}
        onChange={e => setExp({ ...exp, company: e.target.value })}
      />
      <input
        className="border p-1 rounded"
        placeholder="Role"
        value={exp.role}
        onChange={e => setExp({ ...exp, role: e.target.value })}
      />
      <textarea
        className="border p-1 rounded"
        placeholder="Job Details"
        value={exp.details}
        onChange={e => setExp({ ...exp, details: e.target.value })}
      />
      <div className="flex gap-2 items-center">
        <label>Start:</label>
        <select
          value={exp.startMonth}
          onChange={e => setExp({ ...exp, startMonth: e.target.value })}
        >
          <option value="">MM</option>
          {months.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select
          value={exp.startYear}
          onChange={e => setExp({ ...exp, startYear: e.target.value })}
        >
          <option value="">YYYY</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <label>End:</label>
        <select
          value={exp.endMonth}
          onChange={e => setExp({ ...exp, endMonth: e.target.value })}
        >
          <option value="">MM</option>
          {months.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select
          value={exp.endYear}
          onChange={e => setExp({ ...exp, endYear: e.target.value })}
        >
          <option value="">YYYY</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <button
        type="button"
        className="bg-purple-500 text-white px-2 py-1 rounded self-start"
        onClick={handleAddExperience}
      >
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceInput;