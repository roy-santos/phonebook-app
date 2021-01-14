import React from 'react';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';


const Filter = ({ filter, handleFilter }) => {

  return ( 
  <div>
    <Typography variant='h6'>
      Filter Contact List
    </Typography> 
    <TextField fullWidth variant='outlined' size='small' placeholder='ex. John' value={filter} onChange={handleFilter} />
  </div>
  )
 };

export default Filter;
