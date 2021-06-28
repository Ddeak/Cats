import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { MemoryHistory } from 'history/createMemoryHistory';

import NotFoundPage from './NotFoundPage';
import Routes from '../../Layout/Routes';

const renderWithProviders = (ui: any, history?: MemoryHistory) => {
  return {
    ...render(
      <Router
        history={history || createMemoryHistory({ initialEntries: ['/'] })}
      >
        {ui}
      </Router>
    ),
    history,
  };
};

describe('Not Found Page tests', () => {
  test('Page renders without error.', () => {
    renderWithProviders(<NotFoundPage />);

    expect(screen.queryByText('Ooops!')).toBeInTheDocument();
    expect(screen.queryByText('That page was not found!')).toBeInTheDocument();
    expect(screen.queryByText('Go Back')).toBeInTheDocument();
  });

  test('Navigates back to landing page when the back button is clicked.', () => {
    const history = createMemoryHistory({ initialEntries: ['/notfound'] });
    renderWithProviders(<NotFoundPage />, history);

    fireEvent.click(screen.getByText('Go Back'));

    expect(history.location.pathname).toEqual(Routes.Landing);
  });
});
