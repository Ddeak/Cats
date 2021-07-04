import React from 'react';
import { Router } from 'react-router-dom';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Provider } from 'react-redux';

import CatList from './CatList';
import Routes from '../../Layout/Routes';
import {
  favouriteImage,
  voteImage,
  getFavourite,
  getVote,
} from '../../Services/CatAPIService';
import store from '../../TestData/store';
import { voteByImageId } from '../../State/actions/votes';

jest.mock('../../Services/CatAPIService.ts');
const mockFavouriteImage: jest.Mocked<any> = favouriteImage;
const mockGetFavourite: jest.Mocked<any> = getFavourite;
const mockVoteImage: jest.Mocked<any> = voteImage;
const mockGetVote: jest.Mocked<any> = getVote;

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

    fireEvent.click(screen.getByRole('button', { name: 'Upload New' }));

    expect(history.location.pathname).toEqual(Routes.Upload);
  });

  test('Interacting with the image buttons results in the correct API call', async () => {
    mockFavouriteImage.mockResolvedValueOnce([{ id: 2 }, null]);
    mockGetFavourite.mockResolvedValueOnce([
      {
        id: 2,
        image_id: '0',
      },
      null,
    ]);

    mockVoteImage.mockResolvedValueOnce([{ id: 1 }, null]);
    mockVoteImage.mockResolvedValueOnce([{ id: 2 }, null]);
    mockGetVote.mockResolvedValueOnce([
      {
        id: 1,
        image_id: '0',
        value: 1,
      },
      null,
    ]);
    mockGetVote.mockResolvedValueOnce([
      {
        id: 2,
        image_id: '1',
        value: 0,
      },
      null,
    ]);

    renderWithProviders(<CatList />);

    expect(screen.queryByText('testName')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'favourite' })[0]);

    await waitFor(() => expect(mockGetFavourite).toHaveBeenCalledTimes(1));
    expect(mockGetFavourite).toHaveBeenLastCalledWith(2);
    expect(mockFavouriteImage).toHaveBeenCalledTimes(1);
    expect(mockFavouriteImage).toHaveBeenCalledWith('0');

    fireEvent.click(screen.getAllByRole('button', { name: 'upVote' })[0]);

    await waitFor(() => expect(mockGetVote).toHaveBeenCalledTimes(1));
    expect(mockGetVote).toHaveBeenLastCalledWith(1);
    expect(mockVoteImage).toHaveBeenCalledTimes(1);
    expect(mockVoteImage).toHaveBeenCalledWith(1, '0');

    fireEvent.click(screen.getAllByRole('button', { name: 'downVote' })[1]);

    await waitFor(() => expect(mockGetVote).toHaveBeenCalledTimes(2));
    expect(mockGetVote).toHaveBeenLastCalledWith(2);
    expect(mockVoteImage).toHaveBeenCalledTimes(2);
    expect(mockVoteImage).toHaveBeenLastCalledWith(0, '1');
  });

  test('Interaction buttons are disabled while items are loading', () => {
    store.dispatch(voteByImageId.pending('', { newValue: 0, image_id: '' }));
    renderWithProviders(<CatList />);

    expect(
      screen.getAllByRole('button', { name: 'favourite' })[0]
    ).toBeDisabled();
    expect(
      screen.getAllByRole('button', { name: 'favourite' })[1]
    ).toBeDisabled();
    expect(screen.getAllByRole('button', { name: 'upVote' })[0]).toBeDisabled();
    expect(
      screen.getAllByRole('button', { name: 'downVote' })[1]
    ).toBeDisabled();
  });
});
