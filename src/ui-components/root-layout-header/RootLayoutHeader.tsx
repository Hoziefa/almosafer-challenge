import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

import GitBranch from '@assets/icons/GitBranch';

function RootLayoutHeader() {
  return (
    <AppBar position='static' color='primary' enableColorOnDark>
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
        >
          <GitBranch />
        </IconButton>

        <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
          Almosafer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default RootLayoutHeader;
