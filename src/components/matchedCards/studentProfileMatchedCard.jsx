import React, { useState } from "react";
// import { addVisitedStudent } from "../../db/firebaseService";
import { useAuth } from "../../contexts/authContext";

const StudentProfileCard = ({ person }) => {
  const [liked, setLiked] = useState(false);
  const companyId = useAuth().authUser?.uid;

  return (
    <div className="flex flex-col bg-purple-100 rounded-xl p-6 max-w-2xl mx-auto shadow-md hover:shadow-xl transform transition duration-300">
      {/* Top: Profile Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={"https://randomuser.me/api/portraits/lego/1.jpg"}
          alt={person.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-purple-800">{person.name}</h2>
          <p className="text-sm text-purple-700">
            Major: {person.major || "Undeclared"}
          </p>
          {person.gradYear && (
            <p className="text-sm text-purple-700">
              Grad Year: {person.gradYear}
            </p>
          )}
          {person.email && (
            <p className="text-sm text-purple-700">Email: {person.email}</p>
          )}
          {person.link && (
            <a
              href={
                person.link.startsWith("http")
                  ? person.link
                  : `https://${person.link}`
              }
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-700 underline hover:text-blue-900 transition"
            >
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Optional Bio Section */}
      {person.bio && (
        <div className="text-sm text-gray-700 mb-4">
          <p>{person.bio}</p>
        </div>
      )}

      {/* Bottom: Buttons */}
      <div className="flex justify-end gap-3">
        <a
          className="px-6 py-2 text-xl rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          href={person.link || "https://calendly.com/sophiafresquez2026-u/30min?month=2025-04"}
          target="_blank"
          rel="noreferrer"
        >
          Schedule Interview
        </a>
      </div>
    </div>
  );
};

export default StudentProfileCard;
