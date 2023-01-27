// MUI imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Components
import LikedToastList from './LikedToastList';
import Toast from './Toast.js';

export default function Content() {
  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>
      <LikedToastList />
      <Toast />
    </Box>
  );
}
