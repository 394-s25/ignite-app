import UserProfile from "../components/UserProfile";

const students = [{
    studentName: "Peppa Pig",
    // studentPhoto: peppa, Add this later
    studentMajor: "Computer Science",
    studentBio:
                "Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate! Hi, I'm Peppa! I love solving problems, coding, and chatting with new people. Let's connect and collaborate!",
    lookingFor:
                "Passionate about building tech that makes people smile. Previously worked on a chatbot for kids. Looking to join a startup focused on education, health, or social good! Passionate about building tech that makes people smile. Previously worked on a chatbot for kids. Looking to join a startup focused on education, health, or social good! Passionate about building tech that makes people smile. Previously worked on a chatbot for kids. Looking to join a startup focused on education, health, or social good! Passionate about building tech that makes people smile. Previously worked on a chatbot for kids. Looking to join a startup focused on education, health, or social good! Passionate about building tech that makes people smile. Previously worked on a chatbot for kids. Looking to join a startup focused on education, health, or social good! Passionate about building tech that makes people smile. Previously worked on a chatbot for kids. Looking to join a startup focused on education, health, or social good! Passionate about building tech that makes people smile. Previously worked on a chatbot for kids. Looking to join a startup focused on education, health, or social good!",
    studentSkills: ["Python", "Communication", "NLP Experience", "Teamwork"],
    contactInfo: "peppapig@u.northwestern.edu",
}]

const EditProfile = () => {
    return (
        <div>
            {students.map((student) => (
                <UserProfile 
                    key={student.contactInfo}
                    studentName={student.studentName}
                    studentMajor={student.studentMajor}
                    studentBio={student.studentBio}
                    lookingFor={student.lookingFor}
                    studentSkills={student.studentSkills}
                    contactInfo={student.contactInfo}
                />
            ))}
        </div>
    );
}

export default EditProfile;