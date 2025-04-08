import React from 'react';
import './UserForm.css';
import EditableSection from './EditableSection'

const UserForm = ({
    studentBio,
    studentSkills = [],
    lookingFor, 
}) => {
    return (
        <div className='UserForm'>
            <EditableSection title="Biography" content={studentBio}></EditableSection>
            <h2>Skills</h2>
            <div className="flex flex-wrap gap-2">
                {studentSkills.map((skill) => (
                    <span
                    key={skill}
                    className="px-3 py-1 bg-violet-100 text-violet-900 rounded-sm font-medium"
                    >
                    {skill}
                    </span>
                ))}
                </div>
            <EditableSection title="Experience"></EditableSection>
            <EditableSection title="Looking For" content={lookingFor}></EditableSection>
        </div>
    )
}

export default UserForm