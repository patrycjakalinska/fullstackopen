import { Patient, Diagnose, Gender } from '../types';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Typography } from '@mui/material';

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

const OnePatient = ({ patients, diagnoses }: Props) => {
  const { id } = useParams();
  const patient = id ? patients.find((p) => p.id === id) : null;
  return (
    <div>
      <Typography my={2} variant="h4">
        {patient?.name} {genderIcon(patient?.gender)}
      </Typography>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
    </div>
  );
};

export default OnePatient;
