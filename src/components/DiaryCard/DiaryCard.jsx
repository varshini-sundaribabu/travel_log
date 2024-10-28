import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DiaryCard.scss';

const DiaryCard = ({ diary, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="diary-card" onClick={() => navigate(`/diaries/${diary.id}/places`)}>
      <img src={import.meta.env.VITE_SERVER_BASE_URL + 'uploads/' + diary.cover_image} alt={diary.name} className="cover-image" />
      <h3>{diary.name}</h3>
      <p>{diary.description}</p>
      <div className="card-actions">
        <button onClick={(e) => { e.stopPropagation(); navigate(`/diaries/edit/${diary.id}`); }}>Edit</button> {/* Navigate to edit */}
        <button onClick={(e) => { e.stopPropagation(); onDelete(diary.id); }}>Delete</button>
      </div>
    </div>
  );
};

export default DiaryCard;
