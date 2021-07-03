import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const catImagesSelector = (state: RootState) => state.catImageReducer;
export const favouritesSelector = (state: RootState) =>
  state.favouritesReducer.favourites;

export const isCatImageFavourited = (image_id: string) =>
  createSelector(favouritesSelector, (favourites) => {
    const temp = favourites.find((fav) => fav.image_id === image_id);
    return temp?.id;
  });
