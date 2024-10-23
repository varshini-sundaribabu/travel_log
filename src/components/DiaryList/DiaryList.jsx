import React, { useState } from 'react';
import DiaryCard from './../DiaryCard/DiaryCard'; // Import the DiaryCard component
import './DiaryList.scss';

const DiaryList = () => {
  const [diaries, setDiaries] = useState([
    {
      id: 1,
      title: 'My First Trip',
      description: 'A trip to the mountains.',
      coverImage: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      title: 'Beach Vacation',
      description: 'A relaxing time at the beach.',
      coverImage: 'https://via.placeholder.com/50',
    }
  ]);

  const handleEdit = (id) => {
    // Logic for editing a diary (e.g., show a modal or navigate to edit page)
    console.log('Edit diary with id:', id);
  };

  const handleDelete = (id) => {
    setDiaries(diaries.filter(diary => diary.id !== id));
  };

  return (
    <div className="diary-list">
      <h2>Your Travel Diaries</h2>
      <div className="diary-cards">
        {diaries.map(diary => (
          <DiaryCard 
            key={diary.id} 
            diary={diary} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
      <button className="create-diary-button">Create New Diary</button>
    </div>
  );
};

export default DiaryList;
