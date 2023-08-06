import { CoursePart } from '../types';

const Total = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): JSX.Element => {
  const totalRes = courseParts.reduce(
    (total, part) => total + part.exerciseCount,
    0
  );
  return <h4>Number of exercises {totalRes}</h4>;
};

export default Total