import React from 'react';
import { screen, render } from '@testing-library/react';

import Snackbar from './Snackbar';

describe('Upload Cat component tests', () => {
  test('renders without error', () => {
    render(<Snackbar open={true} message="Test Mesage" />);

    expect(screen.getByText('Test Mesage')).toBeInTheDocument();
  });
});
