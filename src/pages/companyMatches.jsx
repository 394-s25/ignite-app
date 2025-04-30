import React, { useState, useEffect } from "react";
import StudentProfileMatchedCard from "../components/matchedCards/studentProfileMatchedCard";
import NavBar from "../components/NavBar";
import { auth } from "../db/firebaseConfig";
import { fetchCompanyMatches } from "../db/matchService";

const CompanyMatches = () => {
  const [students, setStudents] = useState(null);
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

        if (!currentUser) {
          setIsLoading(false);
          return;
        }

        const companyId = currentUser.uid;
        const matchesData = await fetchCompanyMatches(companyId);
        console.log(matchesData);

        const formattedStudents = matchesData.map((student) => ({
          name: student.name || "Unknown Student",
          gradYear: student.gradYear || "N/A",
          major: student.major || "N/A",
          image:
            student.profilePicture ||
            "https://randomuser.me/api/portraits/lego/1.jpg",
          ...student,
        }));

        setStudents(formattedStudents);
      } catch (err) {
        console.error("Failed to load matches:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadMatches();
  }, [currentUser]);

  const handleRemoveStudent = (studentToRemove) => {
    setStudents((prev) =>
      prev.filter((student) => student.name !== studentToRemove.name)
    );
  };

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

        {!isLoading && students && students.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600">No student matches found yet.</p>
          </div>
        )}

        <div className="space-y-6">
          {students &&
            students.map((student, index) => (
              <StudentProfileMatchedCard key={index} person={student} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyMatches;
