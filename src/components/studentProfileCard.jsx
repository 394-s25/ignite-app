import React, { useState } from 'react';

const StudentProfileCard = ({ person, onRemove }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(true);
  };

  const handleDecline = () => {
    onRemove(person);
  };

  return (
    <div className="flex flex-col bg-white/80 backdrop-blur-md rounded-xl p-6 max-w-2xl mx-auto shadow-lg transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl">
      {/* Top: Image + Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={person.image || 'https://via.placeholder.com/80'}
          alt={person.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-purple-800">{person.name}</h2>
          <p className="text-sm text-gray-600">Grad Year: {person.gradYear}</p>
          <p className="text-sm text-gray-700">Major: {person.major}</p>
        </div>
      </div>

      {/* Bottom: Buttons */}
      <div className="flex justify-end gap-3">
        {liked ? (
          <button className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition">
            Schedule Interview
          </button>
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
