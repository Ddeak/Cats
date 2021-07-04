import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getCatImages,
  getFavourites,
  getVotes,
} from '../Services/CatAPIService';
import {
  setCatImages,
  setError as setCatImageError,
} from '../State/actions/catImage';
import {
  setFavourites,
  setError as setFavouriteError,
} from '../State/actions/favourites';
import { setError as setVotesError, setVotes } from '../State/actions/votes';

export const useAppData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppData = async () => {
      const [catImageResponse, favouriteResponse, votesResponse] =
        await Promise.all([getCatImages(), getFavourites(), getVotes()]);

      const [catImages, catImageError] = catImageResponse;
      if (catImageError) dispatch(setCatImageError(catImageError.message));
      else dispatch(setCatImages(catImages || []));

      const [favourites, favouriteError] = favouriteResponse;
      if (favouriteError) dispatch(setFavouriteError(favouriteError.message));
      else dispatch(setFavourites(favourites || []));

      const [votes, votesError] = votesResponse;
      if (votesError) dispatch(setVotesError(votesError.message));
      else dispatch(setVotes(votes || []));
    };

    fetchAppData();
  }, [dispatch]);
};
