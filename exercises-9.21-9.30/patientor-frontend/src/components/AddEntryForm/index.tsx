import { useState, useEffect } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, OutlinedInput, Chip } from '@mui/material';
import diagnoseService from '../../services/diagnoses';
import { Diagnosis } from '../../types/diagnosis';
import { HealthCheckRating } from '../../types/patient';
import { Entry } from '../../types/patient';

type EntryType = Entry['type'];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  error?: string;
}

export interface BaseEntryFormValues {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export interface HealthCheckEntryFormValues extends BaseEntryFormValues {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntryFormValues extends BaseEntryFormValues {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntryFormValues extends BaseEntryFormValues {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type EntryFormValues = 
  | HealthCheckEntryFormValues 
  | HospitalEntryFormValues 
  | OccupationalHealthcareEntryFormValues;

const AddEntryForm = ({ onSubmit, onCancel, error }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>('HealthCheck');
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const [formValues, setFormValues] = useState<EntryFormValues>({
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    healthCheckRating: HealthCheckRating.Healthy,
    type: 'HealthCheck'
  });

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnosesList = await diagnoseService.getAll();
      setDiagnoses(diagnosesList);
    };
    void fetchDiagnoses();
  }, []);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(formValues);
  };

  return (
    <div>
      <Box sx={{ border: '1px solid #ccc', borderRadius: 1, padding: 2, marginBottom: 2 }}>
        <Typography variant="h6">New Entry</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Entry Type</InputLabel>
          <Select
            value={entryType}
            label="Entry Type"
            onChange={(e) => {
              const newType = e.target.value as EntryType;
              setEntryType(newType);
              
              // Reset form values based on type
              if (newType === 'HealthCheck') {
                setFormValues({
                  description: '',
                  date: '',
                  specialist: '',
                  type: 'HealthCheck',
                  healthCheckRating: HealthCheckRating.Healthy
                });
              } else if (newType === 'Hospital') {
                setFormValues({
                  description: '',
                  date: '',
                  specialist: '',
                  type: 'Hospital',
                  discharge: {
                    date: '',
                    criteria: ''
                  }
                });
              } else if (newType === 'OccupationalHealthcare') {
                setFormValues({
                  description: '',
                  date: '',
                  specialist: '',
                  type: 'OccupationalHealthcare',
                  employerName: ''
                });
              }
            }}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={addEntry}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formValues.description}
            onChange={onValueChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={formValues.date}
            onChange={onValueChange}
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
            inputProps={{
              max: new Date().toISOString().split('T')[0]
            }}
          />
          <TextField
            fullWidth
            label="Specialist"
            name="specialist"
            value={formValues.specialist}
            onChange={onValueChange}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Diagnosis Codes</InputLabel>
            <Select
              multiple
              value={formValues.diagnosisCodes || []}
              onChange={(e) => {
                const value = e.target.value as string[];
                setFormValues(prev => ({
                  ...prev,
                  diagnosisCodes: value
                }));
              }}
              input={<OutlinedInput label="Diagnosis Codes" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((code) => {
                    const diagnosis = diagnoses.find(d => d.code === code);
                    return (
                      <Chip 
                        key={code} 
                        label={`${code} ${diagnosis ? '- ' + diagnosis.name : ''}`} 
                        onDelete={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          const updatedCodes = (formValues.diagnosisCodes || []).filter(c => c !== code);
                          setFormValues(prev => ({
                            ...prev,
                            diagnosisCodes: updatedCodes
                          }));
                        }}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                      />
                    );
                  })}
                </Box>
              )}
            >
              {diagnoses.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  {diagnosis.code} - {diagnosis.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {entryType === 'HealthCheck' && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Health Check Rating</InputLabel>
              <Select
                value={(formValues as HealthCheckEntryFormValues).healthCheckRating}
                label="Health Check Rating"
                name="healthCheckRating"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(event) => onValueChange(event as any)}
              >
                <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
                <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
                <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
                <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
              </Select>
            </FormControl>
          )}

          {entryType === 'Hospital' && (
            <>
              <TextField
                fullWidth
                label="Discharge Date"
                name="discharge.date"
                type="date"
                value={(formValues as HospitalEntryFormValues).discharge.date}
                onChange={(e) => {
                  const hospitalForm = formValues as HospitalEntryFormValues;
                  setFormValues({
                    ...hospitalForm,
                    discharge: {
                      ...hospitalForm.discharge,
                      date: e.target.value
                    }
                  });
                }}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  max: new Date().toISOString().split('T')[0]
                }}
              />
              <TextField
                fullWidth
                label="Discharge Criteria"
                name="discharge.criteria"
                value={(formValues as HospitalEntryFormValues).discharge.criteria}
                onChange={(e) => {
                  const hospitalForm = formValues as HospitalEntryFormValues;
                  setFormValues({
                    ...hospitalForm,
                    discharge: {
                      ...hospitalForm.discharge,
                      criteria: e.target.value
                    }
                  });
                }}
                margin="normal"
                required
              />
            </>
          )}

          {entryType === 'OccupationalHealthcare' && (
            <>
              <TextField
                fullWidth
                label="Employer Name"
                name="employerName"
                value={(formValues as OccupationalHealthcareEntryFormValues).employerName}
                onChange={onValueChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Sick Leave Start Date"
                name="sickLeave.startDate"
                type="date"
                value={(formValues as OccupationalHealthcareEntryFormValues).sickLeave?.startDate || ''}
                onChange={(e) => {
                  const occForm = formValues as OccupationalHealthcareEntryFormValues;
                  setFormValues({
                    ...occForm,
                    sickLeave: {
                      startDate: e.target.value,
                      endDate: occForm.sickLeave?.endDate || ''
                    }
                  });
                }}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  max: new Date().toISOString().split('T')[0]
                }}
              />
              <TextField
                fullWidth
                label="Sick Leave End Date"
                name="sickLeave.endDate"
                type="date"
                value={(formValues as OccupationalHealthcareEntryFormValues).sickLeave?.endDate || ''}
                onChange={(e) => {
                  const occForm = formValues as OccupationalHealthcareEntryFormValues;
                  setFormValues({
                    ...occForm,
                    sickLeave: {
                      startDate: occForm.sickLeave?.startDate || '',
                      endDate: e.target.value
                    }
                  });
                }}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: (formValues as OccupationalHealthcareEntryFormValues).sickLeave?.startDate || ''
                }}
              />
            </>
          )}
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
            >
              Add Entry
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default AddEntryForm;