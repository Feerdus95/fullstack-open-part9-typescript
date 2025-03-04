import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { Patient } from "../../types/patient";
import { EntryFormValues } from "../AddEntryForm";
import { Male, Female, QuestionMark } from "@mui/icons-material";
import patientService from "../../services/patients";
import EntryDetail from "../EntryDetail";
import AddEntryForm from "../AddEntryForm";
import axios from "axios";
import { apiBaseUrl } from "../../constants";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string>();
  const [showAddEntryForm, setShowAddEntryForm] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await patientService.getById(id as string);
        // Ensure dateOfBirth is not undefined before setting patient
        if (data && data.dateOfBirth && data.ssn) {
          setPatient({
            ...data,
            dateOfBirth: data.dateOfBirth,
            ssn: data.ssn
          });
        } else {
          throw new Error('Invalid patient data: required fields are missing');
        }
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };
    if (id) {
      void fetchPatient();
    }
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const getGenderIcon = () => {
    switch (patient.gender) {
      case "male":
        return <Male />;
      case "female":
        return <Female />;
      default:
        return <QuestionMark />;
    }
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      setPatient({ ...patient!, entries: patient!.entries.concat(newEntry) });
      setShowAddEntryForm(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data?.error) {
          setError(String(e?.response?.data?.error));
        } else {
          setError("An unknown error occurred");
        }
      } else {
        console.error("Unknown error", e);
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h4" component="h1">
          {patient.name} {getGenderIcon()}
        </Typography>
      </Box>
      <Box>
        <Typography>SSN: {patient.ssn}</Typography>
        <Typography>Occupation: {patient.occupation}</Typography>
        <Typography>Date of Birth: {patient.dateOfBirth}</Typography>
      </Box>
      <Box sx={{ marginY: 2 }}>
        <Button variant="contained" onClick={() => setShowAddEntryForm(!showAddEntryForm)}>
          {showAddEntryForm ? "Cancel" : "Add New Entry"}
        </Button>
      </Box>
      {showAddEntryForm && (
        <AddEntryForm
          onSubmit={submitNewEntry}
          onCancel={() => setShowAddEntryForm(false)}
          error={error}
        />
      )}
      <h3>Entries</h3>
      <Box>
        {patient.entries.map(entry => (
          <EntryDetail key={entry.id} entry={entry} />
        ))}
      </Box>
    </div>
  );
};

export default PatientPage;