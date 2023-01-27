import { useState, useEffect } from 'react';

// MUI imports
import Container from '@mui/material/Container';

// Server helpers
import { fetchLikedFormSubmissions } from './service/mockServer';
import { Typography } from '@mui/material';

// Components

export default function LikedToastList() {
  const [likedToasts, setLikedToasts] = useState([]);
  const maxServerRetries = 5;

  // Runs only on first render
  useEffect(() => {
    fetchLikedFormSubmissions().then(
      (result) => {
        // Server has a bug which returns all submissions, not just liked ones
        // so we need to filter out the results (since we can't update server code)
        const likedSubmissions = result.formSubmissions.filter((submission) => {
          return submission.data.liked;
        });
        setLikedToasts(likedSubmissions);
      },
      error => alert(error)
    );
  }, []);
  
  // We're using hardcoded css in the sx prop for now as this is a small contained
  // project, and we can always create a theme and pull from it later if the scope expands
  return (
    <>
    {
      likedToasts && likedToasts.map((toast) => (
        <Container sx={{border: 1, borderColor: 'grey.500', borderRadius: 2, padding: '5px', marginBottom: '5px'}}>
          <Typography variant="body1" sx={{fontStyle: 'italic'}}>
            { `${toast.data.firstName} ${toast.data.lastName} - ${toast.data.email}` }
          </Typography>
        </Container>
      ))
    }
    </>
  );
}
