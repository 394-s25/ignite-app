import React, { useEffect, useState } from "react";
import StudentProfileCard from "../components/likedCards/studentProfileCard";
import NavBar from "../components/NavBar";
import { ref, get } from "firebase/database";
import { db } from "../db/firebaseConfig";

const CompanyLikes = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await get(ref(db, "users"));
        if (!snapshot.exists()) return;

        const rawData = snapshot.val();

        const usersList = Object.entries(rawData).map(([id, user]) => ({
          id,
          name: user.name || "Unnamed",
          major: user.major || "Undeclared",
          gradYear: user.gradYear || null,
          email: user.email || null,
          bio: user.bio || null,
          link: user.link || null,
          image: "https://via.placeholder.com/80" 
        }));

        setPeople(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleRemove = (personToRemove) => {
    setPeople((prev) => prev.filter((p) => p.id !== personToRemove.id));
  };

  return (
    <div>
      <NavBar />
      <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-10 drop-shadow-md">
        Students That Liked Me
      </h1>
      <div className="space-y-6">
        {people.map((person) => (
          <StudentProfileCard
            key={person.id}
            person={person}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyLikes;
