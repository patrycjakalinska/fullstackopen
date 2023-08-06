import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient } from '../types';
const { v1: uuid } = require('uuid');

const getPatients = (): Patient[] => {
  return patients;
};

const getSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getSensitivePatients,
  addPatient
};
