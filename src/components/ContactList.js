import React from 'react';
import phonebookServices from '../services/phonebook';

const ContactList = (props) => {
  const contactsToShow = props.filter
    ? props.contacts.filter((person) =>
        person.name.toLowerCase().includes(props.filter.toLowerCase())
      )
    : props.contacts;

  const deleteContact = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookServices.deleteItem(id);
      props.setContacts(props.contacts.filter((contact) => contact.id !== id));
    }
  };

  return (
    <div>
      {contactsToShow.map((person) => (
        <div key={person.name}>
          {person.name} : {person.number}{' '}
          <button onClick={() => deleteContact(person.name, person.id)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
