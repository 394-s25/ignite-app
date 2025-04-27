import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useProfile } from "../contexts/profileContext";
import CompanySwipeCard from "../components/swipeCards/companySwipeCard";
import {
  listenToAllJobs,
  readCompanyDataByCompanyId,
} from "../db/firebaseService";
import ActionButtons from "../components/swipeCards/actionButtons";
import CompanyHeader from "../components/swipeCards/companyHeader";
import peppa from "/peppa.jpg";
import NavBar from "../components/NavBar";

const StudentSwipePage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const { profile, profileType } = useProfile();
  const [companies, setCompanies] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);

  useEffect(() => {
    // Redirect if not logged in or not an applicant
    if (!authUser) {
      navigate("/");
      return;
    }
    if (profileType !== "applicant") {
      navigate("/companyswipe");
      return;
    }

    // Fetch companies and jobs
    const unsubscribe = listenToAllJobs(async (jobs) => {
      const mappedJobs = await Promise.all(
        jobs.map(async (job) => {
          const company = await readCompanyDataByCompanyId(job.companyId);
          return {
            id: job.id,
            companyId: job.companyId,
            companyName: company?.name || "Unknown Company",
            companyLogo: company?.logoURL || peppa,
            companyDescription: company?.about || "",
            roleName: job.title || "Open Role",
            roleDescription: job.description || "",
            roleSkills: job.skills || [],
            contactInfo: job.contacts || "",
          };
        })
      );
      setCompanies(mappedJobs);
    });

    return () => unsubscribe();
  }, [authUser, profileType, navigate]);

  const handleAccept = async () => {
    if (companies.length > 0) {
      const currentCompany = companies[0];
      try {
        // TODO: Add like to database
        // await addLike(authUser.uid, currentCompany.companyId, currentCompany.id);
        setAccepted([...accepted, currentCompany]);
        setCompanies(companies.slice(1));
      } catch (error) {
        console.error("Error liking company:", error);
      }
    }
  };

  const handleReject = () => {
    if (companies.length > 0) {
      setRejected([...rejected, companies[0]]);
      setCompanies(companies.slice(1));
    }
  };

  if (!authUser || profileType !== "applicant") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {companies.length > 0 ? (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <CompanyHeader
                companyName={companies[0].companyName}
                roleName={companies[0].roleName}
              />
              <div className="p-6">
                <CompanySwipeCard
                  key={companies[0].id}
                  companyDescription={companies[0].companyDescription}
                  roleDescription={companies[0].roleDescription}
                  roleSkills={companies[0].roleSkills}
                  contactInfo={companies[0].contactInfo}
                />
              </div>
              <div className="px-6 py-4 bg-gray-50">
                <ActionButtons
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              </div>
            </div>
          ) : (
            <div className="text-center bg-white shadow rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No more companies to review
              </h2>
              <p className="text-gray-600">
                Check your "Liked By" page to see who wants to work with you!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentSwipePage;
