import React from 'react';

const ContactList = (props) => {
  console.log(props);

  const contactsToShow = props.filter
    ? props.contacts.filter((person) =>
        person.name.toLowerCase().includes(props.filter.toLowerCase())
      )
    : props.contacts;

  return (
    <div>
      {contactsToShow.map((person) => (
        <div key={person.name}>
          {person.name} : {person.number}
        </div>
      ))}
    </div>
  );
};

export default ContactList;
