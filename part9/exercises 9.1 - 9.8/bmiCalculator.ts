export const calculateBmi = (height: number, weight: number): string => {
  const bmiValue: number = (weight / (height * height)) * 10000;
  if (bmiValue < 18.5) {
    return 'Underweight';
  } else if (bmiValue < 24.9) {
    return 'Normal';
  } else if (bmiValue < 29.9) {
    return 'Overweight';
  } else if (bmiValue < 34.9) {
    return 'Obese';
  } else return 'Extremly obese';
};

try {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad! ';
  if (error instanceof Error) {
    errorMessage += 'Error ' + error.message;
  }
  console.log(errorMessage);
}
