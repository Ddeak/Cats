import { createReducer } from '@reduxjs/toolkit';

import { CatImage } from '../../Types/catImage';
import { setCatImages, setError, setLoading } from '../actions/catImage';

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
    .addCase(setCatImages, (_, action) => ({
      catImages: action.payload,
      loading: false,
    }))
    .addCase(setLoading, (state, action) => ({
      ...state,
      loading: action.payload,
    }))
    .addCase(setError, (state, action) => ({
      ...state,
      error: action.payload,
    }))
);

export default catImageReducer;
