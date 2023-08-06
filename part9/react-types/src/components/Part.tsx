import { CoursePart } from '../types';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercise count: {part.exerciseCount}</p>
          <p>
            <i>{part.description}</i>
          </p>
        </div>
      );
    case 'group':
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercise count: {part.exerciseCount}</p>
          <p>project exeercises: {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercise count: {part.exerciseCount}</p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>submit to: {part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercise count: {part.exerciseCount}</p>
          <p>
            <i>{part.description}</i>
          </p>
          <div>
            required skills:
            {part.requirements.map((requirement) => (
              <span> {requirement}</span>
            ))}
          </div>
        </div>
      );
  }
};

export default Part;
