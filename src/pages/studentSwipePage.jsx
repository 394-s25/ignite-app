import React, { useState, useEffect } from "react";
import CompanySwipeCard from "../components/companySwipeCard";
import logo from "/AlpimeHealth.png";

const StudentSwipePage = () => {
  // List of all companies
  const [companies, setCompanies] = useState([
    {
      id: 1,
      companyName: "Alpime Health",
      companyLogo: logo,
      companyDescription:
        "Alpime Health offers a reliable, secure, and efficient electronic medical record system, following a three-pronged objective of data storage for healthcare administrators, data representation for doctors and patients, and data analytics for hospitals starting in Côte d'Ivoire and expanding to neighboring West African countries.",
      roleName: "ML Developer",
      roleDescription:
        "We're looking for ML Developers who have hands-on experience with natural language processing, especially in areas like context-aware validation and disambiguation. If you've worked with computer vision technologies such as optical character recognition (OCR) or form parsing, that's a big plus!",
      roleSkills: ["Python", "Communication", "NLP Experience", "Teamwork"],
      contactInfo:
        "tahiragrewal2026@u.northwestern.edu, isaacmeite2026@u.northwestern.edu, admin@alpimehealth.com",
    },
    {
      id: 2,
      companyName: "123",
      companyLogo: logo,
      companyDescription: "123123123123123123123123123123",
      roleName: "ML Developer",
      roleDescription: "123123123123123123123123123123",
      roleSkills: ["Python", "Communication", "NLP Experience", "Teamwork"],
      contactInfo:
        "tahiragrewal2026@u.northwestern.edu, isaacmeite2026@u.northwestern.edu, admin@alpimehealth.com",
    },
    {
      id: 3,
      companyName: "123",
      companyLogo: logo,
      companyDescription: "123123123123123123123123123123",
      roleName: "ahhhhhhhhh",
      roleDescription: "123123123123123123123123123123",
      roleSkills: ["Python", "Communication", "NLP Experience", "Teamwork"],
      contactInfo:
        "tahiragrewal2026@u.northwestern.edu, isaacmeite2026@u.northwestern.edu, admin@alpimehealth.com",
    },
    {
      id: 4,
      companyName: "12fdsfdsdfsd3",
      companyLogo: logo,
      companyDescription: "123fdsfsdfdsfdsfsf123123123123123123123123123",
      roleName: "ahhhdsfdsfdsfdsfdsfsfhhhhhh",
      roleDescription: "1231231dsfsdfsd23123123123123123123123",
      roleSkills: ["Python", "Communication", "NLP Experience", "Teamwork"],
      contactInfo:
        "tahiragrewal2026@u.northwestern.edu, isaacmeite2026@u.northwestern.edu, admin@alpimehealth.com",
    },
  ]);

  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);

  const handleAccept = () => {
    if (companies.length > 0) {
      const updatedCompanies = companies.slice(1);
      setAccepted([...accepted, companies[0]]);
      setCompanies(updatedCompanies);
    }
  };

  const handleReject = () => {
    if (companies.length > 0) {
      const updatedCompanies = companies.slice(1);
      setRejected([...rejected, companies[0]]);
      setCompanies(updatedCompanies);
    }
  };

  console.log(companies);
  console.log(rejected);
  console.log(accepted);

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col gap-10 justify-center items-center py-8">
      {companies.length > 0 ? (
        <CompanySwipeCard
          key={companies[0].id}
          companyName={companies[0].companyName}
          companyLogo={companies[0].companyLogo}
          companyDescription={companies[0].companyDescription}
          roleName={companies[0].roleName}
          roleDescription={companies[0].roleDescription}
          roleSkills={companies[0].roleSkills}
          contactInfo={companies[0].contactInfo}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      ) : (
        <div className="text-center m-8 p-8 bg-white">
          <h2 className="text-2xl font-bold mb-4">
            No more companies to review
          </h2>
          <p className="text-gray-700">
            Check your "Liked By" page to see who wants to work with you!
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentSwipePage;
