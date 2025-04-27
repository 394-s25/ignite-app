import React, { useState } from "react";
import StudentProfileCard from "../components/likedCards/studentProfileCard";
import NavBar from "../components/NavBar";

const initialPeople = [
  {
    name: "Emma Johnson",
    gradYear: "2025",
    major: "Computer Science",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Liam Thompson",
    gradYear: "2024",
    major: "Music Technology",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Sophia Martinez",
    gradYear: "2023",
    major: "Film and Media Studies",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    name: "Noah Kim",
    gradYear: "2024",
    major: "Human-Computer Interaction",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    name: "Ava Patel",
    gradYear: "2025",
    major: "Information Systems",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    name: "Jackson Lee",
    gradYear: "2023",
    major: "Business and Tech",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Mia Nguyen",
    gradYear: "2022",
    major: "Hospitality and Tourism",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];

const CompanyLikes = () => {
  const [people, setPeople] = useState(initialPeople);

  const handleRemove = (personToRemove) => {
    setPeople((prev) => prev.filter((p) => p.name !== personToRemove.name));
  };

  return (
    <div>
      <NavBar />
      <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-10 drop-shadow-md">
        Students That Liked You
      </h1>
      <div className="space-y-6">
        {people.map((person, index) => (
          <StudentProfileCard
            key={index}
            person={person}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyLikes;
