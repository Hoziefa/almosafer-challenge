import React from 'react';
import { render, screen } from '@testing-library/react';

import EmptyHandler, { EmptyHandlerProps } from './EmptyHandler';

describe('<EmptyHandler /> Tests:', () => {
  const props: EmptyHandlerProps = {
    message: 'Almosafer',
  };

  it('should contain the empty-icon', () => {
    render(<EmptyHandler {...props} />);

    screen.getByTestId('SentimentDissatisfiedIcon');
  });

  it('should contain the empty-message', () => {
    render(<EmptyHandler {...props} />);

    screen.getByText(props.message);
  });
});
