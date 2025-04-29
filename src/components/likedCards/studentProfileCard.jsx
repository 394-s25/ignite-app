import React, { useState } from "react";
import { addVisitedStudent } from "../../db/firebaseService";
import { useAuth } from "../../contexts/authContext";

const StudentProfileCard = ({ person, onRemove }) => {
  const [liked, setLiked] = useState(false);
  const companyId = useAuth().authUser?.uid;
  console.log("Company ID:", companyId);
  
  const handleLike = async () => {
    try {
      await addVisitedStudent(companyId, person.id, true);
      setLiked(true);
    } catch (error) {
      console.error("Error adding to visited list:", error);
    }
  };

  const handleDecline = async () => {
    try {
      await addVisitedStudent(companyId, person.id, false);
      onRemove(person); // Remove the student card
    } catch (error) {
      console.error("Error adding to visited list:", error);
    }
  };

  return (
    <div className="flex flex-col bg-purple-100 rounded-xl p-6 max-w-2xl mx-auto shadow-md hover:shadow-xl transform transition duration-300">
      {/* Top: Profile Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={person.image || "https://via.placeholder.com/80"}
          alt={person.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-purple-800">{person.name}</h2>
          <p className="text-sm text-purple-700">
            Grad Year: {person.gradYear}
          </p>
          <p className="text-sm text-purple-700">Major: {person.major}</p>
        </div>
      </div>

      {/* Bottom: Buttons */}
      <div className="flex justify-end gap-3">
        {liked ? (
          <a
            className="px-6 py-2 text-xl rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            href="https://calendly.com/sophiafresquez2026-u/30min?month=2025-04"
            target="_blank"
          >
            Schedule Interview
          </a>
        ) : (
          <>
            <button
              onClick={handleLike}
              className="px-4 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              Like
            </button>
            <button
              onClick={handleDecline}
              className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Decline
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentProfileCard;
