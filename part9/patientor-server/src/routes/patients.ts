import express from 'express';
import patientService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

export default router;
