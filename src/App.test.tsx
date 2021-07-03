import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './TestData/store';
import App from './App';

test('Renders App without errors.', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText('Your Cats:')).toBeInTheDocument();
});
