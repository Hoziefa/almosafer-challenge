import React from 'react';
import { render, screen } from '@testing-library/react';

import RootLayoutHeader from './RootLayoutHeader';

describe('<RootLayoutHeader /> Tests:', () => {
  it('should contain (app-logo) git-branch icon', () => {
    render(<RootLayoutHeader />);

    screen.getByTestId('git-branch');
  });

  it('should contain (app-title)', () => {
    render(<RootLayoutHeader />);

    screen.getByText('Almosafer');
  });
});
