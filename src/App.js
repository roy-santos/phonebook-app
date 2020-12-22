import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('effect'); // DELETE ME
    Axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNewName = (event) => {
    console.log(event.target.value); // DELETE ME
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    console.log(event.target.value); // DELETE ME
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    console.log(event.target.value); // DELETE ME
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
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
