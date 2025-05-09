import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./db/firebaseService.js";
import CompanyLikes from "./pages/companyLikes";
import StudentLikes from "./pages/studentlikes.jsx";
// import EditProfile from "./pages/editProfile.jsx";
import LoginPage from "./pages/login.jsx";
import TestProfile from "./pages/testProfile.jsx";
import { AuthProvider } from "./contexts/authContext";
import { ProfileProvider } from "./contexts/profileContext";
import TestModalPage from "./pages/testModal.jsx";
import SwipePage from "./pages/swipe.jsx";
import CompanyMatches from "./pages/companyMatches.jsx";
import StudentMatches from "./pages/studentMatches.jsx";

const App = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/swipe" element={<SwipePage />} />
              {/* <Route path="/companyswipe" element={<CompanySwipePage />} /> */}
              {/* <Route path="/studentwipe" element={<StudentSwipePage />} /> */}
              <Route path="/companyMatches" element={<CompanyMatches />} />
              <Route path="/studentMatches" element={<StudentMatches />} />
              <Route path="/companylikes" element={<CompanyLikes />} />
              <Route path="/studentlikes" element={<StudentLikes />} />
              <Route path="/editProfile" element={<TestProfile />} />
              <Route path="/testmodal" element={<TestModalPage />} />
            </Routes>
          </div>
        </Router>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default App;
