import React, { useState, useEffect } from "react";
import CompanyCard from "../components/companyCard";
import logo from "/AlpimeHealth.png";
import { getAllJobs, readCompanyDataByCompanyId } from "../db/firebaseService";
import ActionButtons from "../components/actionButtons";
import CompanyHeader from "../components/companyHeader";

import peppa from "/peppa.jpg";

const StudentSwipePage = () => {
  const [companies, setCompanies] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);

  const fetchJobs = async () => {
    const jobs = await getAllJobs();
    const mappedJobs = await Promise.all(
      jobs.map(async (job) => {
        const company = await readCompanyDataByCompanyId(job.companyId);

        return {
          companyName: company?.name || "Unknown Company",
          companyLogo: company?.logoURL || peppa,
          companyDescription: company?.introduction || "",
          roleName: job.title || "Open Role",
          roleDescription: job.description || "",
          roleSkills: job.skills || [],
          contactInfo: job.contacts || "",
        };
      })
    );

    setCompanies(mappedJobs);
  };
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
    <div className="w-full h-screen max-h-screen flex flex-col md:flex-row bg-gray-50 justify-center md:items-right items-center overflow-hidden">
      {companies.length > 0 ? (
        <div className="md:mx-20 xl:mx-32 h-full flex flex-col flex-grow overflow-hidden">
          <CompanyHeader
            companyName={companies[0].companyName}
            roleName={companies[0].roleName}
          />
          <div className="flex-grow overflow-hidden">
            <CompanyCard
              key={companies[0].id}
              companyDescription={companies[0].companyDescription}
              roleDescription={companies[0].roleDescription}
              roleSkills={companies[0].roleSkills}
              contactInfo={companies[0].contactInfo}
            />
          </div>
          <ActionButtons onAccept={handleAccept} onReject={handleReject} />
        </div>
      ) : (
        <div className="text-center m-8 p-8 w-full">
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
