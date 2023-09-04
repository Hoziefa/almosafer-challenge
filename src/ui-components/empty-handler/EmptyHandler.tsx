import React from 'react';
import { Stack, Typography } from '@mui/material';

import { SentimentDissatisfied } from '@mui/icons-material';

export type EmptyHandlerProps = {
  message: string;
};

function EmptyHandler(props: EmptyHandlerProps) {
  return (
    <Stack marginY='4rem' alignItems='center'>
      <SentimentDissatisfied sx={{ fontSize: '5rem', color: 'darkgray' }} />

      <Typography variant='h4' color='darkgray'>
        {props.message}
      </Typography>
    </Stack>
  );
}

export default EmptyHandler;
