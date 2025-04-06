import { useState } from "react";
import CompanySwipeCard from "../components/companySwipeCard";
import StudentSwipeCard from "../components/studentSwipeCard";
import "../App.css";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col gap-10 justify-center">
      <CompanySwipeCard
        companyName={"Alpime Health"}
        companyDescription={
          "Alpime Health offers a reliable, secure, and efficient electronic medical record system, following a three-pronged objective of data storage for healthcare administrators, data representation for doctors and patients, and data analytics for hospitals starting in Côte d'Ivoire and expanding to neighboring West African countries."
        }
        roleName={"ML Developer"}
        roleDescription={
          "We're looking for ML Developers who have hands-on experience with natural language processing, especially in areas like context-aware validation and disambiguation. If you've worked with computer vision technologies such as optical character recognition (OCR) or form parsing, that's a big plus!"
        }
        roleSkills={["Python", "Communication", "NLP Experience", "Teamwork"]}
        contactInfo={
          "tahiragrewal2026@u.northwestern.edu, isaacmeite2026@u.northwestern.edu, admin@alpimehealth.com"
        }
      />
      <StudentSwipeCard
        studentName={"Peppa Pig"}
        studentBio={"Hello friends!"}
        studentSkills={[
          "Python",
          "Communication",
          "NLP Experience",
          "Teamwork",
        ]}
        contactInfo={"peppapig@u.northwestern.edu"}
      />
    </div>
  );
};

export default Home;
