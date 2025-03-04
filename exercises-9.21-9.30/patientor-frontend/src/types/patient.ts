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

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}
  
export type PublicPatient = Omit<Patient, 'ssn'>; // Omit ssn from the Patient type

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnoseCodes?: string[];
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

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;