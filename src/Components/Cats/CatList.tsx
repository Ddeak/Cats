import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Routes from '../../Layout/Routes';

import { voteImage } from '../../Services/CatAPIService';
import { setError } from '../../State/actions/catImage';
import {
  fetchFavouriteByImageId,
  removeFavourite,
} from '../../State/actions/favourites';
import { catImagesSelector } from '../../State/selectors';
import CatListView from './CatListView';

const CatList: React.FC = () => {
  const { catImages, error } = useSelector(catImagesSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const onNewImage = () => history.push(Routes.Upload);

  const onFavouriteImage = async (image_id: string, favourite_id?: number) => {
    dispatch(
      favourite_id
        ? removeFavourite(favourite_id)
        : fetchFavouriteByImageId(image_id)
    );
  };

  const onVoteImage = async (vote: 0 | 1, image_id: string) => {
    const response = await voteImage(vote, image_id);
    if (!response) return;

    const [_, err] = response;
    if (err) dispatch(setError('Oops! We failed to vote on that image.'));
  };

  return (
    <CatListView
      images={catImages}
      error={error}
      onNewImage={onNewImage}
      onFavouriteImage={onFavouriteImage}
      onVoteImage={onVoteImage}
    />
  );
};

export default CatList;
