import React from 'react';

const ProfileCard = ({ person }) => {
  return (
    <div className="flex bg-white shadow-md rounded-lg p-4 mb-4 items-start gap-4">
      {/* Profile Picture */}
      <img
        src={person.image || 'https://via.placeholder.com/80'}
        alt={person.name}
        className="w-20 h-20 rounded-full object-cover"
      />
      {/* Info Section */}
      <div>
      <h2 className="text-xl font-bold">{person.name}</h2>
      <p className="text-sm text-gray-600">
        {person.university} · {person.gradYear}
      </p>
      <p className="text-sm text-gray-700">{person.major}</p>
      </div>
    </div>
  );
};

export default ProfileCard;