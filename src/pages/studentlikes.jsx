import React from 'react';
import CompanyProfileCard from "../components/companyProfileCard"

const companies = [
    {
      companyName: "Stripe",
      industry: "Payments Infrastructure",
      location: "San Francisco, CA",
      logo: "https://logo.clearbit.com/stripe.com"
    },
    {
      companyName: "Spotify",
      industry: "Music Streaming",
      location: "Stockholm, Sweden",
      logo: "https://logo.clearbit.com/spotify.com"
    },
    {
      companyName: "Netflix",
      industry: "Entertainment",
      location: "Los Gatos, CA",
      logo: "https://logo.clearbit.com/netflix.com"
    },
    {
      companyName: "Slack Technologies",
      industry: "Team Collaboration",
      location: "San Francisco, CA",
      logo: "https://logo.clearbit.com/slack.com"
    },
    {
      companyName: "Dropbox",
      industry: "Cloud Storage",
      location: "San Francisco, CA",
      logo: "https://logo.clearbit.com/dropbox.com"
    },
    {
      companyName: "Shopify",
      industry: "E-commerce",
      location: "Ottawa, Canada",
      logo: "https://logo.clearbit.com/shopify.com"
    },
    {
      companyName: "Airbnb",
      industry: "Travel & Hospitality",
      location: "San Francisco, CA",
      logo: "https://logo.clearbit.com/airbnb.com"
    }
  ];

const StudentLikes = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Companies That Liked You</h1>
      <div className="max-w-3xl mx-auto">
        {companies.map((company, index) => (
          <CompanyProfileCard key={index} company={company} />
        ))}
      </div>
    </div>
  );
};

export default StudentLikes;
