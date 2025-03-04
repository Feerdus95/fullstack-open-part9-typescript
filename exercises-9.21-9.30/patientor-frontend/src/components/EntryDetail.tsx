import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Entry } from '../types/patient';
import { Work, LocalHospital, MedicalServices, Favorite } from '@mui/icons-material';

interface EntryDetailProps {
  entry: Entry;
}

const EntryDetail: React.FC<EntryDetailProps> = ({ entry }) => {
  const renderEntryDetails = () => {
    switch (entry.type) {
      case 'OccupationalHealthcare':
        return (
          <Card variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">
                <Work /> Occupational Healthcare Entry
              </Typography>
              <Typography><strong>Date:</strong> {entry.date}</Typography>
              <Typography><strong>Description:</strong> {entry.description}</Typography>
              <Typography><strong>Specialist:</strong> {entry.specialist}</Typography>
              <Typography><strong>Employer:</strong> {entry.employerName}</Typography>
              {entry.sickLeave && (
                <Typography>
                  <strong>Sick Leave:</strong> {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
                </Typography>
              )}
              <Typography><strong>Diagnose Codes:</strong> {entry.diagnoseCodes?.join(', ') || 'N/A'}</Typography>
            </CardContent>
          </Card>
        );

      case 'Hospital':
        return (
          <Card variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">
                <LocalHospital /> Hospital Entry
              </Typography>
              <Typography><strong>Date:</strong> {entry.date}</Typography>
              <Typography><strong>Description:</strong> {entry.description}</Typography>
              <Typography><strong>Specialist:</strong> {entry.specialist}</Typography>
              <Typography><strong>Discharge Date:</strong> {entry.discharge.date}</Typography>
              <Typography><strong>Criteria:</strong> {entry.discharge.criteria}</Typography>
              <Typography><strong>Diagnose Codes:</strong> {entry.diagnoseCodes?.join(', ') || 'N/A'}</Typography>
            </CardContent>
          </Card>
        );
        
      case 'HealthCheck':
        return (
          <Card variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">
                <MedicalServices /> Health Check Entry
              </Typography>
              <Typography><strong>Date:</strong> {entry.date}</Typography>
              <Typography><strong>Description:</strong> {entry.description}</Typography>
              <Typography><strong>Specialist:</strong> {entry.specialist}</Typography>
              <Typography>
                <strong>Health Check Rating:</strong> 
                {entry.healthCheckRating === 0 && <Favorite sx={{ color: 'green' }} />}
                {entry.healthCheckRating === 1 && <Favorite sx={{ color: 'yellow' }} />}
                {entry.healthCheckRating === 2 && <Favorite sx={{ color: 'orange' }} />}
                {entry.healthCheckRating === 3 && <Favorite sx={{ color: 'red' }} />}
                ({entry.healthCheckRating})
              </Typography>
              <Typography><strong>Diagnose Codes:</strong> {entry.diagnoseCodes?.join(', ') || 'N/A'}</Typography>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return <Box>{renderEntryDetails()}</Box>;
};

export default EntryDetail;