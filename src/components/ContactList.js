import React from 'react';
import phonebookServices from '../services/phonebook';
import Button from '@material-ui/core/Button';
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const ContactList = (props) => {
  const contactsToShow = props.filter
    ? props.contacts.filter((person) =>
        person.name.toLowerCase().includes(props.filter.toLowerCase())
      )
    : props.contacts;

  const deleteContact = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookServices.deleteItem(id);
      props.setMessage(`Deleted ${name}`);
      setTimeout(() => {
        props.setMessage(null);
      }, 5000);
      props.setContacts(props.contacts.filter((contact) => contact.id !== id));
    }
  };

  return (
    <div>
      <Typography variant='h6'>Contact List</Typography>
      <TableContainer style={{ overflow:'auto', height: 200 }} component={Paper}>
        <Table>
          <TableBody>
            {contactsToShow.map((person) => (
              <TableRow key={person.id} style={{ height: '35px' }}>
                <TableCell size='small' children='node' variant='body'>
                  <Typography variant='body2'>
                    {person.name} : {person.number}{' '}
                    <Button variant='contained' color='secondary' size='small' onClick={() => deleteContact(person.name, person.id)}>
                      Delete
                    </Button>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
       </Table>
      </TableContainer>
    </div>
  );
};

export default ContactList;
