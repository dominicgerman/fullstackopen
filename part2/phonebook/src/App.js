import { useState } from 'react';
import { useEffect } from 'react';
import personService from './services/persons';
import ErrorMsg from './ErrorMsg';
import SuccessMsg from './SuccessMsg';

const PersonForm = ({
  handleSubmit,
  handleNameChange,
  handleNumberChange,
  name,
  number,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Filter = ({ filter, handler }) => {
  return (
    <div>
      filter shown with
      <input value={filter} onChange={handler} />
    </div>
  );
};

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} <span>{person.number}</span>
      <button onClick={deletePerson}>delete</button>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('a new name...');
  const [newNumber, setNewNumber] = useState('a new number...');
  const [newFilter, setNewFilter] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (!persons.every((el) => el.name !== newName)) {
      alert(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      return updateNumber(personObject);
    }

    // if (!persons.every((el) => el.number !== newNumber)) {
    //   return alert(`${newNumber} is already added to phonebook`);
    // }

    personService.create(personObject).then((returnedPerson) => {
      setSuccessMessage(`Added ${newName}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    });
  };

  const updateNumber = (newObject) => {
    const person = persons.find((p) => p.name === newObject.name);
    const changedPerson = { ...person, number: newObject.number };

    personService
      .update(person.id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((p) => (p.id !== changedPerson.id ? p : returnedPerson))
        );
        setNewName('');
        setNewNumber('');
      })
      .catch((error) => {
        setErrorMessage(
          `Information of '${person.name}' has already been removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);

    window.confirm(`Delete ${person.name}?`);
    personService.remove(id).then((response) => response);
    setPersons(persons.filter((p) => p.id !== id));
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    setShowAll(false);
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMsg message={successMessage} />
      <ErrorMsg message={errorMessage} />
      <Filter filter={newFilter} handler={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        name={newName}
        number={newNumber}
      />
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person) => (
          <Person
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
