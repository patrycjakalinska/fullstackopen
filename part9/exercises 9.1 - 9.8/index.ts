import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercise, Result } from './exerciseCalculator';
import bodyParser from 'body-parser';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  try {
    if (isNaN(height) || isNaN(weight)) {
      throw new Error('malformatted data');
    }
  } catch (err) {
    res.status(400).send(err);
  }

  const result = { height, weight, bmi: calculateBmi(height, weight) };
  res.send(result);
});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const daily_exercises = req.body.daily_exercises as number[];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = req.body.target as number;

  try {
    if (!target || !daily_exercises) {
      throw new Error('params missing');
    } 
    if (isNaN(target) || daily_exercises.some(isNaN)) {
      throw new Error('malformatted data');
    }

    const result: Result = calculateExercise(
      daily_exercises.map((e) => Number(e)),
      target
    );
    res.send({ result }).status(200);
  } catch (err) {
    res.status(400).send((err as Error).message);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
