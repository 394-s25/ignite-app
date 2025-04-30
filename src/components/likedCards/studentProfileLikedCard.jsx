import React, { useState } from "react";
import { addVisitedStudent } from "../../db/firebaseService";
import { useAuth } from "../../contexts/authContext";
import { ref, get, set } from "firebase/database";
import { db } from "../../db/firebaseConfig";
import { removeStudentLike } from "../../db/firebaseService";
import Confetti from "react-confetti";
import MatchedModal from "../matchedModal";
import { likeStudent } from "../../db/matchService";

const StudentProfileLikedCard = ({ person, onRemove, showActions = true }) => {
  const [liked, setLiked] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const companyId = useAuth().authUser?.uid;

  const handleLike = async () => {
    try {
      await addVisitedStudent(companyId, person.id, true);
      setModalVisibility(true);
      // setLiked(true);
      await likeStudent(person.id, companyId);
    } catch (error) {
      console.error("Error adding to visited list:", error);
    }
  };

  const handleDecline = async () => {
    try {
      await addVisitedStudent(companyId, person.id, false);
      await removeStudentLike(companyId, person.id);
      onRemove?.(person); // optional chaining to avoid error if not passed
    } catch (error) {
      console.error("Error processing decline:", error);
    }
  };

  const handleCloseModal = () => setModalVisibility(false);
  const handleUnmatch = () => {
    setModalVisibility(false);
    handleDecline();
  }

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
      <div className="flex justify-end gap-3 mt-4">
        {liked ? (
          <a
            className="px-6 py-2 text-xl rounded-2xl bg-purple-700 text-white active:bg-purple-700 hover:bg-purple-400 font-semibold"
            href={person.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Schedule Interview
          </a>
        ) : (
          <>
            <button
              onClick={handleLike}
              className="px-4 py-1 rounded-2xl bg-green-500 text-white hover:bg-green-600 transition"
            >
              Like
            </button>
            <button
              onClick={handleDecline}
              className="px-4 py-1 rounded-2xl bg-red-500 text-white hover:bg-red-600 transition"
            >
              Decline
            </button>
          </>
        )}
        </div>

        {modalVisibility && (
          <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <Confetti className="z-40" confettiSource={{x: window.innerWidth / 2, y: window.innerHeight / 6, w: 0, h:0}} width={window.innerWidth} height={window.innerHeight} numberOfPieces={30} recycle={false} tweenDuration = {200} gravity = {0.25}/>
              
              <MatchedModal type="student" company={null} position="job placeholder" skills={null} person={person} onClose={ handleCloseModal } onUnmatch={ handleUnmatch }/>
            </div>
          </>
        )}
      </div>
  );
};

export default StudentProfileLikedCard;
