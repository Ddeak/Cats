import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import TEST_CAT_IMAGES from '../../TestData/catImage';
import { getCatImages, getFavourites } from '../../Services/CatAPIService';
import { rootReducer } from '../../State/store';
import CatListPage from './CatsListPage';
import { configureStore, Store } from '@reduxjs/toolkit';

jest.mock('../../Services/CatAPIService.ts');
const mockGetCatImages: jest.Mocked<any> = getCatImages;
const mockGetFavourites: jest.Mocked<any> = getFavourites;

let store: Store;

beforeEach(() => {
  jest.resetAllMocks();
  store = configureStore({
    reducer: rootReducer,
  });
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
  test('Display cat images when the API call is successful.', async () => {
    mockGetCatImages.mockResolvedValueOnce([TEST_CAT_IMAGES, null]);
    mockGetFavourites.mockResolvedValueOnce([null, null]);
    renderWithProviders(<CatListPage />);

    expect(await screen.findByText('testName')).toBeInTheDocument();
    expect(screen.queryByText('testName')).toBeInTheDocument();
    expect(screen.queryAllByRole('button', { name: 'favourite' })).toHaveLength(
      2
    );
    expect(screen.queryAllByRole('button', { name: 'upVote' })).toHaveLength(2);
  });

  test('Display an error message when the API call fails.', async () => {
    mockGetCatImages.mockResolvedValueOnce([null, { message: 'test error' }]);
    mockGetFavourites.mockResolvedValueOnce([null, null]);
    renderWithProviders(<CatListPage />);

    expect(await screen.findByText('test error')).toBeInTheDocument();
    expect(screen.queryByText('testName')).toBeNull();
  });
});
