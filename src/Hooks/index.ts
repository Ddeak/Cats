import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCatImages } from '../State/actions/catImage';
import { fetchFavourites } from '../State/actions/favourites';
import { fetchVotes } from '../State/actions/votes';

export const useAppData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppData = async () => {
      dispatch(fetchCatImages());
      dispatch(fetchFavourites());
      dispatch(fetchVotes());
    };

    fetchAppData();
  }, [dispatch]);
};
