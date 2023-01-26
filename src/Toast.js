import React from 'react';

// MUI imports
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Server helpers
import { onMessage } from './service/mockServer';

export default function Toast() {
  const [open, setOpen] = React.useState(false);
  const [toastData, setToastData] = React.useState();
  const [toastId, setToastId] = React.useState();

  const generateToast = (formSubmission) => {
    setToastId(formSubmission.id);
    setToastData(formSubmission.data);
    

    setOpen(true);
  };

  onMessage(generateToast);

  const getToastMessage = () => {
    const messageString = `${toastData?.firstName} ${toastData?.lastName} - ${toastData?.email}`;
    return messageString;
  }

  const closeToast = () => {
    setOpen(false);
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
      open={open}
      autoHideDuration={8000}
      message={getToastMessage()}
      action={action}
      onclose={closeToast}
      key={toastData?.id}
    />
  );
}
