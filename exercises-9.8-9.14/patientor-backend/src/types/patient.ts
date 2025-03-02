import { z } from 'zod';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
}

export type PublicPatient = Omit<Patient, 'id'>;

export const PatientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  ssn: z.string().optional(),
  gender: z.enum([Gender.Male, Gender.Female, Gender.Other]),
  occupation: z.string().min(1, 'Occupation is required'),
});