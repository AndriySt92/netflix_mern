import React from 'react';
import "./error.css"
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Stack from '@mui/material/Stack'

interface ErrorProps {
    error: string
}

export const Error: React.FC<ErrorProps> = ({error}) => {
  return (
    <div className='occuredError'>
      <Stack spacing={2}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
        {error}
        </Alert>
      </Stack>
    </div>
  )
};
