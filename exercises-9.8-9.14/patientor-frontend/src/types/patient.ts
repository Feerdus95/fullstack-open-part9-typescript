export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
  }
  
  export type PublicPatient = Omit<Patient, 'ssn'>; // Omit ssn from the Patient type