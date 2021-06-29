import React from 'react';
import { screen, render } from '@testing-library/react';

import { getCatImages } from '../../Services/CatAPIService';
import CatList from './CatList';
import TEST_CAT_IMAGES from '../../TestData/catImage';

jest.mock('../../Services/CatAPIService.ts');
const mockGetCatImages: jest.Mocked<any> = getCatImages;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Not Found Page tests', () => {
  test('Page renders without error.', () => {
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
});
