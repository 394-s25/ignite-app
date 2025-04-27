import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useProfile } from "../contexts/profileContext";
import StudentSwipeCard from "../components/swipeCards/studentSwipeCard";
import ActionButtons from "../components/swipeCards/actionButtons";
import StudentHeader from "../components/swipeCards/studentHeader";
import NavBar from "../components/NavBar";
import { getDatabase, ref, get, set } from "firebase/database";
import { db } from "../db/firebaseConfig";
import { mapDescriptors, mapSkills } from "../db/mappingIds";

const StudentSwipePage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const { profile, profileType } = useProfile();
  const [companies, setCompanies] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);

  useEffect(() => {
    // Redirect if not logged in or not a student
    if (!authUser) {
      navigate("/");
      return;
    }
    if (profileType !== "student") {
      navigate("/studentswipe");
      return;
    }

    // Fetch companies from Firebase
    const fetchCompanies = async () => {
      try {
        const companiesRef = ref(db, "companies");
        const snapshot = await get(companiesRef);

        if (snapshot.exists()) {
          const companiesData = [];
          console.log(snapshot.val());

          // Use Promise.all to wait for all async operations to complete
          const companyPromises = Object.entries(snapshot.val()).map(
            async ([key, company]) => {
              const mappedSkills = await mapSkills({
                skills: company.skills || [],
              });

              const mappedDescriptors = await mapDescriptors({
                descriptors: company.descriptors || [],
              });

              return {
                id: key,
                companyName: company.name || "Anonymous",
                companyBio: company.bio || "",
                companySkills: mappedSkills || [],
                companyDescriptors: mappedDescriptors || [],
                contactInfo: company.email || "",
              };
            }
          );

          const resolvedCompanies = await Promise.all(companyPromises);
          setCompanies(resolvedCompanies);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, [authUser, profileType, navigate]);

  const handleAccept = async () => {
    if (companies.length > 0) {
      const currentCompanies = companies[0];
      try {
        setAccepted([...accepted, currentCompanies]);
        setCompanies(companies.slice(1));
      } catch (error) {
        console.error("Error liking company:", error);
      }
    }
  };

  console.log(companies);

  const handleReject = async () => {
    if (companies.length > 0) {
      const currentCompany = companies[0];
      try {
        setRejected([...rejected, currentCompany]);
        setCompanies(companies.slice(1));
      } catch (error) {
        console.error("Error rejecting company:", error);
      }
    }
  };

  return (
    <div>
      <NavBar />
      {companies.length > 0 ? (
        <div className="md:mx-20 xl:mx-32 h-full text-left flex flex-col flex-grow overflow-hidden">
          <StudentHeader studentName={companies[0].companyName} />
          <div className="flex-grow overflow-hidden">
            <StudentSwipeCard
              key={companies[0].id}
              studentBio={companies[0].companyBio}
              lookingFor={companies[0].lookingFor}
              studentSkills={companies[0].companySkills}
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
