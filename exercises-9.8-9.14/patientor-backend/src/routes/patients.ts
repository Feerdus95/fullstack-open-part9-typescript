import express from 'express';
import patients from '../data/patients';
import { Patient, PublicPatient, PatientSchema } from '../types/patient';
import { v1 as uuid } from 'uuid';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  const publicPatients: PublicPatient[] = patients.map(({ ssn, ...rest }) => rest);
  res.send(publicPatients);
});

router.post('/', (req, res) => {
  try {
    // Validate the request body using the Zod schema
    const validatedData = PatientSchema.parse(req.body);

    const newPatient: Patient = {
      id: uuid(),
      ...validatedData,
    };

    patients.push(newPatient); // Add the new patient to the data
    res.status(201).send(newPatient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      res.status(400).send({ error: 'Invalid input', details: error.errors });
    } else {
      // Handle other errors
      res.status(500).send({ error: 'Internal server error' });
    }
  }
});

export default router;