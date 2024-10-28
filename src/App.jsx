import './main.scss';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DiaryCreation from './components/DiaryCreationPage/DiaryCreation';
import DiaryList from './components/DiaryList/DiaryList';
import Navbar from './components/Navbar/NavBar';
import EditDiary from './components/EditDiary/EditDiary';
import PlacesList from './components/PlacesList/PlacesList';
import PlacesCreate from './components/CreatePlace/PlacesCreate';
import EditPlaces from './components/EditPlace/EditPlaces';

const App = () => {
  const token = localStorage.getItem('token');

  // Automatically sign out the user after 1 hour if there's a token
  useEffect(() => {
    if (token) {
      const expirationTime = 60 * 60 * 1000; // 1 hour in milliseconds
      const signOutTimer = setTimeout(() => {
        localStorage.removeItem('token');
        window.location.reload(); // Refresh to redirect to HomePage after logout
      }, expirationTime);

      // Clear timer on unmount
      return () => clearTimeout(signOutTimer);
    }
  }, [token]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <Navigate to="/diaries" /> : <HomePage />} />
        <Route path="/diaries" element={<DiaryList />} />
        <Route path="/diaries/edit/:diaryId" element={<EditDiary />} />
        <Route path="/diaries/:diaryId/places" element={<PlacesList />} />
        <Route path="/diaries/:diaryId/places/create" element={<PlacesCreate />} />
        <Route path="/diaries/:diaryId/places/:placeId/edit" element={<EditPlaces />} />
        <Route path="/create-diary" element={<DiaryCreation />} />
      </Routes>
    </Router>
  );
};

export default App;