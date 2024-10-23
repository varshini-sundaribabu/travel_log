import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import diariesData from '../../data/diaryData.json'; // Import the static JSON file
import './EditDiary.scss';

const EditDiary = ({ onUpdate }) => {
  const { diaryId } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    // Fetch diary details based on diaryId
    const fetchedDiary = diariesData.find(d => d.id === parseInt(diaryId));
    if (fetchedDiary) {
      setDiary(fetchedDiary);
      setTitle(fetchedDiary.title);
      setDescription(fetchedDiary.description);
      setImage(fetchedDiary.coverImage);
    } else {
      navigate('/diaries'); // Redirect if diary not found
    }
  }, [diaryId, navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the diary details
    // onUpdate({ ...diary, title, description, coverImage: image });
    navigate('/diaries'); // Redirect after updating
  };

  if (!diary) return <div>Loading...</div>;

  return (
    <div className="edit-diary">
      <h2>Edit Diary</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="image">Cover Image:</label>
          <input 
            type="file" 
            id="image" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
          {image && <img src={image} alt="Preview" className="image-preview" />}
        </div>
        <button type="submit">Update Diary</button>
      </form>
    </div>
  );
};

export default EditDiary;
