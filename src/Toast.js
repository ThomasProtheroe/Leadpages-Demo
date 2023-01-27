import { useState, useEffect } from 'react';

// MUI imports
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Server helpers
import { onMessage, saveLikedFormSubmission } from './service/mockServer';

export default function Toast({ updateFunction, maxServerRetries }) {
  const [open, setOpen] = useState(false);
  const [toastData, setToastData] = useState();
  const [toastId, setToastId] = useState();

  // Form submission data comes from the server,
  // you can see the data format in mockServer/createMockFormSubmission()
  const generateToast = (formSubmission) => {
    setToastId(formSubmission.id);
    setToastData(formSubmission.data);
    
    setOpen(true);
  };

  useEffect(() => {
    onMessage(generateToast);
  }, []);
  

  const getToastMessage = () => {
    const messageString = `${toastData?.firstName} ${toastData?.lastName} - ${toastData?.email}`;
    return messageString;
  }

  const closeToast = () => {
    setOpen(false);
  };

  // Would have liked to modularize this and share it between the two components, but
  // it fell outside the time constraints
  const retry = (operation, paramObject,  finalErr = 'Server cannot be reached.') => new Promise((resolve, reject) => {
    let retries = maxServerRetries;
    return operation(paramObject)
      .then(() => {
        updateFunction();
      })
      .catch((reason) => {
        if (retries > 0) {
          return retry(operation, paramObject, retries - 1);
        }
        
        return reject(finalErr);
      });
  });

  const likeToast = () => {
    const likedToast = { ...toastData, liked: true };
    retry(saveLikedFormSubmission, {id: toastId, data: likedToast});

    closeToast();
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={likeToast}>
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
      onClose={closeToast}
      key={toastId}
    />
  );
}
