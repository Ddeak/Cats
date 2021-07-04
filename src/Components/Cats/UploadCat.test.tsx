import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';

import UploadCat from './UploadCat';
import { uploadCatImage } from '../../Services/CatAPIService';
import store from '../../TestData/store';

jest.mock('../../Services/CatAPIService.ts');
const mockUploadImage: jest.Mocked<any> = uploadCatImage;

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

describe('Upload Cat component tests', () => {
  test('renders without error.', () => {
    renderWithProviders(<UploadCat />);

    expect(
      screen.getByRole('button', { name: 'Choose Image' })
    ).toBeInTheDocument();
  });

  test('Uploads an image successfully.', async () => {
    global.URL.createObjectURL = jest
      .fn()
      .mockImplementationOnce(() => 'testUrl');
    mockUploadImage.mockResolvedValueOnce([{}, null]);
    const testFile = new File(['a test'], 'test.png', { type: 'image/png' });

    renderWithProviders(<UploadCat />);

    const fileInput = screen.getByLabelText('Choose Image');
    fireEvent.change(fileInput, {
      target: { files: [testFile] },
    });

    const uploadImage = screen.queryByAltText('Upload');
    expect(uploadImage).toBeInTheDocument();
    expect(uploadImage).toHaveAttribute('src', 'testUrl');
    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

    await waitFor(() => expect(mockUploadImage).toHaveBeenCalledTimes(1));
    expect(mockUploadImage).toHaveBeenCalledWith({
      file: testFile,
    });
  });

  test('Display an error when an upload fails.', async () => {
    global.URL.createObjectURL = jest
      .fn()
      .mockImplementationOnce(() => 'testUrl');
    mockUploadImage.mockResolvedValueOnce([{}, { message: 'test error' }]);
    const testFile = new File(['a test'], 'test.png', { type: 'image/png' });

    renderWithProviders(<UploadCat />);

    const fileInput = screen.getByLabelText('Choose Image');
    fireEvent.change(fileInput, {
      target: { files: [testFile] },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));

    await waitFor(() =>
      expect(screen.queryByText('test error')).toBeInTheDocument()
    );

    expect(screen.queryByAltText('Upload')).toBeInTheDocument();
  });
});
