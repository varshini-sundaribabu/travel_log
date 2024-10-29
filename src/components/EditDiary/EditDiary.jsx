import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDiaries, updateDiary } from '../../services/api';
import './EditDiary.scss';

const EditDiary = () => {
  const { diaryId } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [error, setError] = useState(null);

  // Fetch diary details on mount
  useEffect(() => {
    const loadDiary = async () => {
      try {
        const userId = localStorage.getItem('id'); // Replace with the dynamic user ID if needed
        const response = await fetchDiaries(userId);
        const fetchedDiary = response.data.find(d => d.id === parseInt(diaryId));

        if (fetchedDiary) {
          console.log(fetchedDiary);
          setDiary(fetchedDiary);
          setName(fetchedDiary.name);
          setDescription(fetchedDiary.description);
          setImageName(fetchedDiary.cover_image);
          await handleDownloadAndSetImage(fetchedDiary.cover_image);
        } else {
          navigate('/'); // Redirect if diary not found
        }
      } catch (err) {
        setError("Failed to load diary details.");
        console.error("Error fetching diary:", err);
      }
    };

    loadDiary();
  }, [diaryId, navigate]);

  const handleDownloadAndSetImage = async (image) => {
    const response = await fetch(import.meta.env.VITE_SERVER_BASE_URL + 'uploads/' + image );
    const blob = await response.blob();
    const file = new File([blob], image, { type: image.split('.').pop().toLowerCase() });
    setImage(file);
  };


  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) formData.append('cover_image', image);

    try {
      const userId = localStorage.getItem('id');
      const response = await updateDiary(userId, diaryId, formData);
      console.log(response);
      navigate('/'); // Redirect after updating
    } catch (err) {
      setError("Failed to update the diary. Please try again later.");
      console.error("Error updating diary:", err);
    }
  };

  if (!diary) return <div>Loading...</div>;

  return (
    <div className="edit-diary">
      <h2>Edit Diary</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="title">Title:</label>
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
          <label htmlFor="image">Cover Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && typeof image === 'string' ? (
            <img src={import.meta.env.VITE_SERVER_BASE_URL + 'uploads/' + imageName} alt="Preview" className="image-preview" />
          ) : (
            image && <img src={URL.createObjectURL(image)} alt="Preview" className="image-preview" />
          )}
        </div>
        <button type="submit">Update Diary</button>
        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate(`/diaries/${diaryId}/places`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditDiary;
