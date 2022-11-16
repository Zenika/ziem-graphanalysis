
import { Box } from '@mui/material';
import { ReactElement } from 'react';
import Graph from '../Graph';
import Header from '../Header';
import LeftPanel from '../LeftPanel';
import './style.css';

function App() {
  return (
    <div className='app'>
      <Header />
      <Box sx={{
        width: '95vw',
        height: '90vh',
        display: 'flex',
      }}>
        <LeftPanel />
        <Graph />
      </Box>
    </div>
  );
}

export default App;
