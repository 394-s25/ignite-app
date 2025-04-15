import UserProfileCard from "./UserProfileCard";
import UserForm from "./UserForm";

const UserProfile = ({
  studentName,
  studentPhoto,
  studentMajor,
  studentBio,
  lookingFor,
  studentSkills = [],
  contactInfo,
}) => {
  return (
    <div>
      <UserProfileCard
        studentName={studentName}
        studentMajor={studentMajor}
        contactInfo={contactInfo}
      />
      <UserForm
        studentBio={studentBio}
        studentSkills={studentSkills}
        lookingFor={lookingFor}
      />
    </div>
  );
};

export default UserProfile;
