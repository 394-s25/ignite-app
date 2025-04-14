import React, { useState } from "react";
import CompanyProfileCard from "../components/companyProfileCard";

const initialCompanies = [
  {
    companyName: "Stripe",
    industry: "Payments Infrastructure",
    location: "San Francisco, CA",
    logo: "https://logo.clearbit.com/stripe.com",
  },
  {
    companyName: "Spotify",
    industry: "Music Streaming",
    location: "Stockholm, Sweden",
    logo: "https://logo.clearbit.com/spotify.com",
  },
  {
    companyName: "Netflix",
    industry: "Entertainment",
    location: "Los Gatos, CA",
    logo: "https://logo.clearbit.com/netflix.com",
  },
  {
    companyName: "Slack Technologies",
    industry: "Team Collaboration",
    location: "San Francisco, CA",
    logo: "https://logo.clearbit.com/slack.com",
  },
  {
    companyName: "Dropbox",
    industry: "Cloud Storage",
    location: "San Francisco, CA",
    logo: "https://logo.clearbit.com/dropbox.com",
  },
  {
    companyName: "Shopify",
    industry: "E-commerce",
    location: "Ottawa, Canada",
    logo: "https://logo.clearbit.com/shopify.com",
  },
  {
    companyName: "Airbnb",
    industry: "Travel & Hospitality",
    location: "San Francisco, CA",
    logo: "https://logo.clearbit.com/airbnb.com",
  },
];

const StudentLikes = () => {
  const [companies, setCompanies] = useState(initialCompanies);

  const handleRemoveCompany = (companyToRemove) => {
    setCompanies((prev) =>
      prev.filter(
        (company) => company.companyName !== companyToRemove.companyName
      )
    );
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-10 drop-shadow-md">
        Companies That Liked You
      </h1>
      <div className="space-y-6">
        {companies.map((company, index) => (
          <CompanyProfileCard
            key={index}
            company={company}
            onRemove={handleRemoveCompany}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentLikes;
