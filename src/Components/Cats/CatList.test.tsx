import React from 'react';
import { Router } from 'react-router-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Provider } from 'react-redux';

import CatList from './CatList';
import Routes from '../../Layout/Routes';
import { favouriteImage, voteImage } from '../../Services/CatAPIService';
import store from '../../TestData/store';

jest.mock('../../Services/CatAPIService.ts');
const mockFavouriteImage: jest.Mocked<any> = favouriteImage;
const mockVoteImage: jest.Mocked<any> = voteImage;

beforeEach(() => {
  jest.resetAllMocks();
});

const renderWithProviders = (ui: any, history?: MemoryHistory) => {
  return {
    ...render(
      <Provider store={store}>
        <Router
          history={history || createMemoryHistory({ initialEntries: ['/'] })}
        >
          {ui}
        </Router>
      </Provider>
    ),
    history,
  };
};

describe('Cat List component tests', () => {
  test('renders without error.', () => {
    renderWithProviders(<CatList />);

    expect(screen.queryByText('Your Cats:')).toBeInTheDocument();
  });

  test('Navigates to the upload screen when the new image button is clicked.', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    renderWithProviders(<CatList />, history);

    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

    expect(history.location.pathname).toEqual(Routes.Upload);
  });

  test('Interacting with the image buttons results in the correct API call', () => {
    renderWithProviders(<CatList />);

    expect(screen.queryByText('testName')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'favourite' })[0]);

    expect(mockFavouriteImage).toHaveBeenCalledTimes(1);
    expect(mockFavouriteImage).toHaveBeenCalledWith('0');

    fireEvent.click(screen.getAllByRole('button', { name: 'upVote' })[0]);

    expect(mockVoteImage).toHaveBeenCalledTimes(1);
    expect(mockVoteImage).toHaveBeenCalledWith(1, '0');

    fireEvent.click(screen.getAllByRole('button', { name: 'downVote' })[1]);

    expect(mockVoteImage).toHaveBeenCalledTimes(2);
    expect(mockVoteImage).toHaveBeenLastCalledWith(0, '1');
  });
});
