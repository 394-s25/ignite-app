import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentSwipePage from "./pages/studentSwipePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentSwipePage />} />
      </Routes>
    </Router>
  );
};

export default App;
