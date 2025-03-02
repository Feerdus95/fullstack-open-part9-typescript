import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DiaryEntry, Weather } from './types';
import DiaryForm from './DiaryForm';
import './App.css';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentWeather, setCurrentWeather] = useState<Weather>(Weather.Sunny);

  const fetchDiaries = async () => {
    try {
      const response = await axios.get<DiaryEntry[]>('http://localhost:3001/api/diaries');
      setDiaries(response.data);
      setError(null);
      
      // Set current weather based on the latest entry if available
      if (response.data.length > 0) {
        setCurrentWeather(response.data[0].weather);
      }
    } catch (err) {
      setError('Failed to fetch diary entries. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiaries();
  }, []);

  const handleDiaryAdded = () => {
    fetchDiaries();
  };

  const getWeatherImage = () => {
    // This would be replaced with actual weather images in a real application
    return (
      <>
        <h3>Current Weather: {currentWeather}</h3>
        <div className="weather-image-placeholder">
          Example weather image would go here
        </div>
      </>
    );
  };

  if (loading) {
    return <div className="app-container">Loading...</div>;
  }

  return (
    <div className="app-container">
      <h1>Flight Diary</h1>
      
      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
      
      <div className="app-layout">
        <div className="left-column">
          <div className="form-container">
            <DiaryForm onDiaryAdded={handleDiaryAdded} setError={setError} />
          </div>
          
          <div className="weather-container">
            {getWeatherImage()}
          </div>
        </div>
        
        <div className="right-column column">
          <h2>Entries List with top to bottom scroll</h2>
          <div className="entries-list">
            {diaries.map((diary) => (
              <div key={diary.id} className="diary-entry">
                <h3>{diary.date}</h3>
                <p>Weather: {diary.weather}</p>
                <p>Visibility: {diary.visibility}</p>
                {diary.comment && <p>Comment: {diary.comment}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;