import CompanyCard from "../components/swipeCards/companyCard";
import { useAuth } from "../contexts/authContext";
import { useProfile } from "../contexts/profileContext";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { mapSkills, mapDescriptors } from "../db/mappingIds";
import StudentCard from "../components/swipeCards/studentCard";
import NavBar from "../components/NavBar";
import ActionButtons from "../components/swipeCards/actionButtons";
import { getSortedCompanies, getSortedStudents } from "../db/sorting";

const SwipePage = () => {
  const navigate = useNavigate();
  const { authUser, isLoading, setIsLoading } = useAuth();
  const { profileType } = useProfile();
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);

  const getCompanies = async () => {
    setIsLoading(true);
    try {
      if (!authUser?.uid) return;

      const sortedCompanies = await getSortedCompanies(authUser.uid);
      const companiesPromises = sortedCompanies.map(async (company) => {
        const mappedSkills = await mapSkills({
          skills: company.skills || [],
        });
        const mappedDescriptors = await mapDescriptors({
          descriptors: company.descriptors || [],
        });
        return {
          id: company.id,
          name: company.name || "Unknown Role",
          bio: company.bio || "Empty Bio",
          skills: mappedSkills,
          descriptors: mappedDescriptors,
          role: company.role || "Unknown Role",
          roleDescription: company.roleDescription || "Unknown Role",
          email: company.email || "Unknown Email",
          matchScore: company.matchScore,
        };
      });

      const resolvedCompanies = await Promise.all(companiesPromises);
      setCompanies(resolvedCompanies);
      setIsLoading(false);
    } catch (error) {
      console.error("error getting companies:", error);
      setIsLoading(false);
    }
  };

  const getStudents = async () => {
    try {
      setIsLoading(true);
      if (!authUser?.uid) return;

      const sortedStudents = await getSortedStudents(authUser.uid);
      console.log(sortedStudents);
      const studentsPromises = sortedStudents.map(async (student) => {
        const mappedSkills = await mapSkills({
          skills: student.skills || [],
        });
        return {
          id: student.id,
          name: student.name || "Unknown Student",
          bio: student.bio || "Empty Bio",
          skills: mappedSkills,
          lookingFor: student.lookingFor || "Empty preferences",
          email: student.email || "Unknown email",
          major: student.major || "Unknown major",
          matchScore: student.matchScore,
        };
      });

      const resolvedStudents = await Promise.all(studentsPromises);
      setStudents(resolvedStudents);
      setIsLoading(false);
    } catch (error) {
      console.error("error getting students:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authUser) {
      navigate("/");
      return;
    }
    if (profileType === "student") {
      getCompanies();
    } else {
      getStudents();
    }
  }, [authUser, profileType, navigate]);

  const handleAccept = () => {
    if (profileType === "student" && companies.length > 0) {
      const currentCompany = companies[0];
      console.log(`${currentCompany.id} accepted`); // TODO: SEEN FUNCTIONALITY + LIKES
      setCompanies(companies.slice(1)); // Remove the first company from the array
    } else if (profileType !== "student" && students.length > 0) {
      const currentStudent = students[0];
      console.log(`${currentStudent.id} accepted`);
      setStudents(students.slice(1)); // Remove the first student from the array
    }
  };

  const handleReject = () => {
    if (profileType === "student" && companies.length > 0) {
      const currentCompany = companies[0];
      console.log(`${currentCompany.id} rejected`); // TODO: SEEN FUNCTIONALITY + LIKES
      setCompanies(companies.slice(1)); // Remove the first company from the array
    } else if (profileType !== "student" && students.length > 0) {
      const currentStudent = students[0];
      console.log(`${currentStudent.id} rejected`);
      setStudents(students.slice(1)); // Remove the first student from the array
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  const currentCompany = companies.length > 0 ? companies[0] : null;
  const currentStudent = students.length > 0 ? students[0] : null;

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <NavBar />
      <div className="flex-1 flex items-center justify-center p-2 md:p-4">
        {profileType === "student" ? (
          currentCompany ? (
            <div className="w-full h-full max-h-[85vh] max-w-2xl md:max-w-3xl mx-auto overflow-hidden flex flex-col">
              <div className="flex-1 bg-white overflow-y-auto">
                <CompanyCard
                  key={currentCompany.id}
                  company={currentCompany}
                  matchScore={currentCompany.matchScore}
                />
              </div>
              <div className="bg-white">
                <ActionButtons
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              </div>
            </div>
          ) : (
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <p className="text-lg text-gray-600">
                No more companies to display. Check your Like Me page to see who
                wants to work with you!
              </p>
              <button
                onClick={() => getCompanies()}
                className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors"
              >
                Refresh
              </button>
            </div>
          )
        ) : currentStudent ? (
          <div className="w-full h-full max-h-[85vh] max-w-2xl md:max-w-3xl mx-auto overflow-hidden flex flex-col">
            <div className="flex-1 bg-white overflow-y-auto">
              <StudentCard
                key={currentStudent.id}
                student={currentStudent}
                matchScore={currentStudent.matchScore}
              />
            </div>
            <div className="bg-white">
              <ActionButtons onAccept={handleAccept} onReject={handleReject} />
            </div>
          </div>
        ) : (
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <p className="text-lg text-gray-600">
              No more students to display. Check your Like Me page to see who
              wants to work with you!
            </p>
            <button
              onClick={() => getStudents()}
              className="mt-4 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-md transition-colors"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipePage;
