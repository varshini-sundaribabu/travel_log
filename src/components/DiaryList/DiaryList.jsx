import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import DiaryCard from './../DiaryCard/DiaryCard';
import { fetchDiaries, deleteDiary } from '../../services/api';
import './DiaryList.scss';

const DiaryList = () => {
  const getUserId = () => {
    return localStorage.getItem('id');
  }
  const navigate = useNavigate();
  const [diaries, setDiaries] = useState([]);
  const [error, setError] = useState(null); // State to handle any fetch errors

  useEffect(() => {
    const loadDiaries = async () => {
      try {
        const userId = getUserId(); // Replace with dynamic user ID if needed
        const response = await fetchDiaries(userId);
        setDiaries(response.data);
      } catch (err) {
        console.error("Error fetching diaries:", err);
        setError("Failed to load diaries. Please try again later.");
      }
    };

    loadDiaries();
  }, []);

  const handleCreate = async () => {
    navigate('/create-diary');
  };

  const handleDelete = async (diaryId) => {
    try {
      const userId = getUserId(); // Replace with dynamic user ID if needed
      await deleteDiary(userId, diaryId);
      setDiaries(diaries.filter(diary => diary.id !== diaryId));
    } catch (err) {
      console.error("Error deleting diary:", err);
      setError("Failed to delete the diary. Please try again later.");
    }
  };

  return (
    <div className="diary-list">
      <h2>Your Travel Diaries</h2>
      {error && <p className="error">{error}</p>}
      <div className="diary-cards">
        {diaries.length > 0 ? (diaries.map(diary => (
          <DiaryCard
            key={diary.id}
            diary={diary}
            onDelete={() => handleDelete(diary.id)}
          />
        ))) : (<div>
          Create your first diary by clicking the button below
        </div>)}
      </div>
      <button className="create-diary-button" onClick={handleCreate}>Create New Diary</button>
    </div>
  );
};

export default DiaryList;
