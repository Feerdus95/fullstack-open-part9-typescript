import React, { useState } from 'react';
import axios from 'axios';
import { NewDiaryEntry, Weather, Visibility } from './types';

interface Props {
  onDiaryAdded: () => void;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const DiaryForm = ({ onDiaryAdded, setError }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const addDiary = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const newDiary: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment
    };

    try {
      await axios.post<NewDiaryEntry>(
        'http://localhost:3001/api/diaries',
        newDiary
      );
      setDate('');
      setComment('');
      setError(null);
      onDiaryAdded();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || 'An error occurred while adding a diary entry');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            required
          />
        </div>
        <div>
          <label>Visibility:</label>
          <select
            value={visibility}
            onChange={({ target }) => setVisibility(target.value as Visibility)}
          >
            {Object.values(Visibility).map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Weather:</label>
          <select
            value={weather}
            onChange={({ target }) => setWeather(target.value as Weather)}
          >
            {Object.values(Weather).map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Comment:</label>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;