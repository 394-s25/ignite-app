import React, { useState } from 'react';
import './EditableSection.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const EditableSection = ({title, content}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSave = (e) => {
        e.preventDefault();
        setIsEditing(false);
    }
    return (
        <div className='EditableSection'>
            <div className='Header'>
                <h2>{title}</h2>
                <button className="edit-btn" onClick={handleEditClick}>
                    <FontAwesomeIcon icon={faPen} style={{ color: '#b197fc' }}/>
                </button>
            </div>

        {isEditing? (
            <form onSubmit={handleSave}>
                <textarea 
                    value={editedContent} 
                    onChange={(e) => setEditedContent(e.target.value)} 
                    rows={4} 
                    cols={50}>
                </textarea>
                <button className="save-btn" type="submit">Save</button>
            </form>
        ) : (
            <p>{editedContent}</p>
        )}
        </div>
    )
}

export default EditableSection;