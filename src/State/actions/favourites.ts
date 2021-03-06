import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  favouriteImage,
  getFavourite,
  getFavourites,
  unfavouriteImage,
} from '../../Services/CatAPIService';
import {
  CatImageAPIError,
  CatImageAPIInteractionResponse,
} from '../../Types/catImage';
import { Favourite } from '../../Types/favourite';

export const setLoading = createAction<boolean>('setFavouritesLoading');
export const setError = createAction<string>('setFavouritesError');

export const favouriteByImageId = createAsyncThunk(
  'fetchFavouriteById',
  async (
    image_id: string
  ): Promise<[Favourite | null, CatImageAPIError | null]> => {
    const [data, err] = await favouriteImage(image_id);

    if (err || !data) return [null, err];

    return await getFavourite(data.id);
  }
);

export const removeFavourite = createAsyncThunk(
  'removeFavourite',
  async (
    favourite_id: number
  ): Promise<
    [CatImageAPIInteractionResponse | null, CatImageAPIError | null]
  > => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, err] = await unfavouriteImage(favourite_id);
    return [{ id: favourite_id, message: 'SUCCESS' }, err];
  }
);

export const fetchFavourites = createAsyncThunk(
  'fetchFavourites',
  async (): Promise<[Favourite[] | null, CatImageAPIError | null]> => {
    return await getFavourites();
  }
);
