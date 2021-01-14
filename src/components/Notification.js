import React from 'react';
import { Alert } from '@material-ui/lab';

const Notification = ({ message }) => {
  const severity =
    message === null || message.includes('Deleted') || message.includes('Error')
      ? 'error'
      : 'success';

  if (message === null) {
    return null;
  }

  return (
    <div>
      <Alert severity={severity}>
        {message}
      </Alert>
    </div>
  )
};

export default Notification;
