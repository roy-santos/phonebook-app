import React from 'react';

const Notification = ({ message }) => {
  const color =
    message === null || message.includes('Deleted') || message.includes('Error')
      ? 'red'
      : 'green';

  const NotificationStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  }

  return <div style={NotificationStyle}>{message}</div>;
};

export default Notification;
