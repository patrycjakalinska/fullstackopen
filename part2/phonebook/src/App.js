import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (e, name, number) => {
    e.preventDefault();

    const person = {
      name: name,
      number: number,
    };

    persons.filter((person) => person.name === name).length > 0
      ? alert(`${name} is already added to phonebook`)
      : setPersons(persons.concat(person));
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredPersons =
    searchText.length > 0
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearchChange} searchText={searchText} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={() => {
          addPerson();
          setSearchText("");
        }}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
