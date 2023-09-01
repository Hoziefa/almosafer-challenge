import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useStore } from '@stores/store';

function ErrorHandler() {
  const { appStore } = useStore();

  return (
    <Snackbar
      open={appStore.showSnackbar}
      onClose={appStore.onClose}
      autoHideDuration={appStore.duration}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity='error' sx={{ width: '100%' }}>
        {appStore.message}
      </Alert>
    </Snackbar>
  );
}

export default observer(ErrorHandler);
