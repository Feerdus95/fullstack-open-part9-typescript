import { z } from 'zod';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
  type: 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: BaseEntry[];
}

export type PublicPatient = Omit<Patient, 'ssn'>;

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string().min(1, 'Description is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  specialist: z.string().min(1, 'Specialist is required'),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.enum(['HealthCheck', 'OccupationalHealthcare', 'Hospital']),
});

export const PatientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  ssn: z.string().optional(),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(1, 'Occupation is required'),
  entries: z.array(BaseEntrySchema).default([]),
});

export type PatientFromRequest = z.infer<typeof PatientSchema>;