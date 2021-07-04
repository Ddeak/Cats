import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getCatImages } from '../../Services/CatAPIService';
import { CatImage, CatImageAPIError } from '../../Types/catImage';

export const setLoading = createAction<boolean>('setCatImagesLoading');
export const setError = createAction<string>('setCatImagesError');

export const uploadSuccess = createAction<CatImage>('uploadCatImageSuccess');

export const fetchCatImages = createAsyncThunk(
  'fetchCatImages',
  async (): Promise<[CatImage[] | null, CatImageAPIError | null]> => {
    return await getCatImages();
  }
);
