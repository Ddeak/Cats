import React from 'react';
import { Router } from 'react-router-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import CatList from './CatList';
import TEST_CAT_IMAGES from '../../TestData/catImage';
import Routes from '../../Layout/Routes';
import { getCatImages } from '../../Services/CatAPIService';

jest.mock('../../Services/CatAPIService.ts');
const mockGetCatImages: jest.Mocked<any> = getCatImages;

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
});
