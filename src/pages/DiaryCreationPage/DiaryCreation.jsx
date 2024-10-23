import React, { useState } from 'react';
import './DiaryCreation.scss';

const DiaryCreation = () => {
  const [diaryTitle, setDiaryTitle] = useState('');
  const [diaryDescription, setDiaryDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle diary creation logic (e.g., API call)
    console.log('Diary Created:', { diaryTitle, diaryDescription });
  };

  return (
    <div className="diary-creation">
      <h2>Create a New Diary</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="diaryTitle">Diary Title</label>
          <input
            type="text"
            id="diaryTitle"
            value={diaryTitle}
            onChange={(e) => setDiaryTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="diaryDescription">Diary Description</label>
          <textarea
            id="diaryDescription"
            value={diaryDescription}
            onChange={(e) => setDiaryDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create Diary</button>
      </form>
    </div>
  );
};

export default DiaryCreation;
