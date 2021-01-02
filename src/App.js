import React, { useState, useEffect } from 'react';
import phonebookServices from './services/phonebook';
import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    //console.log('effect'); // DELETE ME
    phonebookServices.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

  const handleNewName = (event) => {
    //console.log(event.target.value); // DELETE ME
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    //console.log(event.target.value); // DELETE ME
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    //console.log(event.target.value); // DELETE ME
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.map((person) => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace the old number with the new one?`
        )
      ) {
        const person = persons.find((p) => p.name === newName);
        phonebookServices
          .update(person.id, personObject)
          .then((returnedContact) => {
            setMessage(`Updated ${returnedContact.name}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(
              persons.map((contact) =>
                contact.id !== person.id ? contact : returnedContact
              )
            );
            setNewName('');
            setNewNumber('');
          })
          .catch((err) => {
            setMessage(
              `Contact info for ${person.name} has already been removed from server`
            );
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(
              persons.filter((contact) => contact.name !== person.name)
            );
          });
      }
    } else {
      phonebookServices.create(personObject).then((returnedContact) => {
        setMessage(`Added ${returnedContact.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setPersons(persons.concat(returnedContact));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <ContactList
        filter={filter}
        contacts={persons}
        setContacts={setPersons}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
