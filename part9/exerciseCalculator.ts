type RatingVal = 1 | 2 | 3;
type RatingDesc = 'not so good' | 'you did well' | 'you rock';

interface Rating {
  value: RatingVal;
  description: RatingDesc;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: RatingVal;
  ratingDescription: RatingDesc;
  target: number;
  average: number;
}

const getRating = (average: number, target: number): Rating => {
  const ratio = average / target;
  if (ratio < 0.7) return { value: 1, description: 'not so good' };
  else if (ratio < 1) return { value: 2, description: 'you did well' };
  else return { value: 3, description: 'you rock' };
};

const calculateExercise = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const average = dailyHours.reduce((a, b) => a + b) / periodLength;

  const rating = getRating(average, target);

  return {
    periodLength,
    trainingDays: dailyHours.filter((d) => d > 0).length,
    success: average > target,
    rating: rating.value,
    ratingDescription: rating.description,
    target,
    average,
  };
};

try {
  const args = process.argv.slice(2).map((n) => Number(n));
  const [target, ...durations] = args;
  console.log(calculateExercise(durations, target));
} catch (error: unknown) {
  let errorMessage = 'something bad';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
