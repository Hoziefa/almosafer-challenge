import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import ErrorHandler from './ErrorHandler';
import { StoreContext } from '@stores/store';

type Props = {
  showSnackbar: boolean;
  message: string;
  duration?: number;
  onOpen: (message: string, duration?: number) => void;
  onClose: () => void;
};

const RenderWithStore = (props: Partial<Props> = {}) => {
  const store = {
    appStore: {
      showSnackbar: false,
      message: '',
      onOpen: jest.fn(),
      onClose: jest.fn(),
      ...props,
    },
  };

  return (
    <StoreContext.Provider value={store}>
      <ErrorHandler />
    </StoreContext.Provider>
  );
};

describe('<ErrorHandler /> Tests:', () => {
  it('should not show the error-handler when the showSnackbar is false', () => {
    render(<RenderWithStore />);

    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('should contain the error-handler when the showSnackbar is true', () => {
    render(<RenderWithStore showSnackbar />);

    screen.getByRole('alert');
  });

  it('should display the error-message', () => {
    render(<RenderWithStore showSnackbar message='An error occurred' />);

    screen.getByText('An error occurred');
  });

  it('should dismount and call onClose after the delay is finished', async () => {
    const onClose = jest.fn();

    render(<RenderWithStore showSnackbar duration={100} onClose={onClose} />);

    await waitFor(() => {
      expect(onClose).toBeCalled();
    });
  });
});
