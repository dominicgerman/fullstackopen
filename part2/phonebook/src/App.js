import { useState } from 'react';
import { useEffect } from 'react';

import axios from 'axios';

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

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} <span>{person.number}</span>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('a new name...');
  const [newNumber, setNewNumber] = useState('a new numbahhh...');
  const [newFilter, setNewFilter] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled');
      setPersons(response.data);
    });
  }, []);

  console.log('render', persons.length, 'persons');

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (!persons.every((el) => el.name !== newName)) {
      return alert(`${newName} is already added to phonebook`);
    }

    if (!persons.every((el) => el.number !== newNumber)) {
      return alert(`${newNumber} is already added to phonebook`);
    }

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
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
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
