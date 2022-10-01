import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        personService
          .getAll()
          .then((initialPersons) => setPersons(initialPersons));
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const addPerson = (e, name, number) => {
    e.preventDefault();
    const personObject = {
      name: name,
      number: number,
    };
    const matchedPerson = persons.find((person) => person.name === name);
    let shouldUpdate = false;

    if (matchedPerson) {
      shouldUpdate = window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`
      );
    }
    try {
      if (!matchedPerson) {
        personService
          .create(personObject)
          .then((initialPersons) => {
            setPersons(
              persons.concat(initialPersons),
              showMessage(setSuccessMessage, `Added ${initialPersons.name}`)
            );
          })
          .catch((error) => {
            showMessage(setErrorMessage, error.response.data.error);
          });
      } else if (matchedPerson && shouldUpdate) {
        personService
          .update({ ...matchedPerson, number })
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) => (p.name !== name ? p : updatedPerson))
            );
            showMessage(setSuccessMessage, `Updated ${updatedPerson.name}`);
          })
          .catch((error) =>
            showMessage(setErrorMessage, error.response.data.error)
          );
      }
    } catch (e) {
      console.error("main error", e);
    }
  };

  const showMessage = (setMessage, message) => {
    setMessage(message);
    setTimeout(() => setMessage(""), 5000);
  };

  const deletePerson = async (id, name) => {
    let shouldDelete = false;
    if (persons.find((p) => p.id === id)) {
      shouldDelete = window.confirm(`Delete ${name}?`);
    }
    if (shouldDelete) {
      try {
        await personService.destroy(id);
        const newPersons = persons.filter((p) => p.id !== id);
        setPersons(newPersons);
        showMessage(setErrorMessage, `Deleted ${name}`);
      } catch (e) {
        showMessage(
          setErrorMessage,
          `${name} has already been removed from server`
        );
        setPersons(persons.filter((p) => p.id !== id));
      }
    } else {
      shouldDelete = false;
    }
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
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <Filter onChange={handleSearchChange} searchText={searchText} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  );
};

export default App;
