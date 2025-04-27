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
import { mapSkills } from "../db/mappingIds";

const CompanySwipePage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const { profile, profileType } = useProfile();
  const [students, setStudents] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);

  useEffect(() => {
    // Redirect if not logged in or not a company
    // if (!authUser) {
    //   navigate("/");
    //   return;
    // }

    // Fetch students from Firebase
    const fetchStudents = async () => {
      try {
        const studentsRef = ref(db, "users");
        const snapshot = await get(studentsRef);

        if (snapshot.exists()) {
          const studentsData = [];
          console.log(snapshot.val());

          // Convert object to array and filter for students
          Object.entries(snapshot.val()).forEach(async ([key, student]) => {
            // Map the skills before adding to studentsData
            const mappedSkills = await mapSkills({
              skills: student.skills || [],
            });
            studentsData.push({
              id: key,
              studentName: student.name || "Anonymous",
              studentMajor: student.major || "Undeclared",
              studentBio: student.bio || "",
              studentSkills: mappedSkills || [],
              contactInfo: student.email || "",
            });
          });
          setStudents(studentsData);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [authUser, profileType, navigate]);

  const handleAccept = async () => {
    if (students.length > 0) {
      const currentStudent = students[0];
      try {
        setAccepted([...accepted, currentStudent]);
        setStudents(students.slice(1));
      } catch (error) {
        console.error("Error liking student:", error);
      }
    }
  };

  const handleReject = async () => {
    if (students.length > 0) {
      const currentStudent = students[0];
      try {
        setRejected([...rejected, currentStudent]);
        setStudents(students.slice(1));
      } catch (error) {
        console.error("Error rejecting student:", error);
      }
    }
  };

  return (
    <div>
      <NavBar />
      {students.length > 0 ? (
        <div className="md:mx-20 xl:mx-32 h-full text-left flex flex-col flex-grow overflow-hidden">
          <StudentHeader
            studentName={students[0].studentName}
            studentMajor={students[0].studentMajor}
            studentPhoto={students[0].studentPhoto}
          />
          <div className="flex-grow overflow-hidden">
            <StudentSwipeCard
              key={students[0].id}
              studentBio={students[0].studentBio}
              lookingFor={students[0].lookingFor}
              studentSkills={students[0].studentSkills}
              contactInfo={students[0].contactInfo}
            />
          </div>
          <ActionButtons onAccept={handleAccept} onReject={handleReject} />
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
