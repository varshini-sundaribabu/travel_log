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
import { useState } from 'react';
import { getToken } from './components/auth';

const App = () => {
  const [token, setAppToken] = useState(getToken());

  return (
    <Router>
      <Navbar token={token} setAppToken={setAppToken}/>
      <Routes>
        <Route path="/" element={token ? <DiaryList /> : <HomePage  setAppToken={setAppToken}/>} />
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