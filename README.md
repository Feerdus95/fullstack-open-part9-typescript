# Full Stack Open Part 9 - TypeScript Exercises 9.1 to 9.30

This project implements a simple API for calculating BMI and exercise statistics, built with TypeScript and Express.

## Features

### 1. BMI Calculator
- **Endpoint**: `GET /bmi`
- **Query Parameters**:
  - `height`: Height in centimeters (number)
  - `weight`: Weight in kilograms (number)
- **Response**:
  ```json
  {
    "weight": 75,
    "height": 180,
    "bmi": "Normal (healthy weight)"
  }
  ```
- **Error Handling**:
  - Returns `400 Bad Request` with an error message if parameters are missing or malformed.

### 2. Exercise Calculator
- **Endpoint**: `POST /exercises`
- **Request Body**:
  ```json
  {
    "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
    "target": 2.5
  }
  ```
- **Response**:
  ```json
  {
    "periodLength": 7,
    "trainingDays": 4,
    "success": false,
    "rating": 1,
    "ratingDescription": "bad",
    "target": 2.5,
    "average": 1.2142857142857142
  }
  ```
- **Error Handling**:
  - Returns `400 Bad Request` with an error message if parameters are missing or malformed.

## Exercises 9.8 to 9.14: Patientor Backend

### Overview
The Patientor backend is a TypeScript-based Express application that provides API endpoints for managing patient and diagnosis data. It includes features such as data validation, type safety, and CORS support.

### Features Implemented
1. **Exercise 9.8**: Initialized the backend project with TypeScript and Express.
2. **Exercise 9.9**: Created a `GET /api/ping` endpoint to confirm the server is running.
3. **Exercise 9.10**: Added a `GET /api/diagnoses` endpoint to fetch all diagnoses.
4. **Exercise 9.11**: Added a `GET /api/patients` endpoint to fetch all patients, excluding the `ssn` field.
5. **Exercise 9.12**: Implemented a `POST /api/patients` endpoint to add new patients.
6. **Exercise 9.13**: Refactored the `gender` field to use an enum for type safety.
7. **Exercise 9.14**: Used Zod to validate requests to the `POST /api/patients` endpoint.

### Running the Backend
1. Navigate to the `patientor-backend` directory:
   ```bash
   cd exercises-9.8-9.14/patientor-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The server will run on port `3001`.

### API Endpoints
- **GET /api/ping**: Confirms the server is running.
- **GET /api/diagnoses**: Fetches all diagnoses.
- **GET /api/patients**: Fetches all patients, excluding the `ssn` field.
- **POST /api/patients**: Adds a new patient. Requires the following fields:
  - `name`: String (required)
  - `dateOfBirth`: String (required)
  - `ssn`: String (optional)
  - `gender`: Enum (`male`, `female`, `other`) (required)
  - `occupation`: String (required)

### Data Structures
- **Patient**:
  ```typescript
  interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
  }
  ```
- **PublicPatient**: A type that excludes the `ssn` field from Patient.

### Validation
The `POST /api/patients` endpoint uses Zod for validation. The schema ensures all required fields are present and valid.

## Exercises 9.15 to 9.20: Flight Diary Application

### Overview
The Flight Diary application is a full-stack TypeScript project consisting of a backend API and a React frontend. It allows users to manage flight diary entries with proper type safety and validation.

### Features Implemented
1. **Exercise 9.15**: Set up the flight diary backend with TypeScript.
2. **Exercise 9.16**: Implemented backend validation for diary entries.
3. **Exercise 9.17**: Created the frontend with React and TypeScript.
4. **Exercise 9.18**: Added functionality to fetch and display diary entries.
5. **Exercise 9.19**: Implemented form validation and error handling.
6. **Exercise 9.20**: Enhanced the UI with styling and user feedback.

### Running the Application

#### Backend
1. Navigate to the flight diary backend directory:
   ```bash
   cd exercises-9.15-9.20/flight-diary-back
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

