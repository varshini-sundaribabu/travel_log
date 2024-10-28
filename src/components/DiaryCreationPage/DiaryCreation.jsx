import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { createDiary } from '../../services/api';
import './DiaryCreation.scss';

const DiaryCreation = () => {
  const getUserId = () => {
    return localStorage.getItem('id');
  }
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Store image file instead of URL
  const [error, setError] = useState(null); // State to handle any fetch errors

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Store the actual file for upload
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userId = getUserId();
    if (!userId) {
      setError("User ID is missing. Please log in again.");
      return;
    }

    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('name', title);
    formData.append('description', description);
    if (image) {
      formData.append('cover_image', image); // Attach the image file
    }

    try {
      const response = await createDiary(userId, formData); // Sending formData instead of JSON
      console.log(response.data);
      navigate('/diaries'); // Redirect after creating
    } catch (err) {
      console.error("Error creating diary:", err);
      setError("Failed to create a new diary. Please try again later.");
    }
  };

  return (
    <div className="create-diary">
      <h2>Create New Diary</h2>
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
          {image && <img src={URL.createObjectURL(image)} alt="Preview" className="image-preview" />}
        </div>
        <Button type="submit" text="Create Diary" />
        {error && (<p className="error-message">{error}</p>)}
      </form>
    </div>
  );
};

export default DiaryCreation;
