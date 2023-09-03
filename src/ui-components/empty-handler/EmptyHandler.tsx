import React from 'react';
import { Box, Typography } from '@mui/material';
import { SentimentDissatisfied } from '@mui/icons-material';

export type EmptyHandlerProps = {
  message: string;
};

function EmptyHandler(props: EmptyHandlerProps) {
  return (
    <Box
      marginY='4rem'
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <SentimentDissatisfied sx={{ fontSize: '5rem', color: 'darkgray' }} />

      <Typography variant='h4' color='darkgray'>
        {props.message}
      </Typography>
    </Box>
  );
}

export default EmptyHandler;
