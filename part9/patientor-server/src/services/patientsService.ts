import patients from '../../data/patients';
import { Patient, NewPatient } from '../types';
const { v1: uuid } = require('uuid');

const getPatients = (): Patient[] => {
  return patients;
};

const getSensitivePatients = (): Patient[] => {
  return patients.map(({ id, name, dateOfBirth, ssn, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
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
  addPatient,
};
