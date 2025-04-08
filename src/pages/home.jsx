import { useState } from "react";
import "../App.css";
import UserProfile from "./UserProfile";

const Home = () => {

  return (
    <div>
      <UserProfile
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
