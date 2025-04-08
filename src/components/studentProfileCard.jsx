import React from 'react';

const ProfileCard = ({ person }) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-lg p-4 mb-6 max-w-2xl mx-auto">
      {/* Profile Picture */}
      <img
        src={person.image || 'https://via.placeholder.com/80'}
        alt={person.name}
        className="w-20 h-20 rounded-full object-cover"
      />

      {/* Info Section */}
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-black">{person.name}</h2>
        <p className="text-sm text-gray-500">Grad Year: {person.gradYear}</p>
        <p className="text-sm text-gray-600">Major: {person.major}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
