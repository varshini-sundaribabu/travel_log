import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Function to retrieve token from localStorage
const getToken = () => localStorage.getItem('token');

// Add a request interceptor to include the Authorization header
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Exporting API functions
export const signUpUser = (userData) => api.post('/users/signup', userData);
export const signInUser = (credentials) => api.post('/users/login', credentials);
export const fetchDiaries = (userId) => api.get(`/diaries/${userId}`);
export const createDiary = (userId, diaryData) => api.post(`/diaries/${userId}`, diaryData);
export const updateDiary = (userId, diaryId, diaryData) => api.put(`/diaries/${userId}/${diaryId}`, diaryData);
export const deleteDiary = (userId, diaryId) => api.delete(`/diaries/${userId}/${diaryId}`);
export const fetchPlaces = (diaryId) => api.get(`/places/${diaryId}`);
export const createPlace = (diaryId, placeData) => api.post(`/places/${diaryId}`, placeData);
export const updatePlace = (diaryId, placeId, placeData) => api.put(`/places/${diaryId}/${placeId}`, placeData);
export const deletePlace = (diaryId, placeId) => api.delete(`/places/${diaryId}/${placeId}`);
