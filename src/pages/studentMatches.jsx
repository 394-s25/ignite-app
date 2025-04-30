import React, { useState, useEffect } from "react";
import CompanyProfileMatchedCard from "../components/matchedCards/companyProfileMatchedCard";
import NavBar from "../components/NavBar";
import { auth } from "../db/firebaseConfig";
import { fetchStudentMatches } from "../db/matchService";

const StudentMatches = () => {
  const [companies, setCompanies] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Get current user ID from Firebase Authentication

        if (!currentUser) {
          setIsLoading(false);
          return;
        }

        const studentId = currentUser.uid;
        const matchesData = await fetchStudentMatches(studentId);

        const formattedCompanies = matchesData.map((company) => ({
          companyName: company.name || "Unknown Company",
          industry: company.industry || "N/A",
          location: company.location || "N/A",
          logo: company.logo || "https://via.placeholder.com/150",
          ...company,
        }));

        setCompanies(formattedCompanies);
      } catch (err) {
        console.error("Failed to load matches:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadMatches();
  }, [currentUser]);

  return (
    <div>
      <NavBar></NavBar>
      <div className="min-h-screen bg-white py-10 px-4">
        <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-10 drop-shadow-md">
          Matches
        </h1>

        {isLoading && (
          <div className="text-center py-10">
            <p className="text-gray-600">Loading your matches...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}

        {!isLoading && companies && companies.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600">No company matches found yet.</p>
          </div>
        )}

        <div className="space-y-6">
          {companies &&
            companies.map((company, index) => (
              <CompanyProfileMatchedCard key={index} company={company} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default StudentMatches;
