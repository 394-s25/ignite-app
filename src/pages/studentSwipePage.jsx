import React, { useState } from "react";
import CompanyCard from "../components/companyCard";
import logo from "/AlpimeHealth.png";
import ActionButtons from "../components/actionButtons";
import CompanyHeader from "../components/companyHeader";

const StudentSwipePage = () => {
  const [companies, setCompanies] = useState([
    {
      id: 0,
      companyName: "Alpime Health",
      companyLogo: logo,
      companyDescription:
        "Alpime Health offers a reliable, secure, and efficient electronic medical record system, following a three-pronged objective of data storage for healthcare administrators, data representation for doctors and patients, and data analytics for hospitals starting in Côte d'Ivoire and expanding to neighboring West African countries. Alpime Health offers a reliable, secure, and efficient electronic medical record system, following a three-pronged objective of data storage for healthcare administrators, data representation for doctors and patients, and data analytics for hospitals starting in Côte d'Ivoire and expanding to neighboring West African countries. Alpime Health offers a reliable, secure, and efficient electronic medical record system, following a three-pronged objective of data storage for healthcare administrators, data representation for doctors and patients, and data analytics for hospitals starting in Côte d'Ivoire and expanding to neighboring West African countries. Alpime Health offers a reliable, secure, and efficient electronic medical record system, following a three-pronged objective of data storage for healthcare administrators, data representation for doctors and patients, and data analytics for hospitals starting in Côte d'Ivoire and expanding to neighboring West African countries.",
      roleName: "ML Developer",
      roleDescription:
        "We're looking for ML Developers who have hands-on experience with natural language processing, especially in areas like context-aware validation and disambiguation. If you've worked with computer vision technologies such as optical character recognition (OCR) or form parsing, that's a big plus! We're looking for ML Developers who have hands-on experience with natural language processing, especially in areas like context-aware validation and disambiguation. If you've worked with computer vision technologies such as optical character recognition (OCR) or form parsing, that's a big plus! We're looking for ML Developers who have hands-on experience with natural language processing, especially in areas like context-aware validation and disambiguation. If you've worked with computer vision technologies such as optical character recognition (OCR) or form parsing, that's a big plus! We're looking for ML Developers who have hands-on experience with natural language processing, especially in areas like context-aware validation and disambiguation. If you've worked with computer vision technologies such as optical character recognition (OCR) or form parsing, that's a big plus! We're looking for ML Developers who have hands-on experience with natural language processing, especially in areas like context-aware validation and disambiguation. If you've worked with computer vision technologies such as optical character recognition (OCR) or form parsing, that's a big plus!",
      roleSkills: ["Python", "Communication", "NLP Experience", "Teamwork"],
      contactInfo:
        "tahiragrewal2026@u.northwestern.edu, isaacmeite2026@u.northwestern.edu, admin@alpimehealth.com",
    },
    {
      id: 1,
      companyName: "Purple Pantry",
      companyDescription:
        "Purple Pantry is a student-led initiative tackling food insecurity on campus by connecting surplus food from events and dining halls to students in need. Through a simple mobile app, students can get real-time updates on available meals.",
      roleName: "Frontend Developer",
      roleDescription:
        "We're looking for a frontend developer to help improve our mobile UI and integrate real-time notifications using React Native and Firebase. Bonus points for experience with accessibility standards!",
      roleSkills: ["React Native", "Firebase", "UI/UX", "Team Collaboration"],
      contactInfo:
        "founders@purplepantry.northwestern.edu, team@purplepantry.northwestern.edu",
    },
    {
      id: 2,
      companyName: "StudyBuddy AI",
      companyDescription:
        "StudyBuddy AI is an AI-powered platform that matches students with personalized study partners based on learning style, course load, and academic goals. Built by a team of McCormick and Weinberg students.",
      roleName: "Machine Learning Engineer",
      roleDescription:
        "We're seeking an ML engineer to improve our matching algorithm and work on integrating GPT-powered tutor suggestions. Experience with Python and collaborative filtering is ideal.",
      roleSkills: ["Python", "ML", "Data Analysis", "OpenAI API"],
      contactInfo:
        "studybuddyteam@u.northwestern.edu, contact@studybuddyai.com",
    },
    {
      id: 3,
      companyName: "ReVerve",
      companyDescription:
        "ReVerve is building a sustainable fashion marketplace where students can rent and lend clothes for events, interviews, or everyday wear. Think Rent the Runway meets campus closets.",
      roleName: "Product Designer",
      roleDescription:
        "We're looking for a product designer who loves solving real student problems. You'll work on refining our mobile experience, design user flows, and conduct lightweight usability tests.",
      roleSkills: ["Figma", "User Research", "Design Systems", "Empathy"],
      contactInfo: "design@reverve.northwestern.edu, founders@reverve.app",
    },
    {
      id: 4,
      companyName: "HealthHacks",
      companyDescription:
        "HealthHacks empowers underrepresented communities to take control of their health using gamified health education and culturally tailored resources. Started by Northwestern pre-med and CS students.",
      roleName: "Full-Stack Developer",
      roleDescription:
        "We're building a React + Node.js platform to host interactive health education games and track user progress. Looking for someone passionate about social impact and scalable tech.",
      roleSkills: ["React", "Node.js", "MongoDB", "REST APIs"],
      contactInfo: "apply@healthhacks.northwestern.edu, dev@healthhacks.org",
    },
  ]);

  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);

  const handleAccept = () => {
    if (companies.length > 0) {
      const updatedCompanies = companies.slice(1);
      setAccepted([...accepted, companies[0]]);
      setCompanies(updatedCompanies);
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
    <div className="w-full h-screen max-h-screen flex flex-col md:flex-row bg-gray-50 justify-center md:items-right items-center overflow-hidden">
      {companies.length > 0 ? (
        <div className="md:mx-20 xl:mx-32 h-full flex flex-col flex-grow overflow-hidden">
          <CompanyHeader
            companyName={companies[0].companyName}
            roleName={companies[0].roleName}
          />
          <div className="flex-grow overflow-hidden">
            <CompanyCard
              key={companies[0].id}
              companyDescription={companies[0].companyDescription}
              roleDescription={companies[0].roleDescription}
              roleSkills={companies[0].roleSkills}
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
