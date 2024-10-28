import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { createPlace } from '../../services/api';
import './PlacesCreate.scss';

const PlacesCreate = () => {
  const { diaryId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('diary_id', diaryId);
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await createPlace(diaryId, formData);
      console.log(response.data);
      navigate(`/diaries/${diaryId}/places`);
    } catch (err) {
      console.error("Error creating place:", err);
      setError("Failed to create a new place. Please try again later.");
    }
  };

  return (
    <div className="create-place">
      <h2>Create New Place</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label htmlFor="image">Place Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && <img src={URL.createObjectURL(image)} alt="Preview" className="image-preview" />}
        </div> <br/>
        <Button type="submit" text="Create Place" />
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default PlacesCreate;
