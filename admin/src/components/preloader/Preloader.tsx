import React from 'react';
import './preloader.css'
import { CircularProgress } from '@material-ui/core'
import { Box } from '@material-ui/core'

export const Preloader = () => {
  return <div className='preloader'>
      <Box>
        <CircularProgress />
      </Box>
  </div>;
};
