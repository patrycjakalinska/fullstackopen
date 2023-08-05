interface PersonParams {
  height: number;
  weight: number;
}
const parseArgument = (args: string[]): PersonParams => {
  if (args.length < 4) throw new Error('Not enough');
  if (args.length > 4) throw new Error('too many');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Not numbers');
  }
};

const calculateBmi = (height: number, weight: number): string => {
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
  const { height, weight } = parseArgument(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad! ';
  if (error instanceof Error) {
    errorMessage += 'Error ' + error.message;
  }
  console.log(errorMessage);
}
