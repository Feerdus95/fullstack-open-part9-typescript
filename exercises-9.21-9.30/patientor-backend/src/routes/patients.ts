import express from 'express';
import { v1 as uuid } from 'uuid';
import { Patient, BaseEntry, PatientSchema, BaseEntrySchema } from '../types/patient';
import patients from '../data/patients';

const router = express.Router();

// GET all patients (excluding SSN)
router.get('/', (_req, res) => {
  res.json(patients.map(({ ssn, ...rest }) => rest));
});

// GET a specific patient by ID
router.get('/:id', (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);
  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' });
  }
  return res.json(patient);
});

// POST a new entry for a specific patient
router.post('/:id/entries', (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);
  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' });
  }

  try {
    const entryData = {
      ...req.body,
      id: uuid()
    };

    const validatedEntry = BaseEntrySchema.parse(entryData) as BaseEntry;
    patient.entries.push(validatedEntry);
    
    return res.status(201).json(validatedEntry);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: 'Invalid input' });
  }
});

// POST a new patient
router.post('/', (req, res) => {
  try {
    const validatedData = PatientSchema.parse(req.body);
    
    const newPatient: Patient = {
      id: uuid(),
      ...validatedData,
      entries: validatedData.entries || []
    };

    patients.push(newPatient);
    return res.status(201).json(newPatient);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: 'Invalid input' });
  }
});

export default router;