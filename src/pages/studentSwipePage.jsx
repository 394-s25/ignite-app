import React, { useState, useEffect } from "react";
import CompanySwipeCard from "../components/swipeCards/companySwipeCard";
import {
  listenToAllJobs,
  readCompanyDataByCompanyId,
  listenToCompanies,
} from "../db/firebaseService";
import { likeCompany } from "../db/matchService";
import ActionButtons from "../components/swipeCards/actionButtons";
import CompanyHeader from "../components/swipeCards/companyHeader";
import peppa from "/peppa.jpg";
import NavBar from "../components/NavBar";
import { auth } from "../db/firebaseConfig";

const StudentSwipePage = () => {
  const [companies, setCompanies] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    listenToCompanies((companies) => {
      setCompanies(companies);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   listenToAllJobs(async (jobs) => {
  //     const mappedJobs = await Promise.all(
  //       jobs.map(async (job) => {
  //         const company = await readCompanyDataByCompanyId(job.companyId);
  //         return {
  //           companyName: company?.name || "Unknown Company",
  //           companyLogo: company?.logoURL || peppa,
  //           companyDescription: company?.introduction || "",
  //           roleName: job.title || "Open Role",
  //           roleDescription: job.description || "",
  //           roleSkills: job.skills || [],
  //           contactInfo: job.contacts || "",
  //         };
  //       })
  //     );
  //     setCompanies(mappedJobs);
  //   });
  // }, []);

  const handleAccept = async () => {
    if (companies.length > 0 && currentUser) {
      setIsLoading(true);

      try {
        const currentCompany = companies[0];

        // Update likes in firebase
        await likeCompany(currentUser.uid, currentCompany.companyId);

        // Swiping page mechanism
        const updatedCompanies = companies.slice(1);
        setAccepted([...accepted, currentCompany]);
        setCompanies(updatedCompanies);
      } catch (error) {
        console.error("Error liking company:", error);
      } finally {
        setIsLoading(false);
      }
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
    <div>
      <NavBar></NavBar>
      <div className="w-full h-screen max-h-screen flex flex-col md:flex-row bg-gray-50 justify-center md:items-right items-center overflow-hidden">
        {companies.length > 0 ? (
          <div className="w-full md:mx-20 xl:mx-32 h-full flex flex-col text-left flex-grow overflow-hidden">
            <CompanyHeader
              companyName={companies[0].name}
              // roleName={companies[0].roleName}
            />
            <div className="flex-grow overflow-hidden">
              <CompanySwipeCard
                key={companies[0].uid}
                companyDescription={companies[0].about}
                // roleDescription={companies[0].roleDescription}
                // roleSkills={companies[0].roleSkills}
                // contactInfo={companies[0].contactInfo}
              />
            </div>
            <ActionButtons
              onAccept={handleAccept}
              onReject={handleReject}
              isLoading={isLoading}
            />
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
    </div>
  );
};

export default StudentSwipePage;
