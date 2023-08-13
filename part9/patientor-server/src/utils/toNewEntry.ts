import {
  Diagnose,
  EntryWithoutId,
  HealthCheckRating,
  NewBaseEntry,
  SickLeave,
  Discharge,
} from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing data');
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnose['code']>;
  }

  return object.diagnosisCodes as Array<Diagnose['code']>;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === 'number' || text instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    !healthCheckRating ||
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      'Incorrect or missing healthCheckRating: ' + healthCheckRating
    );
  }
  return healthCheckRating;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('startDate' in object && 'endDate' in object) {
    const sickLeave: SickLeave = {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    };
    return sickLeave;
  }
  throw new Error('Start date or/and end date missing!');
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('date' in object && 'criteria' in object) {
    const discharge: Discharge = {
      date: parseDate(object.date),
      criteria: parseString(object.criteria),
    };
    return discharge;
  }
  throw new Error('Criteria and/or date missing!');
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('date' in object && 'specialist' in object && 'description' in object) {
    const newBaseEntry: NewBaseEntry =
      'diagnosisCodes' in object
        ? {

            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            description: parseString(object.description),
            diagnosisCodes: parseDiagnosisCodes(object),
          }
        : {
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            description: parseString(object.description),
          };

    if ('type' in object) {
      switch (object.type) {
        case 'HealthCheck':
          if ('healthCheckRating' in object) {
            let healthCheckRatingEntry: EntryWithoutId = {
              ...newBaseEntry,
              type: 'HealthCheck',
              healthCheckRating: parseHealthCheckRating(
                object.healthCheckRating
              ),
            };
            return healthCheckRatingEntry;
          }
          throw new Error('Incorrect data: Health Check Rating missing!');
        case 'Hospital':
          if ('discharge' in object) {
            let hospitalEntry: EntryWithoutId = {
              ...newBaseEntry,
              type: 'Hospital',
              discharge: parseDischarge(object.discharge),
            };
            return hospitalEntry;
          }
          throw new Error('Incorrect data: discharge info missing!');

        case 'OccupationalHealthcare':
          if ('employerName' in object) {
            let occupationalHealthcareEntry: EntryWithoutId;
            'sickLeave' in object
              ? (occupationalHealthcareEntry = {
                  ...newBaseEntry,
                  type: 'OccupationalHealthcare',
                  employerName: parseString(object.employerName),
                  sickLeave: parseSickLeave(object.sickLeave),
                })
              : (occupationalHealthcareEntry = {
                  ...newBaseEntry,
                  type: 'OccupationalHealthcare',
                  employerName: parseString(object.employerName),
                });
            return occupationalHealthcareEntry;
          }
          throw new Error('Incorrect data: employer name missing!');
      }
    }
  }
  throw new Error('A field is missing!');
};

export default toNewEntry;
