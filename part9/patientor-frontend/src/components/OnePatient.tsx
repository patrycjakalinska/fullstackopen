import {
  Patient,
  Diagnose,
  Gender,
  Entry,
  HealthCheckRating,
  EntryWithoutId,
} from '../types';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Typography, Button, Box } from '@mui/material';
import LocalHospitalSharpIcon from '@mui/icons-material/LocalHospitalSharp';
import AddEntryModal from './AddEntryModal';

interface Props {
  patients: Patient[];
  diagnoses: Diagnose[];
}

const genderIcon = (gender: Gender | undefined) => {
  switch (gender) {
    case 'female':
      return <FemaleIcon />;
    case 'male':
      return <MaleIcon />;
    default:
      return null;
  }
};

const HealthCheckOpt = (health: HealthCheckRating) => {
  switch (health) {
    case 0:
      return <LocalHospitalSharpIcon sx={{ color: 'green' }} />;
    case 1:
      return <LocalHospitalSharpIcon sx={{ color: 'yellow' }} />;
    case 2:
      return <LocalHospitalSharpIcon sx={{ color: 'orange' }} />;
    case 3:
      return <LocalHospitalSharpIcon sx={{ color: 'red' }} />;
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <div>{HealthCheckOpt(entry.healthCheckRating)}</div>;
    case 'Hospital':
      return (
        <div>
          <p>Discharge date: {entry.discharge.date}</p>
          <p>Criteria: {entry.discharge.criteria}</p>
        </div>
      );

    case 'OccupationalHealthcare':
      return (
        <div>
          {entry.sickLeave ? (
            <p>
              Sick leave: {entry.sickLeave.startDate} -{' '}
              {entry.sickLeave.endDate}
            </p>
          ) : null}
        </div>
      );

    default:
      return assertNever(entry);
  }
};

const OnePatient = ({ patients, diagnoses }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams();
  let patient = id ? patients.find((p) => p.id === id) : null;

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      if (patient) {
        const entry = await patientService.createEntry(values, patient.id);
        patient = { ...patient, entries: patient.entries.concat(entry) };
        setModalOpen(false);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <Box>
      <Typography my={2} variant="h4">
        {patient?.name} {genderIcon(patient?.gender)}
      </Typography>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <AddEntryModal
        diagnoses={diagnoses}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        modalOpen={modalOpen}
      />
      {patient?.entries.length !== 0 && (
        <Typography my={1} variant="h6">
          entries
        </Typography>
      )}
      {patient?.entries.map((e) => (
        <Box sx={{ border: 2, borderRadius: '9px' }} my={2} p={2} key={e.id}>
          {e.date} <i>{e.description}</i>
          {e.diagnosisCodes ? (
            <ul>
              {e.diagnosisCodes?.map((d) => {
                const diagnosis = diagnoses.find(
                  (diagnose) => diagnose.code === d
                )?.name;
                return (
                  <li key={d}>
                    {d} {diagnosis ? diagnosis : null}
                  </li>
                );
              })}
            </ul>
          ) : null}
          <EntryDetails entry={e} />
          <div>Diagnose by: {e.specialist}</div>
        </Box>
      ))}
      <Button variant="contained" onClick={() => openModal()}>
        Add Entry
      </Button>
    </Box>
  );
};

export default OnePatient;
