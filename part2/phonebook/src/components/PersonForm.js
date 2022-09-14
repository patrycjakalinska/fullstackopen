import React, { useState } from "react";

const PersonForm = ({ addPerson }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  return (
    <form>
      <div>
        <div>
          name: <input value={name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumberChange} />
        </div>
      </div>
      <div>
        <button type="submit" onClick={(e) => addPerson(e, name, number)}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
