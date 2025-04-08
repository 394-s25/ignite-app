import React, { useState } from 'react';
import './EditableSection.css'
import { Pen } from "lucide-react";

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
                    <Pen  className="w-8 h-8" color="violet"/>
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