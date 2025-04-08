import UserProfile from "../components/UserProfile";

const DummyInfo = [{
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
            {DummyInfo.map((info) => (
                <UserProfile 
                    key={info.contactInfo}
                    studentName={info.studentName}
                    studentMajor={info.studentMajor}
                    studentBio={info.studentBio}
                    lookingFor={info.lookingFor}
                    studentSkills={info.studentSkills}
                    contactInfo={info.contactInfo}
                />
            ))}
        </div>
    );
}

export default EditProfile;