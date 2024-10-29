import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPlaces, deletePlace } from '../../services/api';
import './PlacesList.scss';

const PlacesList = () => {
    const { diaryId } = useParams();
    const navigate = useNavigate();
    const [places, setPlaces] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPlaces = async () => {
            try {
                const response = await fetchPlaces(diaryId);
                setPlaces(response.data);
            } catch (err) {
                console.error("Error fetching places:", err);
                setError("Failed to load places. Please try again later.");
            }
        };
        loadPlaces();
    }, [diaryId]);

    const handleCreate = () => {
        navigate(`/diaries/${diaryId}/places/create`);
    };

    const handleEdit = (placeId) => {
        navigate(`/diaries/${diaryId}/places/${placeId}/edit`);
    };

    const handleDelete = async (placeId) => {
        try {
            await deletePlace(diaryId, placeId);
            setPlaces(places.filter(place => place.id !== placeId));
        } catch (err) {
            console.error("Error deleting place:", err);
            setError("Failed to delete the place. Please try again later.");
        }
    };

    const handleBack = () => {
        navigate('/');
    }

    return (
        <div className="places-list">
            <h2>Places in This Diary</h2>
            {error && <p className="error">{error}</p>}
            <div className="place-cards">
                {places.length > 0 ? (
                    places.map(place => (
                        <div key={place.id} className="place-card">
                            <img src={import.meta.env.VITE_SERVER_BASE_URL + 'uploads/' + place.image} alt={place.name} className="cover-image" />
                            <h3>{place.name}</h3>
                            <p>{place.description}</p>
                            <div className="place-card-buttons">
                                <button onClick={() => handleEdit(place.id)}>Edit</button>
                                <button onClick={() => handleDelete(place.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No places added yet. Add your first place below!</p>
                )}
            </div>
            <button className="create-place-button" onClick={handleCreate}>Add New Place</button>
            <button className="back-place-button" onClick={handleBack}>Back</button>
        </div>
    );
};

export default PlacesList;
