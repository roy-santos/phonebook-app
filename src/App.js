import React, { useState } from 'react';
import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '(555) 555-5555' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleNewName = (event) => {
    console.log(event.target.value); // DELETE ME
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    console.log(event.target.value); // DELETE ME
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      console.log(newNumber);
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add New Contact</h3>
      <ContactForm
        name={newName}
        handleNewName={handleNewName}
        number={newNumber}
        handleNewNumber={handleNewNumber}
        handleSubmit={addPerson}
      />
      <h3>Contact List</h3>
      <ContactList filter={filter} contacts={persons} />
    </div>
  );
};

export default App;
