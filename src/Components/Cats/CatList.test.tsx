import React from 'react';
import { Router } from 'react-router-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import CatList from './CatList';
import TEST_CAT_IMAGES from '../../TestData/catImage';
import Routes from '../../Layout/Routes';
import {
  getCatImages,
  favouriteImage,
  voteImage,
} from '../../Services/CatAPIService';

jest.mock('../../Services/CatAPIService.ts');
const mockGetCatImages: jest.Mocked<any> = getCatImages;
const mockFavouriteImage: jest.Mocked<any> = favouriteImage;
const mockVoteImage: jest.Mocked<any> = voteImage;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Cat List component tests', () => {
  test('renders without error.', () => {
    render(<CatList />);

    expect(screen.queryByText('Your Cats:')).toBeInTheDocument();
    expect(
      screen.queryByText('You have no images to display.')
    ).toBeInTheDocument();
  });

  test('Display cat images when the API call is successful.', async () => {
    mockGetCatImages.mockResolvedValueOnce([TEST_CAT_IMAGES, null]);
    render(<CatList />);

    expect(await screen.findByText('testName')).toBeInTheDocument();
    expect(screen.queryByText('testName')).toBeInTheDocument();
    expect(screen.queryAllByRole('button', { name: 'favourite' })).toHaveLength(
      2
    );
    expect(screen.queryAllByRole('button', { name: 'upVote' })).toHaveLength(2);
  });

  test('Display an error message when the API call fails.', async () => {
    mockGetCatImages.mockResolvedValueOnce([null, { message: 'test error' }]);
    render(<CatList />);

    expect(await screen.findByText('test error')).toBeInTheDocument();
    expect(screen.queryByText('testName')).toBeNull();
  });

  test('Navigates to the upload screen when the new image button is clicked.', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(
      <Router history={history}>
        <CatList />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

    expect(history.location.pathname).toEqual(Routes.Upload);
  });

  test('Interacting with the image buttons results in the correct API call', async () => {
    mockGetCatImages.mockResolvedValueOnce([TEST_CAT_IMAGES, null]);
    render(<CatList />);

    expect(await screen.findByText('testName')).toBeInTheDocument();
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
