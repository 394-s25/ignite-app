import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./db/firebaseService.js";
import StudentSwipePage from "./pages/studentSwipePage";
import CompanySwipePage from "./pages/companySwipePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/studentswipe" element={<StudentSwipePage />} />
        <Route path="/companyswipe" element={<CompanySwipePage />} />
      </Routes>
    </Router>
  );
};

export default App;
