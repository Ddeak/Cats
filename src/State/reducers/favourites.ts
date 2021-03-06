import { createReducer } from '@reduxjs/toolkit';

import { Favourite } from '../../Types/favourite';
import {
  setLoading,
  setError,
  favouriteByImageId,
  removeFavourite,
  fetchFavourites,
} from '../actions/favourites';

type StateType = {
  favourites: Favourite[];
  loading: boolean;
  error?: string;
};

const initialState: StateType = {
  favourites: [],
  loading: false,
};

const favouritesReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setLoading, (state, action) => ({
      ...state,
      loading: action.payload,
    }))
    .addCase(setError, (state, action) => ({
      ...state,
      error: action.payload,
    }))
    .addCase(removeFavourite.fulfilled, (state, action) => {
      const [favourite, error] = action.payload;

      if (error || !favourite)
        return {
          ...state,
          error:
            error?.message || 'Something went wrong removing the favourite!',
        };

      return {
        ...state,
        favourites: state.favourites.filter((fav) => fav.id !== favourite.id),
      };
    })
    .addCase(favouriteByImageId.fulfilled, (state, action) => {
      const [favourite, error] = action.payload;

      if (error)
        return {
          ...state,
          error: error.message,
        };

      const alreadyInArray = state.favourites.find(
        (fav) => fav.id === favourite?.id
      );
      if (!alreadyInArray && favourite)
        return {
          favourites: [...state.favourites, favourite],
          loading: false,
        };
    })
    .addCase(fetchFavourites.fulfilled, (state, action) => {
      const [favourites, error] = action.payload;

      if (error || !favourites)
        return {
          ...state,
          loading: false,
          error: error?.message,
        };

      return {
        favourites,
        loading: false,
      };
    })
    .addCase(favouriteByImageId.pending, (state, _) => ({
      ...state,
      loading: true,
    }))
    .addCase(removeFavourite.pending, (state, _) => ({
      ...state,
      loading: true,
    }))
);

export default favouritesReducer;
