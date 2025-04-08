import UserProfileCard from '../components/UserProfileCard'
import UserForm from '../components/UserForm'

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

export default UserProfile