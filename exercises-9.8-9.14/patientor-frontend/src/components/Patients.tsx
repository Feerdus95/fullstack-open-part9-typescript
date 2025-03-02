import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PublicPatient } from '../types/patient';

const Patients = () => {
  const [patients, setPatients] = useState<PublicPatient[]>([]); // Specify the type here

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>{patient.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;