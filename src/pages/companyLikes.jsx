import React, { useEffect, useState } from "react";
import StudentProfileLikedCard from "../components/likedCards/studentProfileLikedCard";
import NavBar from "../components/NavBar";
import { ref, get } from "firebase/database";
import { db, auth } from "../db/firebaseConfig";

const CompanyLikes = () => {
  const [people, setPeople] = useState([]);
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCompanyId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchLikedStudents = async () => {
      if (!companyId) return;

      try {
        // Get liked student IDs
        const companySnapshot = await get(ref(db, `companies/${companyId}`));
        if (!companySnapshot.exists()) return;

        const companyData = companySnapshot.val();
        const likedIds = companyData.likes || [];

        // Fetch student data for each ID
        const userSnapshot = await get(ref(db, "users"));
        if (!userSnapshot.exists()) return;

        const allUsers = userSnapshot.val();

        const likedUsers = likedIds
          .map((id) => {
            const user = allUsers[id];
            if (!user) return null;
            return {
              id,
              name: user.name || "Unnamed",
              major: user.major || "Undeclared",
              gradYear: user.gradYear || null,
              email: user.email || null,
              bio: user.bio || null,
              link: user.link || null,
              image: "https://randomuser.me/api/portraits/lego/1.jpg",
            };
          })
          .filter((u) => u !== null);

        setPeople(likedUsers);
      } catch (error) {
        console.error("Error fetching liked students:", error);
      }
    };

    fetchLikedStudents();
  }, [companyId]);

  const handleRemove = (personToRemove) => {
    setPeople((prev) => prev.filter((p) => p.id !== personToRemove.id));
  };

  return (
    <div>
      <NavBar />
      <h1 className="text-4xl font-extrabold text-purple-700 text-center mt-10 mb-10 drop-shadow-md">
        Students That Liked Me
      </h1>
      <div className="space-y-6">
        {people.map((person) => (
          <StudentProfileLikedCard
            key={person.id}
            person={person}
            companyId={companyId}
            onRemove={handleRemove}
            showActions={true}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyLikes;
