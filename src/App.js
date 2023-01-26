import React from 'react';

// MUI imports
import Container from '@mui/material/Container';

// Components
import Header from './Header';
import Content from './Content';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Content />
      </Container>
    </>
  );
}

export default App;
