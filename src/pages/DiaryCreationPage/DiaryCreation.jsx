import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Button from '../../components/Button/Button';
import './DiaryCreation.scss';

const DiaryCreation = ({ onCreate }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Set image preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new diary object
    const newDiary = {
      id: Date.now(), // Use current timestamp as unique id
      title,
      description,
      coverImage: image,
    };
    // onCreate(newDiary); // Send the new diary to the parent component
    navigate('/diaries'); // Redirect after creating
  };

  return (
    <div className="create-diary">
      <h2>Create New Diary</h2>
      <form >
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
      </form><br></br><br></br>
      <Button type="submit" text={"Create Diary"} onClickHandler={handleSubmit}/>
    </div>
  );
};

export default DiaryCreation;
