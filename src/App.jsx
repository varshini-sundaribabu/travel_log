import React from 'react';
import './main.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DiaryCreation from './pages/DiaryCreationPage/DiaryCreation';
import DiaryList from './components/DiaryList/DiaryList';
import Navbar from './components/Navbar/NavBar';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diaries" element={<DiaryList />} />
        <Route path="/create-diary" element={<DiaryCreation />} /> {/* Diary Creation Page */}
      </Routes>
    </Router>
  );
};

export default App;
