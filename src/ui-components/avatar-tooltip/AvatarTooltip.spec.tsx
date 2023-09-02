import React from 'react';
import { render, screen } from '@testing-library/react';

import AvatarTooltip from './AvatarTooltip';

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Tooltip: jest.fn(({ children }) => children),
}));

describe('<AvatarTooltip /> Tests:', () => {
  it('should have the tooltip component', () => {
    render(<AvatarTooltip />);

    expect(screen.getByTestId('PersonIcon').parentElement!).toBeInTheDocument();
  });

  it('should contain the tooltip avatar', () => {
    render(<AvatarTooltip />);

    expect(screen.getByTestId('PersonIcon')).toBeInTheDocument();
  });
});
