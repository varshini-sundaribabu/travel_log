import React, { useState, useEffect } from 'react';
import DiaryCard from './../DiaryCard/DiaryCard'; // Import the DiaryCard component
import './DiaryList.scss';
import diariesData from '../../data/diaryData.json';
import { useNavigate } from 'react-router';

const DiaryList = () => {
    const navigate = useNavigate();
    const [diaries, setDiaries] = useState([]);

    useEffect(() => {
      // Load diaries data from the static JSON file
      setDiaries(diariesData);
    }, []);

  const handleEdit = (id) => {
    // Logic for editing a diary (e.g., show a modal or navigate to edit page)
    console.log('Edit diary with id:', id);
  };

  const handleUpdateDiary = (updatedDiary) => {
    setDiaries(diaries.map(diary => diary.id === updatedDiary.id ? updatedDiary : diary));
  };

  const handleDelete = (id) => {
    setDiaries(diaries.filter(diary => diary.id !== id));
  };

  const handleCreate = () => {
    navigate('/create-diary')
  }

  return (
    <div className="diary-list">
      <h2>Your Travel Diaries</h2>
      <div className="diary-cards">
        {diaries.map(diary => (
          <DiaryCard 
            key={diary.id} 
            diary={diary} 
            onEdit={handleUpdateDiary} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
      <button className="create-diary-button" onClick={handleCreate}>Create New Diary</button>
    </div>
  );
};

export default DiaryList;
