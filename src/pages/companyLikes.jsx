import React from 'react';
import ProfileCard from "../components/studentProfileCard"
import StudentProfileCard from '../components/studentProfileCard';
const people = [
    {
      name: "Emma Johnson",
      gradYear: "2025",
      major: "Computer Science",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: "Liam Thompson",
      gradYear: "2024",
      major: "Music Technology",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      name: "Sophia Martinez",
      gradYear: "2023",
      major: "Film and Media Studies",
      image: "https://randomuser.me/api/portraits/women/72.jpg"
    },
    {
      name: "Noah Kim",
      gradYear: "2024",
      major: "Human-Computer Interaction",
      image: "https://randomuser.me/api/portraits/men/36.jpg"
    },
    {
      name: "Ava Patel",
      gradYear: "2025",
      major: "Information Systems",
      image: "https://randomuser.me/api/portraits/women/21.jpg"
    },
    {
      name: "Jackson Lee",
      gradYear: "2023",
      major: "Business and Tech",
      image: "https://randomuser.me/api/portraits/men/12.jpg"
    },
    {
      name: "Mia Nguyen",
      gradYear: "2022",
      major: "Hospitality and Tourism",
      image: "https://randomuser.me/api/portraits/women/33.jpg"
    }
  ];;
const CompanyLikes = () => {
  return (
    <div>
    <h1 className="text-3xl font-bold mb-6 text-center">Students That Liked You</h1>
      {people.map((person, index) => (
        <StudentProfileCard key={index} person={person} />
      ))}
    </div>
  );
}

export default CompanyLikes;
