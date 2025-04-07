import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProfileCard from "./pages/ProfileCard";

const people = [
  {
    name: "Geet Jaguste",
    university: "University of Colorado Denver",
    gradYear: "2023",
    major: "Computer Science",
    image: "https://i.pravatar.cc/80?img=5"
  },
  {
    name: "Udaykumar Bommala",
    university: "The University of Alabama in Huntsville",
    gradYear: "2023",
    major: "Computer Science",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Manoj Kumar Pachava",
    university: "University of North Texas",
    gradYear: "2024",
    major: "Computer Science",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "HASAN ASKARI",
    university: "Old Dominion University",
    gradYear: "2025",
    major: "Computer Science",
    image: "https://i.pravatar.cc/80?img=5"
  },
  {
    name: "Samantha Lee",
    university: "UC Berkeley",
    gradYear: "2022",
    major: "Data Science",
    image: "https://i.pravatar.cc/80?img=5"
  },
  {
    name: "James Chen",
    university: "University of Illinois Urbana-Champaign",
    gradYear: "2024",
    major: "Computer Engineering",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Maria Rodriguez",
    university: "Georgia Tech",
    gradYear: "2023",
    major: "Software Engineering",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Liam Patel",
    university: "University of Washington",
    gradYear: "2025",
    major: "Computer Science",
    image: "https://i.pravatar.cc/80?img=5"
  },
  {
    name: "Emily Davis",
    university: "University of Toronto",
    gradYear: "2022",
    major: "Artificial Intelligence",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Ahmed Khan",
    university: "University of Texas at Austin",
    gradYear: "2023",
    major: "Computer Science",
    image: "https://i.pravatar.cc/80?img=1"
  },
  {
    name: "Tina Nguyen",
    university: "Northwestern University",
    gradYear: "2025",
    major: "Human-Computer Interaction",
    image: "https://i.pravatar.cc/80?img=2"
  },
  {
    name: "Kevin Liu",
    university: "Carnegie Mellon University",
    gradYear: "2024",
    major: "Robotics", 
    image : "https://i.pravatar.cc/80?img=3"
  },
  {
    name: "Priya Singh",
    university: "University of Waterloo",
    gradYear: "2022",
    major: "Software Engineering",
    image : "https://i.pravatar.cc/80?img=4"
  },
  {
    name: "Oscar Martinez",
    university: "MIT",
    gradYear: "2025",
    major: "Computational Biology",
    image: "https://i.pravatar.cc/80?img=5"

  },
  {
    name: "Chen Peng",
    university: "Northwestern University",
    gradYear: "2025",
    major: "Computer Science",
    image: "https://i.pravatar.cc/80?img=6"
  }
];


// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />

//       </Routes>
//     </Router>
//   );
// };

function App() {
  return (
    <div>
      {people.map((person, index) => (
        <ProfileCard key={index} person={person} />
      ))}
    </div>
  );
}

export default App;
