import React, { useState, useEffect } from "react";
import CompanyProfileCard from "../components/likedCards/companyProfileCard";
import NavBar from "../components/NavBar";
import { db } from "../db/firebaseConfig"; 
import { ref, get } from "firebase/database";

const StudentLikes = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesRef = ref(db, "companies");
        const snapshot = await get(companiesRef);

        if (snapshot.exists()) {
          const companiesData = snapshot.val();

          const companiesList = Object.entries(companiesData).map(([companyId, company]) => ({
            id: companyId,
            companyName: company.name || "Unknown Company",
            bio: company.bio || "No bio available",
            skills: company.skills || [], 
            descriptors: company.descriptors || {},
            logo: "https://logo.clearbit.com/example.com", 
          }));

          setCompanies(companiesList);
        } else {
          console.log("No companies found.");
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleRemoveCompany = (companyToRemove) => {
    setCompanies((prev) =>
      prev.filter((company) => company.id !== companyToRemove.id)
    );
  };

  if (loading) {
    return <div className="text-center mt-20">Loading companies...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-white py-10 px-4">
        <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-10 drop-shadow-md">
          Companies That Liked Me
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
    </div>
  );
};

export default StudentLikes;
