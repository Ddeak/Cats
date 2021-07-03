import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCatImages, getFavourites } from '../Services/CatAPIService';
import {
  setCatImages,
  setError as setCatImageError,
} from '../State/actions/catImage';
import {
  setFavourites,
  setError as setFavouriteError,
} from '../State/actions/favourites';

export const useAppData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppData = async () => {
      const [catImageResponse, favouriteResponse] = await Promise.all([
        getCatImages(),
        getFavourites(),
      ]);

      const [catImages, catImageError] = catImageResponse;
      if (catImageError) dispatch(setCatImageError(catImageError.message));
      else dispatch(setCatImages(catImages || []));

      const [favourites, favouriteError] = favouriteResponse;
      if (favouriteError) dispatch(setFavouriteError(favouriteError.message));
      else dispatch(setFavourites(favourites || []));
    };

    fetchAppData();
  }, [dispatch]);
};
