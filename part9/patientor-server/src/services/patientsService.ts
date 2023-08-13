import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, EntryWithoutId, Entry } from '../types';
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

const addEntry = (entry: EntryWithoutId, id: string) : Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  }
  const patient = patients.find(p => p.id === id)
  patient?.entries.push(newEntry)
  return newEntry
}

const getPatient = (id: string): Patient | undefined => {
  console.log('AAAAAAAAAA')
  console.log('id backend: ' + id);
  console.log(patients)
  const patient = patients.find((p) => p.id === id);
  return patient;
};

export default {
  getPatients,
  getPatient,
  getNonSensitivePatients,
  addPatient,
  addEntry
};
