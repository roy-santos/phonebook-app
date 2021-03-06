import React, { useState, useEffect } from 'react';
import phonebookServices from './services/phonebook';
import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Notification from './components/Notification';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    phonebookServices.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
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
          .catch((error) => {
            if (error.message.includes('400')) {
              setMessage('Error: Number must contain at least 8 digits');
            } else {
              setMessage(
                `Error: Contact info for ${person.name} has already been removed from server`
              );
              setTimeout(() => {
                setMessage(null);
              }, 5000);
              setPersons(
                persons.filter((contact) => contact.name !== person.name)
              );
            }
          });
      }
    } else {
      phonebookServices
        .create(personObject)
        .then((returnedContact) => {
          setMessage(`Added ${returnedContact.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setPersons(persons.concat(returnedContact));
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          if (error.response.data.error.includes('name')) {
            setMessage('Error: Name must contain at least 3 characters');
          } else {
            setMessage('Error: Number must contain at least 8 digits');
          }
        });
    }
  };

  return (
    <div>
      <Grid container spacing={2} justify='center' direction='row' alignItems='center'>
        <Grid item xs={7}>
          <Typography variant='h3'>
            Phonebook
          </Typography>
          <Notification message={message} />
        </Grid>
        <Grid item xs={7}>
          <Filter filter={filter} handleFilter={handleFilter} />
          <ContactForm
            name={newName}
            handleNewName={handleNewName}
            number={newNumber}
            handleNewNumber={handleNewNumber}
            handleSubmit={addPerson}
          />
        </Grid>
        <Grid item xs={7}>
          <ContactList
            filter={filter}
            contacts={persons}
            setContacts={setPersons}
            setMessage={setMessage}
            />
        </Grid>
        </Grid>
    </div>
  );
};

export default App;
