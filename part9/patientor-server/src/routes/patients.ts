import express from 'express';
import patientService from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const foundPatient = patientService.getPatient(id);
    res.json(foundPatient);
  } catch (err: unknown) {
    let errorMessage = 'Something bad happened.';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
