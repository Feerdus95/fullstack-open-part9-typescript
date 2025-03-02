import { Gender, Patient } from '../types/patient';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = [
  {
    id: uuid(),
    name: 'John McClane',
    dateOfBirth: '1986-07-09',
    ssn: '090786-122X',
    gender: Gender.Male,
    occupation: 'New York cop',
  },
  {
    id: uuid(),
    name: 'Martin Riggs',
    dateOfBirth: '1979-01-30',
    ssn: '300179-77A',
    gender: Gender.Male,
    occupation: 'Cop',
  },
  {
    id: uuid(),
    name: 'Sarah Connor',
    dateOfBirth: '1985-05-12',
    ssn: '120585-123A',
    gender: Gender.Female,
    occupation: 'Waitress',
  },
  {
    id: uuid(),
    name: 'Ellen Ripley',
    dateOfBirth: '2092-01-07',
    ssn: '070192-456X',
    gender: Gender.Female,
    occupation: 'Warrant Officer',
  },
  {
    id: uuid(),
    name: 'John Wick',
    dateOfBirth: '1974-03-02',
    ssn: '020374-789A',
    gender: Gender.Male,
    occupation: 'Assassin',
  },
  {
    id: uuid(),
    name: 'Leia Organa',
    dateOfBirth: '1956-10-21',
    ssn: '211056-101X',
    gender: Gender.Female,
    occupation: 'Princess',
  },
  {
    id: uuid(),
    name: 'Bruce Wayne',
    dateOfBirth: '1980-02-19',
    ssn: '190280-202A',
    gender: Gender.Male,
    occupation: 'CEO',
  },
  {
    id: uuid(),
    name: 'Diana Prince',
    dateOfBirth: '1918-07-01',
    ssn: '010718-303X',
    gender: Gender.Female,
    occupation: 'Archaeologist',
  },
  {
    id: uuid(),
    name: 'Tony Stark',
    dateOfBirth: '1970-05-29',
    ssn: '290570-404A',
    gender: Gender.Male,
    occupation: 'Engineer',
  },
  {
    id: uuid(),
    name: 'Natasha Romanoff',
    dateOfBirth: '1984-12-03',
    ssn: '031284-505X',
    gender: Gender.Female,
    occupation: 'Spy',
  },
];

export default patients;