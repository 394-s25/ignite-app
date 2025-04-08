import React, { useState } from 'react';
import './UserProfileCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const UserProfileCard = ({studentName, studentMajor, contactInfo,}) => {
  const [profilePic, setProfilePic] = useState(null);
  const [location, setLocation] = useState('Evanston, IL');

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-card">
      <div className="card-header">
        <div className="left-section">
          <div className="profile-pic-wrapper">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="profile-pic" />
            ) : (
              <div className="profile-placeholder">JT</div>
            )}
            <input type="file" accept="image/*" onChange={handlePicChange} />
          </div>
          <div className="user-info">
            <h2>{studentName}</h2>
            <p>{studentMajor}</p>
            <p>{contactInfo}</p>
          </div>
        </div>

        <div className="right-section">
          <button className="edit-btn"><FontAwesomeIcon icon={faPen} style={{ color: '#b197fc' }}/></button>
        </div>
      </div>

      <hr />

      <div className="card-footer">
        <span>📍 {location}</span>
      </div>
    </div>
  );
};

export default UserProfileCard;
