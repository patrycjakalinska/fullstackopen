import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { EntryWithoutId, HealthCheckRating, Diagnose } from '../../types';
import { SyntheticEvent, useState } from 'react';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnose[];
}

interface healthCheckRatingOption {
  value: number;
  label: string;
}
const healthCheckRatingOptions: healthCheckRatingOption[] = Object.values(
  HealthCheckRating
)
  .filter((value) => typeof value === 'number')
  .map((v) => ({ value: v as number, label: HealthCheckRating[v as number] }));

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnose['code']>>(
    []
  );
  const [entryType, setEntryType] = useState('HealthCheck');
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [employerName, setEmployerName] = useState('');

  const onDiagnosisCodesChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    event.preventDefault();

    const value = event.target.value;

    typeof value === 'string'
      ? setDiagnosisCodes(value.split(', '))
      : setDiagnosisCodes(value);
    console.log(diagnosisCodes);
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();

    const value = Number(event.target.value);
    console.log(value);

    const healthCheckRating = Object.values(HealthCheckRating);
    console.log(healthCheckRating);

    if (value && healthCheckRating.includes(value)) {
      setHealthCheckRating(value);
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes,
    };
    console.log(baseEntry);
    switch (entryType) {
      case 'HealthCheck':
        console.log(baseEntry);
        onSubmit({
          type: 'HealthCheck',
          ...baseEntry,
          healthCheckRating,
        });
        break;
      case 'OccupationalHealthcare':
        onSubmit({
          type: 'OccupationalHealthcare',
          ...baseEntry,
          employerName: employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
              : undefined,
        });
        break;
      case 'Hospital':
        onSubmit({
          type: 'Hospital',
          ...baseEntry,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
    }
  };

  const additionalFields = (entryType: string) => {
    switch (entryType) {
      case 'HealthCheck':
        return (
          <div>
            <FormLabel id="demo-radio-buttons-group-label">
              Health Check Rating
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="1"
              row
              name="radio-buttons-group"
              onChange={onHealthCheckRatingChange}
            >
              {healthCheckRatingOptions.map((option) => (
                <FormControlLabel
                  key={option.label}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </div>
        );
      case 'OccupationalHealthcare':
        return (
          <div>
            <InputLabel style={{ marginTop: 20 }}>Employer Name</InputLabel>
            <TextField
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />

            <InputLabel style={{ marginTop: 20 }}>Sick Leave: </InputLabel>
            <InputLabel style={{ marginTop: 5 }}>Start Date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <InputLabel style={{ marginTop: 5 }}>End Date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </div>
        );
      case 'Hospital':
        return (
          <div>
            <InputLabel style={{ marginTop: 5 }}>Discharge date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <InputLabel style={{ marginTop: 5 }}>Discharge criteria</InputLabel>
            <TextField
              fullWidth
              placeholder="criteria"
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </div>
        );
    }
  };

  return (
    <div>
      <InputLabel id="demo-simple-select-label">Entry type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={entryType}
        label="EntryType"
        onChange={(event) => setEntryType(event.target.value)}
      >
        <MenuItem value={'HealthCheck'}>HealthCheck</MenuItem>
        <MenuItem value={'OccupationalHealthcare'}>
          OccupationalHealthcare
        </MenuItem>
        <MenuItem value={'Hospital'}>Hospital</MenuItem>
      </Select>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
        <TextField
          fullWidth
          placeholder="description"
          variant="outlined"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <TextField
          fullWidth
          type="date"
          variant="outlined"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <InputLabel id="demo-multiple-name-label">Diagnosis codes</InputLabel>
        <Select
          label="Diagnosis codes"
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosisCodesChange}
          input={<OutlinedInput label="Multiple Select" />}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem value={diagnosis.code} key={diagnosis.code}>
              {diagnosis.code}
            </MenuItem>
          ))}
        </Select>
        <InputLabel style={{ marginTop: 20 }}>Specialist</InputLabel>
        <TextField
          fullWidth
          placeholder="specialist"
          variant="outlined"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {additionalFields(entryType)}
        <Grid my={2}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
            >
              cancel
            </Button>
          </Grid>

          <Grid item>
            <Button
              style={{ float: 'right' }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
