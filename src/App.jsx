import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./db/firebaseService.js";
import StudentSwipePage from "./pages/studentSwipePage";
import CompanySwipePage from "./pages/companySwipePage";
import CompanyLikes from "./pages/companyLikes";
import StudentLikes from "./pages/studentlikes.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/studentswipe" element={<StudentSwipePage />} />
        <Route path="/companyswipe" element={<CompanySwipePage />} />
        <Route path="/companylikes" element={<CompanyLikes     />} />
        <Route path="/studentlikes" element={<StudentLikes     />} />
      </Routes>
    </Router>
  );
};

export default App;
