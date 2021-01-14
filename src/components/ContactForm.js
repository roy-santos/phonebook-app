import React from 'react';
import { Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';


const ContactForm = ({
  name,
  handleNewName,
  number,
  handleNewNumber,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <Typography variant='h6'>
      Add New Contact
    </Typography>    
    <div>
      <TextField fullWidth variant='outlined' size='small' placeholder='Name' value={name} onChange={handleNewName} />
    </div>
    <div>
      <TextField fullWidth variant='outlined' size='small' placeholder='Number' value={number} onChange={handleNewNumber} />
    </div>
    <div>
      <Button fullWidth variant='contained' color='primary' size='small' type='submit'>add</Button>
    </div>
  </form>
);

export default ContactForm;
