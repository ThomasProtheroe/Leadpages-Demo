import React from 'react';

// MUI imports
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Server helpers
import { onMessage } from './service/mockServer';

export default function Toast() {
  const [isOpen, setIsOpen] = React.useState(false);

  const generateToast = (formSubmission) => {
    //TODO - load form submission data into toast for display

    setIsOpen(true);
  };

  onMessage(generateToast);

  const closeToast = () => {
    setIsOpen(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={closeToast}>
        Like
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeToast}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={10000}
      message="Name/email goes here"
      action={action}
    />
  );
}
