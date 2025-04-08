import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./db/firebaseService.js";
import StudentSwipePage from "./pages/studentSwipePage";
import CompanySwipePage from "./pages/companySwipePage";
import CompanyLikes from "./pages/companyLikes";
import StudentLikes from "./pages/studentlikes.jsx";
import NavBar from "./components/navbar.jsx";
import EditProfile from "./pages/editProfile.jsx";

const App = () => {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<StudentSwipePage />} />
        <Route path="/studentswipe" element={<StudentSwipePage />} />
        <Route path="/companyswipe" element={<CompanySwipePage />} />
        <Route path="/companylikes" element={<CompanyLikes />} />
        <Route path="/studentlikes" element={<StudentLikes />} />
        <Route path="/editProfile" element={<EditProfile />}/>
      </Routes>
    
      <NavBar/>
      </div>
    </Router>
  );
};

export default App;
