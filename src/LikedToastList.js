// MUI imports
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

// Components

export default function LikedToastList({ likedToasts }) { 
  // We're using hardcoded css in the sx prop for now as this is a small contained
  // project, and we can always create a theme and pull from it later if the scope expands
  return (
    <>
    {
      likedToasts && likedToasts.map((toast) => (
        <Container key={toast.id} sx={{border: 1, borderColor: 'grey.500', borderRadius: 2, padding: '5px', marginBottom: '5px'}}>
          <Typography variant="body1" sx={{fontStyle: 'italic'}}>
            { `${toast.data.firstName} ${toast.data.lastName} - ${toast.data.email}` }
          </Typography>
        </Container>
      ))
    }
    </>
  );
}
