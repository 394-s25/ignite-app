import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./db/firebaseService.js";
import StudentSwipePage from "./pages/studentSwipePage";
import CompanySwipePage from "./pages/companySwipePage";
import CompanyLikes from "./pages/companyLikes";
import StudentLikes from "./pages/studentlikes.jsx";
import EditProfile from "./pages/editProfile.jsx";
import LoginPage from "./pages/login.jsx";
import TestProfile from "./pages/testProfile.jsx";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/studentswipe" element={<StudentSwipePage />} />
          <Route path="/companyswipe" element={<CompanySwipePage />} />
          <Route path="/companylikes" element={<CompanyLikes />} />
          <Route path="/studentlikes" element={<StudentLikes />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/utility" element={<TestProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
