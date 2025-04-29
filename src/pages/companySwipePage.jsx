import React, { useState, useEffect } from "react";
import StudentSwipeCard from "../components/swipeCards/studentSwipeCard";
import peppa from "/peppa.jpg";
import ActionButtons from "../components/swipeCards/actionButtons";
import StudentHeader from "../components/swipeCards/studentHeader";
import { likeStudent } from "../db/matchService";
import { auth, db } from "../db/firebaseConfig";
import { readUserDataByUserId } from "../db/firebaseService";
import { listenToStudents } from "../db/firebaseService";
import { seenCompany, seenStudent } from "../db/seenService";

const CompanySwipePage = () => {
  const [students, setStudents] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listenToStudents((students) => {
      setStudents(students);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentCompany(user);
    });

    return () => unsubscribe();
  }, []);

  const handleAccept = async () => {
    if (students.length > 0 && currentCompany) {
      setIsLoading(true);

      try {
        const currentStudent = students[0];

        // Update likes in firebase
        await likeStudent(currentStudent.studentId, currentCompany.uid);

        // Swiping page mechanism
        const updatedStudents = students.slice(1);
        setAccepted([...accepted, currentStudent]);
        setStudents(updatedStudents);
        await seenStudent(currentStudent.studentId, currentCompany.uid);
      } catch (error) {
        console.error("Error liking student:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReject = async () => {
    if (students.length > 0) {
      const updatedStudents = students.slice(1);
      setRejected([...rejected, students[0]]);
      setStudents(updatedStudents);
      await seenStudent(students[0].studentId, currentCompany.uid);
    }
  };

  console.log(students);
  console.log(rejected);
  console.log(accepted);

  return (
    <div className="w-full h-screen max-h-screen flex flex-col md:flex-row bg-gray-50 justify-center md:items-right items-center overflow-hidden">
      {students.length > 0 ? (
        <div className="md:mx-20 xl:mx-32 h-full text-left flex flex-col flex-grow overflow-hidden">
          <StudentHeader
            studentName={students[0].name}
            studentMajor={students[0].major}
            // studentPhoto={students[0].studentPhoto}
          />
          <div className="flex-grow overflow-hidden">
            <StudentSwipeCard
              key={students[0].studentId}
              studentBio={students[0].bio}
              // lookingFor={students[0].lookingFor}
              studentSkills={students[0].skills}
              // contactInfo={students[0].contactInfo}
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
            No more students to review
          </h2>
          <p className="text-gray-700">
            Check your "Liked By" page to see who wants to work with you!
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanySwipePage;
