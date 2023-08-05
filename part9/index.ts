import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
