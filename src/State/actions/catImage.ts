import { createAction } from '@reduxjs/toolkit';
import { CatImage } from '../../Types/catImage';

export const setCatImages = createAction<CatImage[]>('setCatImages');
export const setLoading = createAction<boolean>('setCatImagesLoading');
export const setError = createAction<string>('setCatImagesError');
