import React, { useState, useEffect } from "react";
import CompanySwipeCard from "../components/companySwipeCard";
import logo from "/AlpimeHealth.png";
import { getAllJobs, readCompanyDataByCompanyId } from "../db/firebaseService";
const StudentSwipePage = () => {
  const [companies, setCompanies] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);

  const fetchJobs = async() => {
    const jobs = await getAllJobs();
    const mappedJobs = await Promise.all(
      jobs.map(async (job) => {
        const company = await readCompanyDataByCompanyId(job.companyId);
  
        return {
          companyName: company?.name || "Unknown Company",
          companyLogo: company?.logoURL || logo,
          companyDescription: company?.introduction || "",
          roleName: job.title || "Open Role",
          roleDescription: job.description || "",
          roleSkills: job.skills || [],
          contactInfo: company?.email || "",
        };
      })
    );
    
    setCompanies(mappedJobs);
  }
  useEffect(() => {
    fetchJobs();
  }, []);

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
