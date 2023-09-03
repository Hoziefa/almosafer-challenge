import React from 'react';
import { render, screen } from '@testing-library/react';

import AvatarTooltip from './AvatarTooltip';

describe('<AvatarTooltip /> Tests:', () => {
  it('should contain the tooltip component', () => {
    render(<AvatarTooltip />);

    expect(screen.getByTestId('PersonIcon').parentElement!).toBeInTheDocument();
  });

  it('should contain the tooltip avatar', () => {
    render(<AvatarTooltip />);

    expect(screen.getByTestId('PersonIcon')).toBeInTheDocument();
  });
});
