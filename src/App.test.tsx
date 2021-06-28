import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders App without errors.', () => {
  render(<App />);
  expect(screen.getByText('Home Page')).toBeInTheDocument();
});
