import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
const { v1: uuid } = require('uuid');

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
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

const getPatient = (id: string) => {
  const patient = patients.find(p => p.id === id)
  return patient
}

export default {
  getPatients,
  getPatient,
  getNonSensitivePatients,
  addPatient,
};
