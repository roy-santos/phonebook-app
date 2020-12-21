import React from 'react';

const ContactForm = ({
  name,
  handleNewName,
  number,
  handleNewNumber,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      Name: <input value={name} onChange={handleNewName} />
    </div>
    <div>
      Number: <input value={number} onChange={handleNewNumber} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
);

export default ContactForm;
