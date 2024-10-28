import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPlaces, updatePlace } from '../../services/api';
import './EditPlace.scss';

const EditPlaces = () => {
    const { placeId, diaryId } = useParams();
    const navigate = useNavigate();
    const [place, setPlace] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    // Fetch place details on mount
    useEffect(() => {
        const loadPlace = async () => {
            try {
                const response = await fetchPlaces(diaryId);
                const fetchedPlace = response.data.find((p) => p.id === parseInt(placeId));

                if (fetchedPlace) {
                    setPlace(fetchedPlace);
                    setName(fetchedPlace.name);
                    setDescription(fetchedPlace.description);
                    setImage(fetchedPlace.image);
                    console.log(fetchedPlace);
                } else {
                    navigate(`/diaries/${diaryId}/places`);
                }
            } catch (err) {
                setError("Failed to load place details.");
                console.error("Error fetching place:", err);
            }
        };

        loadPlace();
    }, [placeId, diaryId, navigate]);

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
        if (image) formData.append('image', image);

        try {
            const response = await updatePlace(diaryId, placeId, formData);
            console.log(response);
            navigate(`/diaries/${diaryId}/places`); // Redirect after updating
        } catch (err) {
            setError("Failed to update the place. Please try again later.");
            console.error("Error updating place:", err);
        }
    };

    if (!place) return <div>Loading...</div>;

    return (
        <div className="edit-place">
            <h2>Edit Place</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                    <label htmlFor="name">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {image && typeof image === 'string' ? (
                        <img src={import.meta.env.VITE_SERVER_BASE_URL + 'uploads/' + image} alt="Preview" className="image-preview" />
                    ) : (
                        image && <img src={URL.createObjectURL(image)} alt="Preview" className="image-preview" />
                    )}
                </div>
                <button type="submit">Update Place</button>
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

export default EditPlaces;
