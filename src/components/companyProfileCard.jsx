import React from 'react';

const CompanyProfileCard = ({ company }) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-lg p-4 mb-6 max-w-2xl mx-auto">
      {/* Circular Company Logo */}
      <img
        src={company.logo || 'https://via.placeholder.com/80'}
        alt={`${company.companyName} logo`}
        className="w-20 h-20 rounded-full object-cover"
      />

      {/* Info Section */}
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-black">{company.companyName}</h2>
        <p className="text-sm text-gray-500">Industry: {company.industry}</p>
        <p className="text-sm text-gray-600">Location: {company.location}</p>
      </div>
    </div>
  );
};

export default CompanyProfileCard;