#### Frontend
1. Navigate to the flight diary frontend directory:
   ```bash
   cd exercises-9.15-9.20/flight-diary-front
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### API Endpoints
- **GET /api/diaries**: Fetches all diary entries
- **POST /api/diaries**: Adds a new diary entry with the following fields:
  - `date`: String (YYYY-MM-DD format)
  - `visibility`: String (enum: 'great' | 'good' | 'ok' | 'poor')
  - `weather`: String (enum: 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy')
  - `comment`: String

### Data Structures
- **DiaryEntry**:
  ```typescript
  interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
  }
  ```

### Frontend Features
- Responsive design with modern UI components
- Real-time form validation
- Error handling with user-friendly messages
- Type-safe API communication

## Exercises 9.21 to 9.30: Enhanced Patientor Application

### Overview
The Enhanced Patientor application builds upon the previous version, adding support for different types of entries (Hospital, OccupationalHealthcare) and improving the user interface. The application demonstrates advanced TypeScript features and proper type safety implementation.

### Features Implemented
1. **Exercise 9.21-9.24**: Enhanced the data structure with new entry types
   - Added support for Hospital entries
   - Implemented OccupationalHealthcare entries
   - Created type guards for different entry types
   - Updated the backend to handle the new entry types

2. **Exercise 9.25-9.27**: Improved frontend functionality
   - Implemented entry listing in patient page
   - Added entry details display with type-specific information
   - Enhanced type safety with proper discriminated unions

3. **Exercise 9.28-9.30**: Added entry creation functionality
   - Implemented form for adding new entries
   - Added validation for entry-specific fields
   - Enhanced error handling and user feedback

### Running the Enhanced Application

#### Backend
1. Navigate to the patientor backend directory:
   ```bash
   cd exercises-9.21-9.30/patientor-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

#### Frontend
1. Navigate to the patientor frontend directory:
   ```bash
   cd exercises-9.21-9.30/patientor-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### New Data Structures
- **Entry Types**:
  ```typescript
  interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<string>;
  }

  interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
      date: string;
      criteria: string;
    };
  }

  interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
      startDate: string;
      endDate: string;
    };
  }
  ```

### New API Endpoints
- **GET /api/patients/:id**: Fetches detailed patient information including entries
- **POST /api/patients/:id/entries**: Adds a new entry to a patient's record
  - Supports different entry types (Hospital, OccupationalHealthcare)
  - Includes type-specific validation

### Enhanced Frontend Features
- Type-safe entry handling with discriminated unions
- Improved UI for displaying different entry types
- Form validation for entry-specific fields
- Real-time error handling and user feedback

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the Server in Development Mode**:
   ```bash
   npm run dev
   ```

3. **Build the Project**:
   ```bash
   npm run build
   ```

4. **Start the Server in Production Mode**:
   ```bash
   npm start
   ```

## Technologies Used
- **TypeScript**: For type safety and modern JavaScript features.
- **Express**: For building the API.
- **ESLint**: For code linting and style enforcement.
- **React**: For building the frontend user interface.
- **Zod**: For runtime type validation.

## Directory Structure
- `exercises-9.1-9.7/`: BMI and Exercise Calculator
  - `src/`: Contains TypeScript source files
    - `bmiCalculator.ts`: Logic for BMI calculation
    - `exerciseCalculator.ts`: Logic for exercise statistics calculation
    - `index.ts`: Main server file with API endpoints
  - `dist/`: Contains compiled JavaScript files

- `exercises-9.8-9.14/`: Initial Patientor Application
  - `patientor-backend/`
    - `src/`: Backend source files
      - `routes/`: API route handlers
      - `services/`: Business logic
      - `types/`: TypeScript type definitions
      - `utils/`: Utility functions
    - `data/`: JSON data files
  - `patientor-frontend/`
    - `src/`: Frontend React components and logic
    - `public/`: Static assets

- `exercises-9.15-9.20/`: Flight Diary Application
  - `flight-diary-back/`
    - `src/`: Backend source files
      - `routes/`: API endpoints
      - `services/`: Business logic
      - `types/`: Type definitions
    - `data/`: Flight diary entries
  - `flight-diary-front/`
    - `src/`: React components and TypeScript files
    - `public/`: Static assets

- `exercises-9.21-9.30/`: Enhanced Patientor Application
  - `patientor-backend/`
    - `src/`
      - `routes/`: Enhanced API endpoints
      - `services/`: Extended business logic
      - `types/`: Advanced type definitions
      - `utils/`: Helper functions
    - `data/`: JSON data with extended entry types
  - `patientor-frontend/`
    - `src/`
      - `components/`: React components
      - `types/`: TypeScript interfaces
      - `services/`: API integration
    - `public/`: Static assets

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
