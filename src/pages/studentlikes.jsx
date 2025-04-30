import React, { useEffect, useState } from "react";
import CompanyProfileLikedCard from "../components/likedCards/companyProfileLikedCard";
import NavBar from "../components/NavBar";
import { ref, get } from "firebase/database";
import { db, auth } from "../db/firebaseConfig";

const StudentLikes = () => {
  const [companies, setCompanies] = useState([]);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setStudentId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchLikedCompanies = async () => {
      if (!studentId) return;

      try {
        // Get liked company IDs
        const studentSnapshot = await get(ref(db, `users/${studentId}`));
        if (!studentSnapshot.exists()) return;

        const studentData = studentSnapshot.val();
        const likedIds = studentData.likes || [];

        // Fetch company data for each ID
        const companiesSnapshot = await get(ref(db, "companies"));
        if (!companiesSnapshot.exists()) return;

        const allCompanies = companiesSnapshot.val();

        const likedCompanies = likedIds
          .map((id) => {
            const company = allCompanies[id];
            if (!company) return null;
            return {
              id,
              companyName: company.name || "Unknown Company",
              bio: company.bio || "No bio available",
              role: company.role,
              link: company.link,
              skills: company.skills || [],
              descriptors: company.descriptors || {},
              logo: "https://logo.clearbit.com/example.com",
            };
          })
          .filter((c) => c !== null);

        setCompanies(likedCompanies);
      } catch (error) {
        console.error("Error fetching liked companies:", error);
      }
    };

    fetchLikedCompanies();
  }, [studentId]);

  const handleRemove = (companyToRemove) => {
    setCompanies((prev) => prev.filter((c) => c.id !== companyToRemove.id));
  };

  return (
    <div>
      <NavBar />
      <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-10 drop-shadow-md">
        Companies That Liked You
      </h1>
      <div className="space-y-6">
        {companies.map((company) => (
          <CompanyProfileLikedCard
            key={company.id}
            company={company}
            studentId={studentId}
            onRemove={handleRemove}
            showActions={true}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentLikes;
