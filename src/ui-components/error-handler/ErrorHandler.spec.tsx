import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithStore } from '@test-utils/global-renders';

import ErrorHandler from './ErrorHandler';

describe('<ErrorHandler /> Tests:', () => {
  const store = (props = {}) => ({
    appStore: {
      showSnackbar: false,
      message: '',
      onOpen: jest.fn(),
      onClose: jest.fn(),
      ...props,
    },
  });

  it('should not show the error-handler when the showSnackbar is false', () => {
    renderWithStore(<ErrorHandler />, store());

    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('should contain the error-handler when the showSnackbar is true', () => {
    renderWithStore(<ErrorHandler />, store({ showSnackbar: true }));

    screen.getByRole('alert');
  });

  it('should display the error-message', () => {
    renderWithStore(
      <ErrorHandler />,
      store({ showSnackbar: true, message: 'An error occurred' }),
    );

    screen.getByText('An error occurred');
  });

  it('should dismount and call onClose after the delay is finished', async () => {
    const onClose = jest.fn();

    renderWithStore(
      <ErrorHandler />,
      store({ showSnackbar: true, duration: 100, onClose }),
    );

    await waitFor(() => {
      expect(onClose).toBeCalled();
    });
  });
});
