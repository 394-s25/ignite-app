import React, { useState } from 'react';

const CompanyProfileCard = ({ company, onRemove }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => setLiked(true);
  const handleDecline = () => onRemove(company);

  return (
    <div className="flex flex-col bg-purple-100 rounded-xl p-6 max-w-2xl mx-auto shadow-md hover:shadow-xl transform transition duration-300">
      {/* Top: Logo + Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={company.logo || 'https://via.placeholder.com/80'}
          alt={`${company.companyName} logo`}
          className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-purple-800">{company.companyName}</h2>
          <p className="text-sm text-purple-700">Industry: {company.industry}</p>
          <p className="text-sm text-purple-700">Location: {company.location}</p>
        </div>
      </div>

      {/* Bottom: Buttons */}
      <div className="flex justify-end gap-3">
        {liked ? (
          <button className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
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

export default CompanyProfileCard;
