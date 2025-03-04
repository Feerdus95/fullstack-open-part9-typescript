import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Diagnosis } from '../types/diagnosis'; // Ensure this import is correct

const Diagnoses = () => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]); // Specify the type here

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/diagnoses');
        setDiagnoses(response.data);
      } catch (error) {
        console.error('Error fetching diagnoses:', error);
      }
    };

    fetchDiagnoses();
  }, []);

  return (
    <div>
      <h2>Diagnoses</h2>
      <ul>
        {diagnoses.map((diagnosis) => (
          <li key={diagnosis.code}>{diagnosis.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Diagnoses;