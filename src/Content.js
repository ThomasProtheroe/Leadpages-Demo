import { useState, useEffect } from 'react';

// MUI imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Components
import LikedToastList from './LikedToastList';
import Toast from './Toast.js';

// Server helpers
import { fetchLikedFormSubmissions } from './service/mockServer';

export default function Content() {
  const [likedToasts, setLikedToasts] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const maxServerRetries = 5;

  // Ideally we would use Redux or some kind of data store to manage state across the
  // app, but that's a bit overkill for something this size so we can just update the 
  // parents state to force a re-render
  const updateList = () => {
    setTriggerUpdate(!triggerUpdate);
  };

  // We will keep trying the server until we get through, or we hit our max attempts
  // Beyond that the delay becomes unreasonable, and the user will likely have moved on already.
  const retry = (operation, finalErr = 'Server cannot be reached.') => new Promise((resolve, reject) => {
    let retries = maxServerRetries;
    return operation()
      .then((result) => {
        // Server has a bug which returns all submissions, not just liked ones
        // so we need to filter out the results (or possibly the function is just poorly named)
        const likedSubmissions = result.formSubmissions.filter((submission) => {
          return submission.data.liked;
        });
        setLikedToasts(likedSubmissions);
      })
      .catch((reason) => {
        if (retries > 0) {
          return retry(operation, retries - 1);
        }
        
        return reject(finalErr);
      });
  });

  useEffect(() => {
    retry(fetchLikedFormSubmissions);
  }, [triggerUpdate]);

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>
      <LikedToastList likedToasts={likedToasts} />
      <Toast updateFunction={updateList} maxServerRetries={maxServerRetries} />
    </Box>
  );
}
