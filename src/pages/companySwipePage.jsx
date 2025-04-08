import React, { useState } from "react";
import StudentCard from "../components/studentCard";
import peppa from "/peppa.jpg";
import ActionButtons from "../components/actionButtons";
import StudentHeader from "../components/studentHeader";

const CompanySwipePage = () => {
  const [students, setStudents] = useState([
    {
      studentName: "Peppa Pig",
      studentPhoto: peppa,
      studentMajor: "Computer Science",
      studentBio:
        "Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate!",
      lookingFor:
        "Passionate about building tech that makes people smile. Previously worked on a chatbot for kids. Looking to join a startup focused on education, health, or social good! Passionate about building tech that makes people smile. Previously worked on a chatbot for kids. Looking to join a startup focused on education, health, or social good! Passionate about building tech that makes people smile. Previously worked on a chatbot for kids. Looking to join a startup focused on education, health, or social good! Passionate about building tech that makes people smile. Previously worked on a chatbot for kids. Looking to join a startup focused on education, health, or social good! Passionate about building tech that makes people smile. Previously worked on a chatbot for kids. Looking to join a startup focused on education, health, or social good! Passionate about building tech that makes people smile. Previously worked on a chatbot for kids. Looking to join a startup focused on education, health, or social good! Passionate about building tech that makes people smile. Previously worked on a chatbot for kids. Looking to join a startup focused on education, health, or social good!",
      studentSkills: ["Python", "Communication", "NLP Experience", "Teamwork"],
      contactInfo: "peppapig@u.northwestern.edu",
    },
    {
      studentName: "George Curious",
      studentMajor: "Cognitive Science & CS Minor",
      studentBio:
        "Always exploring how humans think and how tech can support them. I'm obsessed with design that makes people feel heard.",
      lookingFor:
        "Looking to join a mission-driven team focused on mental health, accessibility, or AI x HCI research.",
      studentSkills: ["Figma", "React", "User Research", "Empathy"],
      contactInfo: "georgecurious@u.northwestern.edu",
    },
    {
      studentName: "Lola Loud",
      studentMajor: "Communication Studies",
      studentBio:
        "A storyteller at heart, I'm passionate about branding, digital media, and making complex ideas accessible.",
      lookingFor:
        "Hoping to contribute to a startup that values inclusivity and strong narratives. Interested in marketing, UI writing, and creative strategy.",
      studentSkills: [
        "Content Strategy",
        "Adobe Suite",
        "Team Collaboration",
        "Creativity",
      ],
      contactInfo: "lolaloud@u.northwestern.edu",
    },
    {
      studentName: "Max Velocity",
      studentMajor: "Mechanical Engineering",
      studentBio:
        "Builder. Tinkerer. Team player. I've prototyped everything from electric skateboards to solar-powered water purifiers.",
      lookingFor:
        "Excited to join a hardware or cleantech startup. Let's build something sustainable and scrappy together!",
      studentSkills: ["CAD", "Arduino", "3D Printing", "Problem-Solving"],
      contactInfo: "maxv@u.northwestern.edu",
    },
    {
      studentName: "Sasha Green",
      studentMajor: "Environmental Science & Data Science",
      studentBio:
        "My mission: use data to protect the planet. I've worked on climate dashboards and enjoy translating numbers into action.",
      lookingFor:
        "Looking to support startups in climate tech, sustainable fashion, or anything eco-focused. Let's make impact real.",
      studentSkills: ["Python", "SQL", "Data Viz", "Climate Research"],
      contactInfo: "sashagreen@u.northwestern.edu",
    },
  ]);

  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);

  const handleAccept = () => {
    if (students.length > 0) {
      const updatedStudents = students.slice(1);
      setAccepted([...accepted, students[0]]);
      setStudents(updatedStudents);
    }
  };

  const handleReject = () => {
    if (students.length > 0) {
      const updatedStudents = students.slice(1);
      setRejected([...rejected, students[0]]);
      setStudents(updatedStudents);
    }
  };

  console.log(students);
  console.log(rejected);
  console.log(accepted);

  return (
    <div className="w-full h-screen max-h-screen flex flex-col md:flex-row bg-gray-50 justify-center md:items-right items-center overflow-hidden">
      {students.length > 0 ? (
        <div className="md:mx-20 xl:mx-32 h-full flex flex-col flex-grow overflow-hidden">
          <StudentHeader
            studentName={students[0].studentName}
            studentMajor={students[0].studentMajor}
            studentPhoto={students[0].studentPhoto}
          />
          <div className="flex-grow overflow-hidden">
            <StudentCard
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
