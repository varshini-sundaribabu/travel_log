import React from 'react';
import './DiaryCard.scss';

const DiaryCard = ({ diary, onEdit, onDelete }) => {
  return (
    <div className="diary-card">
      <img src={diary.coverImage} alt={diary.title} className="cover-image" />
      <h3>{diary.title}</h3>
      <p>{diary.description}</p>
      <div className="card-actions">
        <button onClick={() => onEdit(diary.id)}>Edit</button>
        <button onClick={() => onDelete(diary.id)}>Delete</button>
      </div>
    </div>
  );
};

export default DiaryCard;
