import { createReducer } from '@reduxjs/toolkit';

import { CatImage } from '../../Types/catImage';
import {
  setError,
  setLoading,
  uploadSuccess,
  fetchCatImages,
} from '../actions/catImage';

type StateType = {
  catImages: CatImage[];
  loading: boolean;
  error?: string;
};

const initialState: StateType = {
  catImages: [],
  loading: false,
};

const catImageReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(fetchCatImages.fulfilled, (state, action) => {
      const [catImages, error] = action.payload;

      if (error || !catImages)
        return {
          ...state,
          loading: false,
          error: error?.message,
        };

      return {
        catImages,
        loading: false,
      };
    })
    .addCase(fetchCatImages.pending, (state, _) => ({
      ...state,
      loading: true,
    }))
    .addCase(setLoading, (state, action) => ({
      ...state,
      loading: action.payload,
    }))
    .addCase(setError, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }))
    .addCase(uploadSuccess, (state, action) => ({
      catImages: [...state.catImages, action.payload],
      error: undefined,
      loading: false,
    }))
);

export default catImageReducer;
