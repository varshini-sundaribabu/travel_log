import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DiaryCard.scss';

const DiaryCard = ({ diary, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="diary-card" onClick={() => navigate(`/diaries/${diary.id}/places`)}>
      <img src={diary.coverImage} alt={diary.title} className="cover-image" />
      <h3>{diary.title}</h3>
      <p>{diary.description}</p>
      <div className="card-actions">
        <button onClick={(e) => { e.stopPropagation(); navigate(`/diaries/edit/${diary.id}`); }}>Edit</button> {/* Navigate to edit */}
        <button onClick={(e) => { e.stopPropagation(); onDelete(diary.id); }}>Delete</button>
      </div>
    </div>
  );
};

export default DiaryCard;
