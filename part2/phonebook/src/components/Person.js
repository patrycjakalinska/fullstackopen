const Person = ({ person, onDelete }) => {
  const { name, number } = person;

  return (
    <div>
      {name} {number}
      <button onClick={() => onDelete(person.id, name)}>delete</button>
    </div>
  );
};

export default Person;
