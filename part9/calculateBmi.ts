const calculateBmi = (height: number, weight: number): string => {
  const bmiValue: number = weight / (height * height) * 10000;
  if (bmiValue < 18.5) {
    return 'Underweight';
  } else if (bmiValue > 18.5 && bmiValue < 24.9) {
    return 'Normal';
  } else if (bmiValue > 24.9 && bmiValue < 29.9) {
    return 'Overweight';
  } else if (bmiValue > 29.9 && bmiValue < 34.9) {
    return 'Obese';
  } else if (bmiValue > 34.9) {
    return 'Extremly obese';
  }
};

console.log(calculateBmi(180, 74));
